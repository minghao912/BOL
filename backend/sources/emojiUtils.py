from django.http import JsonResponse
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import EmojiReaction, Message
from .serializers import EmojiReactionSerializer

import uuid
import json
import traceback

@csrf_exempt
@api_view(['GET'])
def getEmojiReactions(request, messageID):
    # Get all emojis attached to a message
    message = Message.objects.filter(messageID=messageID)
    emojisList = EmojiReaction.objects.filter(messageID__in=message)

    # Change to JSON
    serializer = EmojiReactionSerializer(emojisList, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def addEmojiReaction(request):
    # Get data from request JSON
    requestData = json.loads(request.body.decode('utf-8'))
    messageID = requestData.get("messageID")
    sender = requestData.get("userID")
    timestamp = requestData.get("timestamp")
    emoji = requestData.get("emoji")

    # Create the emoji ID
    emojiReactionID = uuid.uuid4().hex

    # Create a dictionary
    emojiReactionObj = {
        "messageID": messageID,
        "emojiReactionID": emojiReactionID,
        "sender": sender,
        "timestamp": timestamp,
        "emoji": emoji
    }

    # Add it to db
    serializer = EmojiReactionSerializer(data=emojiReactionObj)

    if not serializer.is_valid():
        return JsonResponse(serializer.errors, status=400)
    
    try:
        savedEmojiReaction = serializer.save()
    except:
        return JsonResponse({"error":traceback.format_exc()}, status=500)

    return JsonResponse({
        "emojiReactionID": savedEmojiReaction.emojiReactionID
    })

@api_view(['DELETE'])
def deleteEmojiReaction(request, emojiReactionID):
    emoji = EmojiReaction.objects.get(emojiReactionID=emojiReactionID)

    try:
        emoji.delete()
    except EmojiReaction.DoesNotExist:
        return JsonResponse({"error": "Emoji reaction does not exist"}, status=400)
    except:
        return JsonResponse({"error": traceback.format_exc()}, status=500)
    
    return JsonResponse({
        "emojiReactionID": emojiReactionID
    })