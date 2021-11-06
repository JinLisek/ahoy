from django.urls import path

from chat.views import send_message

urlpatterns = [
    path("send_message/<str:receiver_username>", send_message, name="send_message")
]
