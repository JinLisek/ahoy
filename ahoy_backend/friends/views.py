import json

from django.contrib.auth import get_user_model
from django.http import HttpResponse, HttpResponseBadRequest

from friends.models import FriendRequest


def get_friend_requests(request):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot send friend requests")

    friend_requests = FriendRequest.objects.filter(receiver=request.user)

    response = {
        "friend_requests": list(
            map(
                lambda friend_request: friend_request.sender.username,
                friend_requests,
            )
        )
    }

    return HttpResponse(json.dumps(response))


def friend_request_view(request, receiver_username):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot send friend requests")

    sender_username = request.user.username

    if sender_username == receiver_username:
        return HttpResponseBadRequest("Cannot send friend request to yourself")

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

    response = {
        "message": "Successfully sent friend request",
        "data": {"sender": sender_username, "receivier": receiver_username},
    }

    return HttpResponse(json.dumps(response))
