from django.contrib.auth.models import User
from django.http import HttpResponse


def register(request):
    print(f"REGISTER: {request.body}")
    return HttpResponse("YOU ARE REGISTERED NOT HUEHUEHUEH")
