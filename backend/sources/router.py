from django.urls import path, include
from . import messaging
from . import groupmsg
from . import userUtils
from . import friendUtils
from . import emojiUtils

urlpatterns = [
    # GAMERS
    path('sources/getMessagesOfUser/<str:userID>', messaging.getMessagesOfUser),
    path('sources/addMessage', messaging.addMessage),
    path('sources/deleteMessage/<str:messageID>', messaging.deleteMessage),
    path('sources/getMessagesOfGroup/<str:groupID>', messaging.getMessagesOfGroup),
    path('sources/getLatestMessageByGroup/<str:groupID>', messaging.getLatestMessageByGroup),
    path('sources/getGroupsOfUser/<str:userID>', groupmsg.getGroupsOfUser),
    path('sources/createNewGroup', groupmsg.createNewGroup),
    path('sources/deleteGroup/<str:groupID>', groupmsg.deleteGroup),
    path('sources/addUsersToGroup', groupmsg.addUsersToGroup),
    path('sources/getUsersInGroup/<str:groupID>', groupmsg.getUsersInGroup),
    path('sources/addUser', userUtils.addUser),
    path('sources/getUser/<str:userID>', userUtils.getUser),
    path('sources/updateUser/<str:userID>', userUtils.updateUser),
    path('sources/getUserByUsername/<str:username>', userUtils.getUserByUsername),
    path('sources/getAllUsers', userUtils.getAllUsers),
    path('sources/searchUsers/<str:input_str>', userUtils.searchUsers),
    path('sources/getFriends/<str:userID>', friendUtils.getFriends),
    path('sources/areFriends/<str:userID1>/<str:userID2>', friendUtils.areFriends),
    path('sources/addFriend', friendUtils.addFriend),
    path('sources/getEmojiReactions/<str:messageID>', emojiUtils.getEmojiReactions),
    path('sources/addEmojiReaction', emojiUtils.addEmojiReaction),
    path('sources/deleteEmojiReaction/<str:emojiReactionID>', emojiUtils.deleteEmojiReaction)
]