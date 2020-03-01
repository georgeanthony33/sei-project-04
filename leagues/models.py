from django.db import models
from django.contrib.auth import get_user_model
from teams.models import Team
User = get_user_model()

class League(models.Model):
    name = models.CharField(max_length=50)
    creator = models.ForeignKey(User, related_name='leagues', null=True, on_delete=models.SET(1))
    teams = models.ManyToManyField(Team, related_name='leagues', blank=True)

    def __str__(self):
        return f'{self.name}'

