from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=40)
    second_name = models.CharField(max_length=40)
    email = models.CharField(max_length=40, unique=True)
    user_image = models.CharField(max_length=500, blank=True, default='https://www.oxfordmail.co.uk/resources/images/10635381.jpg?display=1&htype=0&type=responsive-gallery')