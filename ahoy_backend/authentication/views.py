from json import loads

from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse, HttpResponseBadRequest


def register(request):
    user_to_register = loads(request.body)
    users_with_requested_name_or_email = User.objects.filter(
        Q(username=user_to_register["user_name"]) | Q(email=user_to_register["email"])
    )

    if len(users_with_requested_name_or_email) == 0:
        User.objects.create_user(
            username=user_to_register["user_name"],
            email=user_to_register["email"],
            password=user_to_register["password"],
        )
        return HttpResponse("Correctly registered", status=201)

    return HttpResponseBadRequest("User duplicated")
