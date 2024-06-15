from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
import datetime

# Create your models here.

class GreenHouse(models.Model):
    name = models.CharField(max_length=50, default="Оранжерея")
    description = models.CharField(max_length=255, default="Описания нет")
    hight = models.IntegerField()
    width = models.IntegerField()
    length = models.IntegerField()
    idUser = models.ForeignKey(User, on_delete = models.CASCADE)

class Sensor(models.Model):
    name = models.CharField(max_length=50)
    standart = models.IntegerField(default=0)
    idGreenHouse = models.ForeignKey(GreenHouse, on_delete=models.CASCADE)

class Climate(models.Model):
    time = models.DateTimeField(default=timezone.now)
    value = models.FloatField(default=0)
    idSensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)