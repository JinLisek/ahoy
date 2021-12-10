import pytest
from rest_framework.status import HTTP_400_BAD_REQUEST

LOGIN_PATH = "/authentication/login"


@pytest.mark.django_db
def test_when_trying_to_login_with_incorrect_credentials_should_return_bad_request(
    client, django_user_model
):
    username = "some username"

    django_user_model.objects.create_user(
        username=username,
        email="some@email.domain",
        password="correct password",
    )

    response = client.post(
        LOGIN_PATH,
        data={"username": username, "password": "incorrect password"},
        content_type="application/json",
    )

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
@pytest.mark.parametrize(
    "unsupported_method",
    ["put", "head", "delete", "options", "trace", "patch"],
)
def test_given_unsupported_http_method_should_return_bad_request(
    client, unsupported_method
):
    unsupported_request = getattr(client, unsupported_method)
    response = unsupported_request(LOGIN_PATH)

    assert HTTP_400_BAD_REQUEST == response.status_code
