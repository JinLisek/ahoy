from json import loads

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse, HttpResponseBadRequest


def register_view(request):
    if request.user.is_authenticated:
        return HttpResponseBadRequest("Cannot register, currently logged in")

    user_to_register = loads(request.body)
    users_with_requested_name_or_email = User.objects.filter(
        Q(username=user_to_register["username"]) | Q(email=user_to_register["email"])
    )

    if len(users_with_requested_name_or_email) == 0:
        User.objects.create_user(
            username=user_to_register["username"],
            email=user_to_register["email"],
            password=user_to_register["password"],
        )
        return HttpResponse("Correctly registered", status=201)

    return HttpResponseBadRequest("User duplicated")


def login_view(request):
    if request.user.is_authenticated:
        return HttpResponse("Already logged in")

    user_to_login = loads(request.body)
    user = authenticate(
        username=user_to_login["username"], password=user_to_login["password"]
    )

    if user is not None:
        login(request, user)
        return HttpResponse("Successfully logged in")

    return HttpResponseBadRequest("Incorrect credentials")


def logout_view(request):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot logout")

    logout(request)
    return HttpResponse("Successfully logged out")
