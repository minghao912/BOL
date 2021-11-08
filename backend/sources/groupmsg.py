from django.http import HttpResponse, JsonResponse
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import Message, User, Group, Friend
from .serializers import MessageSerializer, GroupSerializer

@csrf_exempt
@api_view(['GET'])
def getMessages(request, userID, GroupID):
    # Get all messages where the sender is equal to userID
    messageList = Message.objects.filter(sender=userID, group=GroupID)

    # Use the serializer to change it to JSON format
    serializer = MessageSerializer(messageList, many=True)               
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getGroupUsers(request, GroupID):
    # Get all messages where the sender is equal to userID
    UserList = Message.objects.filter(group=GroupID)

    # Use the serializer to change it to JSON format
    serializer = GroupSerializer(UserList, many=True)               
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def addMessage(request, GroupID):
    serializer = MessageSerializer(data=request.data)

    # Return 400 Error if the request has invalid data
    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)

    try:
        savedMessage = serializer.save()
    except:
        return JsonResponse({"message":"An error occurred internally"}, status=500)
    
    return JsonResponse({
        "messageID": savedMessage.messageID
    })