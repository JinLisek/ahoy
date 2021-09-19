from django.urls import path

from friends.views import friend_request_view, get_friend_requests

urlpatterns = [
    path("", get_friend_requests, name="get_friend_requests"),
    path("<str:receiver_username>", friend_request_view, name="request_friend"),
]
