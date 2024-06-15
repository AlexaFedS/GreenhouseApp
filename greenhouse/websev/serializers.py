from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class GreenHouseSerializer(serializers.ModelSerializer):

    class Meta:
        model = GreenHouse
        fields = '__all__'

class SensorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sensor
        fields = '__all__'

class ClimatetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Climate
        fields = '__all__'