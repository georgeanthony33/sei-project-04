from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=40)
    second_name = models.CharField(max_length=40)
    email = models.CharField(max_length=40, unique=True)
    user_image = models.CharField(max_length=500, blank=True)