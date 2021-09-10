import json

from django.contrib.auth import get_user_model
from django.http import HttpResponse, HttpResponseBadRequest


def search_view(request, search_text):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot search")

    found_users = get_user_model().objects.filter(username__contains=search_text)

    if len(found_users) == 0:
        return HttpResponseBadRequest("Nothing found")

    resp_body = {
        "users": list(
            map(
                lambda user: {"username": user.username, "email": user.email},
                found_users,
            )
        )
    }
    return HttpResponse(json.dumps(resp_body))
