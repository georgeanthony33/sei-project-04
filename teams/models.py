from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Team(models.Model):
    teamName = models.CharField(max_length=50)
    manager = models.ForeignKey(User, related_name='teams', null=True, on_delete=models.CASCADE)
    teamPoints = models.SmallIntegerField()
    goalkeepers = models.ManyToManyField(
        'players.Player',
        related_name='goalkeepers',
        blank=True,
        limit_choices_to={'position': 1},
    )
    defenders = models.ManyToManyField(
        'players.Player',
        related_name='defenders',
        blank=True,
        limit_choices_to={'position': 2}
    )
    midfielders = models.ManyToManyField(
        'players.Player',
        related_name='midfielders',
        blank=True,
        limit_choices_to={'position': 3}
    )
    forwards = models.ManyToManyField(
        'players.Player',
        related_name='forwards',
        blank=True,
        limit_choices_to={'position': 4}
    )


    def __str__(self):
        return f'{self.teamName}'