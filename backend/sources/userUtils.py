from django.http import JsonResponse, QueryDict
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import User, Group, Friend
from .serializers import UserSerializer
import json

@csrf_exempt
@api_view(['GET'])
def getUser(request, userID):
    user = User.objects.get(userID=userID)

    serializer = UserSerializer(user)               
    return JsonResponse(serializer.data)

@api_view(['POST'])
def addUser(request):
    requestData = json.loads(request.body.decode('utf-8'))
    userID = requestData.get("userID")
    print(requestData)

    # If the userID does not exist in the database then create it
    userAlreadyExisted = False
    try:
        user = User.objects.get(userID=userID)
        userAlreadyExisted = True
    except User.DoesNotExist:
        user = User.objects.create(userID=userID)

    return JsonResponse({
        "alreadyExisted": userAlreadyExisted,
        "user": user.userID
    }, status=200)