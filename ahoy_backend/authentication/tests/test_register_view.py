import pytest
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST

from authentication.views import register_view


@pytest.fixture(name="request_factory")
def fixture_request_factory():
    return RequestFactory()


@pytest.fixture(name="create_register_request")
def fixture_create_register_request(request_factory):
    def creator(user=None, body=None):
        if user is None:
            user = AnonymousUser()
        request = request_factory.post(
            path="authentication/register", data=body, content_type="application/json"
        )
        request.user = user
        return request

    return creator


@pytest.mark.django_db
def test_given_logged_in_user_in_register_request_should_return_bad_request(
    create_register_request,
):
    logged_in_user = get_user_model().objects.create_user(
        username="logged", email="logged@test.test", password="logged_pass"
    )

    response = register_view(request=create_register_request(user=logged_in_user))

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
def test_given_duplicated_user_in_register_request_should_return_bad_request(
    create_register_request,
):
    duplicated_user = {
        "username": "test_user",
        "email": "test_user@test.test",
        "password": "test_password",
    }

    get_user_model().objects.create_user(
        username=duplicated_user["username"],
        email=duplicated_user["email"],
        password=duplicated_user["password"],
    )

    response = register_view(request=create_register_request(body=duplicated_user))

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
def test_given_new_user_in_register_request_should_return_status_created(
    create_register_request,
):
    register_request = create_register_request(
        body={
            "username": "test_user",
            "email": "test_user@test.test",
            "password": "test_password",
        }
    )
    response = register_view(request=register_request)

    assert HTTP_201_CREATED == response.status_code


@pytest.mark.django_db
def test_given_new_user_in_register_request_should_create_single_user(
    create_register_request,
):
    user_to_register = {
        "username": "test_user",
        "email": "test_user@test.test",
        "password": "test_password",
    }

    register_view(request=create_register_request(body=user_to_register))

    assert len(get_user_model().objects.all()) == 1


@pytest.mark.django_db
def test_given_new_user_in_register_request_should_create_user_with_given_data(
    create_register_request,
):
    user_to_register = {
        "username": "test_user",
        "email": "test_user@test.test",
        "password": "test_password",
    }

    register_view(request=create_register_request(body=user_to_register))

    registered_user = get_user_model().objects.first()

    assert registered_user.username == user_to_register["username"]
    assert registered_user.email == user_to_register["email"]
    assert registered_user.check_password(user_to_register["password"])
