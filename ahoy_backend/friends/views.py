import json

from django.contrib.auth import get_user_model
from django.http import HttpResponse, HttpResponseBadRequest

from friends.models import FriendRequest


def friend_request_view(request, receiver_username):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot send friend requests")

    sender_username = request.user.username

    sender_user = get_user_model().objects.get(username=sender_username)
    receiver_user = get_user_model().objects.get(username=receiver_username)

    found_requests = FriendRequest.objects.filter(
        sender=sender_user, receiver=receiver_user
    )

    if len(found_requests) > 0:
        return HttpResponseBadRequest(
            f"User {sender_username} already has pending friend request to {receiver_username}"
        )

    FriendRequest.objects.create_friend_request(
        sender=sender_user, receiver=receiver_user
    )

    resp_body = {
        "message": "Successfully sent friend request",
        "data": {"sender": sender_username, "receivier": receiver_username},
    }

    return HttpResponse(json.dumps(resp_body))
