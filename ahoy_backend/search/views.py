import json

from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseBadRequest


def search_view(request):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot search")

    search_request = json.loads(request.body)
    found_users = User.objects.filter(username__contains=search_request["search_text"])

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
