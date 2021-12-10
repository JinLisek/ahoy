import json

from channels.http import AsgiRequest
from django.contrib.auth import get_user_model
from django.http import HttpResponseBadRequest, JsonResponse

from chat.chat_events import post_message


def does_user_exist(username: str) -> bool:
    return get_user_model().objects.filter(username=username).exists()


def send_message(request: AsgiRequest, receiver_username: str):
    if not request.user.is_authenticated:
        return HttpResponseBadRequest("Not logged in, cannot send messages")

    sender_username = request.user.username

    if sender_username == receiver_username:
        return HttpResponseBadRequest("Cannot send message to yourself")

    if not does_user_exist(username=sender_username):
        return HttpResponseBadRequest(f"User: {sender_username} doesn't exist")

    if not does_user_exist(username=receiver_username):
        return HttpResponseBadRequest(f"User: {receiver_username} doesn't exist")

    request_body = json.loads(request.body)
    message = request_body["message"]

    data = {
        "sender": sender_username,
        "receiver": receiver_username,
        "message": message,
    }

    post_message(data)

    response = {"message": "Successfully sent message"}

    return JsonResponse(response)
