from django.urls import path

from friends.views import (
    accept_friend_view,
    friend_request_view,
    get_friend_requests,
    reject_friend_view,
)

urlpatterns = [
    path("requests", get_friend_requests, name="get_friend_requests"),
    path("accept", accept_friend_view, name="accept_friend"),
    path("reject", reject_friend_view, name="reject_friend"),
    path("request", friend_request_view, name="request_friend"),
]
