from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=40, unique=True)
    user_image = models.CharField(max_length=500)