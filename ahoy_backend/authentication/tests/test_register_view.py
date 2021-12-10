import pytest
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_given_logged_in_user_should_return_bad_request(client, django_user_model):
    username = "logged_in_user"
    password = "pass_of_logged_in"

    django_user_model.objects.create_user(
        username=username, email="logged@test.test", password=password
    )

    client.login(username=username, password=password)
    response = client.post("/authentication/register")

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
def test_given_user_with_duplicated_email_should_return_bad_request(
    client, django_user_model
):
    duplicated_email = "duplicated@email.address"

    django_user_model.objects.create_user(
        username="username2", email=duplicated_email, password="some_other_password"
    )

    response = client.post(
        "/authentication/register",
        data={
            "username": "username1",
            "email": duplicated_email,
            "password": "test_password",
        },
        content_type="application/json",
    )

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
def test_given_user_with_duplicated_username_should_return_bad_request(
    client, django_user_model
):
    duplicated_username = "duplicated_username"

    django_user_model.objects.create_user(
        username=duplicated_username,
        email="another@test.email",
        password="some_other_password",
    )

    response = client.post(
        "/authentication/register",
        data={
            "username": duplicated_username,
            "email": "test_user@test.test",
            "password": "test_password",
        },
        content_type="application/json",
    )

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
def test_given_user_with_new_username_and_email_but_duplicated_password_should_return_status_created(
    client, django_user_model
):
    duplicated_password = "duplicated_password"

    django_user_model.objects.create_user(
        username="first username",
        email="email@test.email",
        password=duplicated_password,
    )

    response = client.post(
        "/authentication/register",
        data={
            "username": "second username",
            "email": "another@test.test",
            "password": duplicated_password,
        },
        content_type="application/json",
    )

    assert HTTP_201_CREATED == response.status_code


@pytest.mark.django_db
def test_given_new_user_should_return_status_created(client):
    response = client.post(
        "/authentication/register",
        data={
            "username": "test_user",
            "email": "test_user@test.test",
            "password": "test_password",
        },
        content_type="application/json",
    )

    assert HTTP_201_CREATED == response.status_code


@pytest.mark.django_db
def test_there_should_be_no_users_before_registration(django_user_model):
    assert len(django_user_model.objects.all()) == 0


@pytest.mark.django_db
def test_given_new_user_should_create_single_user(client, django_user_model):
    client.post(
        "/authentication/register",
        data={
            "username": "test_user",
            "email": "test_user@test.test",
            "password": "test_password",
        },
        content_type="application/json",
    )

    assert len(django_user_model.objects.all()) == 1


@pytest.mark.django_db
def test_given_new_user_should_create_user_with_given_data(client, django_user_model):
    username = "test_user"
    email = "test_user@test.test"
    password = "test_password"

    client.post(
        "/authentication/register",
        data={
            "username": username,
            "email": email,
            "password": password,
        },
        content_type="application/json",
    )

    registered_user = django_user_model.objects.first()

    assert registered_user.username == username
    assert registered_user.email == email
    assert registered_user.check_password(password)
