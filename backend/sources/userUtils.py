from django.http import JsonResponse, QueryDict
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import User
from .serializers import UserSerializer
import json
import traceback

@csrf_exempt
@api_view(['GET'])
def getAllUsers(request):
    userList = User.objects.all()

    serializer = UserSerializer(userList, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getUserByUsername(request, username):
    try:    
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"message": "User does not exist"}, status=400)
    
    serializer = UserSerializer(user)
    return JsonResponse(serializer.data)


@api_view(['GET'])
def getUser(request, userID):
    user = User.objects.get(userID=userID)

    serializer = UserSerializer(user)               
    return JsonResponse(serializer.data)

@api_view(['POST'])
def addUser(request):
    requestData = json.loads(request.body.decode('utf-8'))
    userID = requestData.get("userID")
    print("Received request to add user with ID " + str(requestData))

    # If the userID does not exist in the database then create it
    userAlreadyExisted = False
    try:
        user = User.objects.get(userID=userID)
        userAlreadyExisted = True
    except User.DoesNotExist:
        serializer = UserSerializer(data = request.data)
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        
        user = serializer.save()

    return JsonResponse({
        "alreadyExisted": userAlreadyExisted,
        "user": user.userID
    }, status=200)


@api_view(['PUT'])
def updateUser(request, userID):
    requestData = json.loads(request.body.decode('utf-8'))
    user = User.objects.get(userID=userID)

    newProfilePicPath = requestData.get('profilePicPath')
    newUsername = requestData.get('username')
    newBio = requestData.get('bio')

    userObj = {
        "id": user.id,
        "userID": userID,
        "profilePicPath": newProfilePicPath,
        "username": newUsername,
        "bio": newBio
    }

    serializer = UserSerializer(user, data = userObj)
    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)

    try:
        saved_user = serializer.save()
    except:
        return JsonResponse({"message":traceback.format_exc}, status=500)


    return JsonResponse({
        "profilePicPath": saved_user.profilePicPath,
        "username": saved_user.username,
        "bio": saved_user.bio
    }, status=200)
