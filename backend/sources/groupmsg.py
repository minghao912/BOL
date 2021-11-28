from django.http import JsonResponse, QueryDict
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import User, Group
from .serializers import MessageSerializer, GroupSerializer, UserSerializer

import json
import uuid
import traceback

@csrf_exempt
@api_view(['GET'])
def getGroupsOfUser(request, userID):
    # Get all groups where the list of users contains userID
    user = User.objects.filter(userID=userID)
    groupList = Group.objects.filter(users__in=user)

    # Use the serializer to change it to JSON format
    serializer = GroupSerializer(groupList, many=True)               
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def createNewGroup(request):
    requestData = json.loads(request.body.decode('utf-8'))
    userIDs = requestData.get("userIDs")  # The request JSON should include an array of userIDs to add to this group

    print(userIDs)

    # Create the group first
    try:
        newGroupID = uuid.uuid4().hex   # UUID creates a random unique ID
        newGroup = Group.objects.create(groupID=newGroupID)
        print("New group created with ID ", str(newGroupID))
    except Exception as e:
        return JsonResponse({
            "error": traceback.format_exc()
        }, status=500)

    # Then add the users to the group
    addedUsers = []
    try:
        for userID in userIDs:
            user = User.objects.get(userID=userID)
            newGroup.users.add(user)
            addedUsers.append(user)
            print("Added user ", str(userID))
    except Exception as e:
        return JsonResponse({
            "error": traceback.format_exc()
        }, status=500)

    newUsersData = []
    for user in addedUsers:
        newUsersData.append(UserSerializer(user).data)

    # Return a success
    return JsonResponse({
        "newGroupID": newGroupID,
        "members": newUsersData
    }, status=200)

@api_view(['DELETE'])
def deleteGroup(request, groupID):
    group = Group.objects.get(groupID=groupID)

    try:
        group.delete()
    except Group.DoesNotExist:
        return JsonResponse({"error": "Group does not exist"}, status=400)
    except:
        return JsonResponse({"error": traceback.format_exc()}, status=500)
    
    return JsonResponse({
        "groupID": groupID
    })


@api_view(['PUT'])
def addUsersToGroup(request):
    requestData = json.loads(request.body.decode('utf-8'))

    # The request JSON should include an array of userIDs to add to this group
    userIDs = requestData.get("userIDs")  
    groupID = requestData.get("groupID")
    
    # Retreive group from db
    try:
        group = Group.objects.get(groupID=groupID)
    except Group.DoesNotExist:
        return JsonResponse({
            "error": "The specified group does not exist"
        }, status=400)

    # Add the users
    addedUsers = []
    try: 
        for userID in userIDs:
            user = User.objects.get(userID=userID)
            group.users.add(user)
            addedUsers.append(user)
    except Exception as e:
        return JsonResponse({
            "error": traceback.format_exc()
        }, status=500)

    # Return a success
    newUsersData = []
    for user in group.users.all():
        newUsersData.append(UserSerializer(user).data)

    return JsonResponse({
        "newGroupID": groupID,
        "members": newUsersData
    }, status=200)


@api_view(['GET'])
def getUsersInGroup(request, groupID):
    # Get all users under the groupID
    group = Group.objects.get(groupID=groupID)
    userList = group.users.all()

    # Use the serializer to change it to JSON format
    serializer = UserSerializer(userList, many=True)               
    return JsonResponse(serializer.data, safe=False)