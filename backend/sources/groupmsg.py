from django.http import JsonResponse, QueryDict
from django.views.decorators import csrf
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .models import User, Group
from .serializers import MessageSerializer, GroupSerializer
import uuid

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
    userIDs = request.POST.get("userIDs")  # The request JSON should include an array of userIDs to add to this group

    newGroupID = uuid.uuid4().hex   # UUID creates a random unique ID
    newGroup = Group.objects.create(groupID=newGroupID)

    for userID in userIDs:
        user = User.objects.get(userID=userID)
        newGroup.users.add(user)


@api_view(['PUT'])
def addUsersToGroup(request):
    requestData = QueryDict(request.body)

    userIDs = requestData.userIDs  # The request JSON should include an array of userIDs to add to this group
    groupID = requestData.groupID
    
    group = Group.objects.get(groupID=groupID)

    for userID in userIDs:
        user = User.objects.get(userID=userID)
        group.users.add(user)


@api_view(['GET'])
def getUsersInGroup(request, groupID):
    # Get all users under the groupID
    group = Group.objects.get(groupID=groupID)
    userList = group.users.all()

    # Use the serializer to change it to JSON format
    serializer = GroupSerializer(userList, many=True)               
    return JsonResponse(serializer.data, safe=False)