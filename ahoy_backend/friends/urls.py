from django.urls import path

from friends.views import friend_request_view

urlpatterns = [
    path("<str:receiver_username>", friend_request_view, name="request_friend"),
]
