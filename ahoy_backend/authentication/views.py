import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.db.models import Q
from django.http import HttpResponse, HttpResponseBadRequest


def register_view(request):
    if request.user.is_authenticated:
        return HttpResponseBadRequest("Cannot register, currently logged in")

    user_to_register = json.loads(request.body)
    users_with_requested_name_or_email = get_user_model().objects.filter(
        Q(username=user_to_register["username"]) | Q(email=user_to_register["email"])
    )

    if len(users_with_requested_name_or_email) == 0:
        get_user_model().objects.create_user(
            username=user_to_register["username"],
            email=user_to_register["email"],
            password=user_to_register["password"],
        )
        return HttpResponse("Correctly registered", status=201)

    return HttpResponseBadRequest("User duplicated")


def create_user_resp(user, msg):
    resp = {"message": msg, "data": {"username": user.username, "email": user.email}}
    return json.dumps(resp)


def login_user(request):
    user_to_login = json.loads(request.body)
    user = authenticate(
        username=user_to_login["username"], password=user_to_login["password"]
    )

    if user is not None:
        login(request, user)
        return HttpResponse(create_user_resp(user=user, msg="Successfully logged in"))

    return HttpResponseBadRequest("Incorrect credentials")


def login_status(request):
    if request.user.is_authenticated:
        return HttpResponse(
            create_user_resp(user=request.user, msg="Login status: logged in")
        )

    return HttpResponse(json.dumps({"message": "Login status: logged out"}))


def login_view(request):
    if request.method == "POST":
        return login_user(request)
    elif request.method == "GET":
        return login_status(request)

    return HttpResponseBadRequest("Login only handles POST and GET")


def logout_view(request):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot logout")

    logout(request)
    return HttpResponse("Successfully logged out")
