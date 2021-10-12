from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    friends = models.ManyToManyField(get_user_model(), blank=True, related_name="+")


@receiver(post_save, sender=get_user_model())
def create_profile(sender, instance, created, **kwargs):
    del sender
    if created:
        print("create_profile")
        Profile.objects.create(user=instance)


@receiver(post_save, sender=get_user_model())
def save_profile(sender, instance, **kwargs):
    del sender
    print("save_profile")
    instance.profile.save()
