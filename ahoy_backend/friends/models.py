from django.contrib.auth import get_user_model
from django.db import models


class FriendRequestManager(models.Manager):
    def create_friend_request(self, sender, receiver):
        request = self.create(sender=sender, receiver=receiver)

        return request


class FriendRequest(models.Model):
    sender = models.ForeignKey(
        get_user_model(),
        related_name="sender",
        to_field="username",
        on_delete=models.CASCADE,
    )
    receiver = models.ForeignKey(
        get_user_model(),
        related_name="receiver",
        to_field="username",
        on_delete=models.CASCADE,
    )

    objects = FriendRequestManager()
