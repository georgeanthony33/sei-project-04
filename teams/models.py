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



# class PlayerAmount(models.Model):

#     GOALKEEPER = 1
#     DEFENDER = 4
#     MIDFIELDER = 4
#     FORWARD = 2
#     AMOUNT_CHOICES = (
#         (GOALKEEPER, 'Goalkeeper'),
#         (DEFENDER, 'Defender'),
#         (MIDFIELDER, 'Midfielder'),
#         (FORWARD, 'Forward')
#     )

#     team = models.ForeignKey('Team', related_name='player_amounts', on_delete=models.SET_NULL, null=True)
#     goalkeepers = models.ForeignKey('Goalkeeper', related_name='player_amounts', on_delete=models.SET_NULL, null=True, blank=True)
#     defenders = models.ForeignKey('Defender', related_name='player_amounts', on_delete=models.SET_NULL, null=True, blank=True)
#     midfielders = models.ForeignKey('Midfielder', related_name='player_amounts', on_delete=models.SET_NULL, null=True, blank=True)
#     forwards = models.ForeignKey('Forward', related_name='player_amounts', on_delete=models.SET_NULL, null=True, blank=True)
#     amount = models.IntegerField(choices=AMOUNT_CHOICES)

# class Team(models.Model):
#     teamName = models.CharField(max_length=50)
#     manager = models.ForeignKey(User, related_name='teams', null=True, on_delete=models.CASCADE)
#     teamPoints = models.SmallIntegerField()
#     goalkeepers = models.ForeignKey(
#         'Goalkeeper',
#         related_name='player_amounts',
#         blank=True,
#         null=True,
#         # limit_choices_to={'position': 1},
#         on_delete=models.SET_NULL
#     )
#     defenders = models.ForeignKey(
#         'Defender',
#         related_name='player_amounts',
#         blank=True,
#         null=True,
#         # limit_choices_to={'position': 1},
#         on_delete=models.SET_NULL
#     )
#     midfielders = models.ForeignKey(
#         'Midfielder',
#         related_name='player_amounts',
#         blank=True,
#         null=True,
#         # limit_choices_to={'position': 1},
#         on_delete=models.SET_NULL
#     )
#     forwards = models.ForeignKey(
#         'Forward',
#         related_name='player_amounts',
#         blank=True,
#         null=True,
#         # limit_choices_to={'position': 1},
#         on_delete=models.SET_NULL
#     )

#     def __str__(self):
#         return f'{self.teamName}'

# class Goalkeeper(models.Model):

#     player = models.ManyToManyField('players.Player', related_name='goalkeeper', blank=True, limit_choices_to={'position': 1})

# class Defender(models.Model):

#     player = models.ManyToManyField('players.Player', related_name='defender', blank=True, limit_choices_to={'position': 2})

# class Midfielder(models.Model):

#     player = models.ManyToManyField('players.Player', related_name='midfielder', blank=True, limit_choices_to={'position': 3})

# class Forward(models.Model):

#     player = models.ManyToManyField('players.Player', related_name='forward', blank=True, limit_choices_to={'position': 4})