from django.http import HttpResponse, JsonResponse
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import Message, Group, User
from .serializers import MessageSerializer

import uuid
import json
import traceback

@csrf_exempt
@api_view(['GET'])
def getMessagesOfUser(request, userID):
    # Get all messages where the sender is equal to userID
    sender = User.objects.filter(userID=userID)
    messageList = Message.objects.filter(sender__in=sender).all()

    # Use the serializer to change it to JSON format
    serializer = MessageSerializer(messageList, many=True)      
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def getMessagesOfGroup(request, groupID):
    # Get all messages where the group is equal to groupID
    group = Group.objects.filter(groupID=groupID)
    messageList = Message.objects.filter(group__in=group).all()

    # Use the serializer to change it to JSON format
    serializer = MessageSerializer(messageList, many=True)      
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def addMessage(request):
    # Get data from request JSON
    requestData = json.loads(request.body.decode('utf-8'))
    groupID = requestData.get("groupID")
    userID = requestData.get("userID")
    timestamp = requestData.get("timestamp")
    content = requestData.get("content")

    # Get group and user from database
    group = Group.objects.get(groupID=groupID)
    sender = User.objects.get(userID=userID)

    # Create message id
    messageID = uuid.uuid4().hex

    # Create obj
    messageObj = {
        "messageID": messageID,
        "group": group,
        "sender": sender,
        "timestamp": timestamp,
        "content": content
    }

    serializer = MessageSerializer(data=messageObj)

    # Return 400 Error if the request has invalid data
    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)

    try:
        savedMessage = serializer.save()
    except:
        return JsonResponse({"error": traceback.format_exc()}, status=500)
    
    return JsonResponse({
        "messageID": savedMessage.messageID
    })

@api_view(['DELETE'])
def deleteMessage(request, messageID):
    message = Message.objects.get(messageID=messageID)

    try:
        message.delete()
    except Message.DoesNotExist:
        return JsonResponse({"error": "Message does not exist"}, status=400)
    except:
        return JsonResponse({"error": traceback.format_exc()}, status=500)
    
    return JsonResponse({
        "messageID": messageID
    })

@api_view(['GET'])
def getLatestMessageByGroup(request, groupID):
    try:
        group = Group.objects.filter(groupID=groupID)
        message = Message.objects.filter(group__in=group).latest()
    except Group.DoesNotExist:
        return JsonResponse({"error": "Group does not exist"}, status=400)
    except Message.DoesNotExist:
        return JsonResponse({})
    
    serializer = MessageSerializer(message)
    return JsonResponse(serializer.data)