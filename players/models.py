from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Player(models.Model):
    playerID = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(1000)])
    firstName = models.CharField(max_length=50)
    secondName = models.CharField(max_length=50)
    club = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(20)])
    position = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    cost = models.DecimalField(max_digits=3, decimal_places=1)
    eventPoints = models.SmallIntegerField()
    totalPoints = models.SmallIntegerField()

    def __str__(self):
        return f'{self.firstName} {self.secondName}'