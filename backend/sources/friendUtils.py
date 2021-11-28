from django.http import JsonResponse, QueryDict
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from .models import User, Friendship
from .serializers import FriendshipSerializer, UserSerializer
import json
import traceback

@csrf_exempt
@api_view(['GET'])
def getFriends(request, userID):
    friends = Friendship.objects.filter(Q(fromUser__userID=userID) | Q(toUser__userID=userID))

    serializer = FriendshipSerializer(friends, many=True)
    return JsonResponse(serializer.data, safe=False)

# attempt to create a backend function that checks whether two users are friends

@csrf_exempt
@api_view(['GET'])
def areFriends(request, userID1, userID2):
    friends = Friendship.objects.filter(
        Q(fromUser__userID=userID1) & Q(toUser__userID=userID2)
        | Q(toUser__userID=userID1) & Q(fromUser__userID=userID2))

    if (len(friends) != 0):
        return JsonResponse({"areFriends": "1"})
    return JsonResponse({"areFriends": "0"})


@api_view(['POST'])
def addFriend(request):
    # This function creates a friendship, used later
    def createFriendship(request):
        serializer = FriendshipSerializer(data=request.data)

        # Return 400 Error if the request has invalid data
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)

        try:
            savedFriendship = serializer.save()
        except:
            return JsonResponse({"message":traceback.format_exc}, status=500)

        return JsonResponse({
            "fromUser": UserSerializer(savedFriendship.fromUser).data,
            "toUser": UserSerializer(savedFriendship.toUser).data
        })

    # Check if friendship already exists
    requestData = json.loads(request.body.decode('utf-8'))
    fromUser = requestData.get('fromUser')
    toUser = requestData.get('toUser')

    try:
        existingFriendship = Friendship.objects.filter((Q(fromUser__userID=fromUser) & Q(toUser__userID=toUser)) | Q(fromUser__userID=toUser) & Q(toUser__userID=fromUser))

        print(existingFriendship)
        if not (existingFriendship.count() >= 1):
            return createFriendship(request)
        else:
            # If existing friendship found, return it
            return JsonResponse({
                "fromUser": UserSerializer(existingFriendship[0].fromUser).data,
                "toUser": UserSerializer(existingFriendship[0].toUser).data,
                "message": "Friendship already existed"
            })
    except Friendship.DoesNotExist:
        return createFriendship(request)
    