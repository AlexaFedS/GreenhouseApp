from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from .serializers import *

# Create your views here.

@permission_classes ([IsAuthenticated])
@api_view(['GET'])
def getGreenHouses(request, id):
    houses = GreenHouse.objects.all()
    hbuf = []
    for house in houses:
        if (house.idUser.id == id): hbuf.append(house)
    serializer = GreenHouseSerializer(hbuf, many = True)
    return Response(serializer.data)

@permission_classes ([IsAuthenticated])
@api_view(['POST'])
def addGreenHouse(request):
    serializer = GreenHouseSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@permission_classes ([IsAuthenticated])
@api_view(['GET'])
def getGreenHouse(request, id):
    house = get_object_or_404(GreenHouse, id=id)
    serializer = GreenHouseSerializer(house)
    sensors = Sensor.objects.filter(idGreenHouse = id)
    serializerSensor = SensorSerializer(sensors, many = True)
    result = list()
    result = serializer.data
    result["sensors"] = serializerSensor.data
    return Response(result)

@permission_classes ([IsAuthenticated])
@api_view(['PUT'])
def editGreenHouse(request, id):
    house = get_object_or_404(GreenHouse, id = id)
    mbuff = list()
    mbuff = request.data
    try:
        sensors = mbuff.pop('sensors')
        for sensor in sensors:
            mySensor = get_object_or_404(Sensor, id = sensor['id'])
            serializerSen = SensorSerializer(mySensor, data = sensor)
            if serializerSen.is_valid(): serializerSen.save()
    except: 
        None
    try:
        newSensors = mbuff.pop('newSensors')
        for newSensor in newSensors:
            newSer = SensorSerializer(data = newSensor)
            if newSer.is_valid(): newSer.save()
            else: return Response(newSer.errors)
    except:
        None
    try:
        delSensors = mbuff.pop('deleteSensors')
        for delSensor in delSensors:
            sensor = get_object_or_404(Sensor, id = delSensor["id"])
            sensor.delete()
    except:
        None
    serializer = GreenHouseSerializer(house, data = mbuff)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@permission_classes ([IsAuthenticated])
@api_view(['DELETE'])
def deleteGreenHouse(request, id):
    house = get_object_or_404(GreenHouse, id=id)
    house.delete()
    return Response({"Status:":"Ok"})

@api_view(['GET'])
def getSensor(request, id):
    sensor = get_object_or_404(Sensor, id = id)
    serializer = SensorSerializer(sensor)
    return Response(serializer.data["standart"])

@permission_classes ([IsAuthenticated])
@api_view(['GET'])
def getSensors(request, id):
    sensors = Sensor.objects.filter(idGreenHous = id)
    serializer = SensorSerializer(sensors, many = True)
    return Response(serializer.data)

@permission_classes ([IsAuthenticated])
@api_view(['POST'])
def addSensor(request):
    serializer = SensorSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@permission_classes ([IsAuthenticated])
@api_view(['PUT'])
def editSensor(request, id):
    sensor = get_object_or_404(Sensor, id = id)
    serializer = SensorSerializer(sensor, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@permission_classes ([IsAuthenticated])
@api_view(['DELETE'])
def deleteSensor(request, id):
    sensor = get_object_or_404(Sensor, id=id)
    sensor.delete()
    return Response({"Status:":"Ok"})

@permission_classes ([IsAuthenticated])
@api_view(['GET'])
def getClimate(request, id):
    sensors = Sensor.objects.filter(idGreenHouse = id)
    serSensors = SensorSerializer(sensors, many=True)
    climates = []
    for sensor in serSensors.data:
        climate = Climate.objects.filter(idSensor = sensor["id"]).last()
        serCli = ClimatetSerializer(climate)
        if(serCli.data["idSensor"]!=None):
            climates.append(serCli.data)
    return Response(climates)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getClimates(request, id):
    mbuff = {}
    sensors = Sensor.objects.filter(idGreenHouse = id)
    senSer = SensorSerializer(sensors, many=True)
    for sensor in senSer.data:
        climates = Climate.objects.filter(idSensor = sensor["id"])
        serializer = ClimatetSerializer(climates, many=True)
        mbuff[sensor["id"]] = serializer.data
    return Response(mbuff)

@api_view(['POST'])
def addClimate(request):
    serializer = ClimatetSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
def ping(request):
    return Response({"Status": "Ok"})
