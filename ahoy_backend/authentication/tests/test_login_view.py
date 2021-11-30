import pytest
from django.contrib.auth import get_user_model
from django.test import RequestFactory
from rest_framework.status import HTTP_400_BAD_REQUEST

from authentication.views import login_view

LOGIN_PATH = "authentication/login"


@pytest.fixture(name="request_factory")
def fixture_request_factory():
    return RequestFactory()


@pytest.fixture(name="create_post_login_request")
def fixture_create_post_login_request(request_factory):
    def create_request(body=None):
        return request_factory.post(
            path=LOGIN_PATH, data=body, content_type="application/json"
        )

    return create_request


@pytest.mark.django_db
def test_given_post_request_with_incorrect_credentials_should_return_bad_request(
    create_post_login_request,
):
    username = "some username"
    incorrect_credentials = {"username": username, "password": "incorrect password"}
    get_user_model().objects.create_user(
        username=username,
        email="some@email.domain",
        password="correct password",
    )

    response = login_view(request=create_post_login_request(body=incorrect_credentials))

    assert HTTP_400_BAD_REQUEST == response.status_code


@pytest.mark.django_db
@pytest.mark.parametrize(
    "unsupported_method",
    ["put", "head", "delete", "options", "trace", "patch"],
)
def test_given_unsupported_http_method_should_return_bad_request(
    unsupported_method, request_factory
):
    create_request = getattr(request_factory, unsupported_method)
    response = login_view(request=create_request(path=LOGIN_PATH))

    assert HTTP_400_BAD_REQUEST == response.status_code
