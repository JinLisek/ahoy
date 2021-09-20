from django.urls import path

from friends.views import friend_request_view, get_friend_requests

urlpatterns = [
    path("requests", get_friend_requests, name="get_friend_requests"),
    path(
        "requests/<str:receiver_username>", friend_request_view, name="request_friend"
    ),
]
