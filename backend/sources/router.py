from django.urls import path, include
from . import views
from . import messaging
from . import groupmsg
from . import userUtils
from . import friendUtils
from . import emojiUtils

urlpatterns = [
    path('test/', views.test),
    path('sources/', views.sources),
    path('sources/get/<int:id>', views.getSource),
    path('sources/get/all', views.getAll),
    path('sources/create/', views.createSource),
    path('sources/update/<int:id>', views.updateSource),
    path('sources/delete/<int:id>', views.deleteSource),

    # GAMERS
    path('sources/getMessagesOfUser/<str:userID>', messaging.getMessagesOfUser),
    path('sources/addMessage', messaging.addMessage),
    path('sources/deleteMessage', messaging.deleteMessage),
    path('sources/getLatestMessageByGroup', messaging.getLatestMessageByGroup),
    path('sources/getGroupsOfUser/<str:userID>', groupmsg.getGroupsOfUser),
    path('sources/createNewGroup', groupmsg.createNewGroup),
    path('sources/addUsersToGroup', groupmsg.addUsersToGroup),
    path('sources/getUsersInGroup/<str:groupID>', groupmsg.getUsersInGroup),
    path('sources/addUser', userUtils.addUser),
    path('sources/getUser/<str:userID>', userUtils.getUser),
    path('sources/getUserByUsername/<str:username>', userUtils.getUserByUsername),
    path('sources/getAllUsers', userUtils.getAllUsers),
    path('sources/getFriends/<str:userID>', friendUtils.getFriends),
    path('sources/addFriend', friendUtils.addFriend),
    path('sources/getEmojiReactions/<str:messageID>', emojiUtils.getEmojiReactions),
    path('sources/addEmojiReaction', emojiUtils.addEmojiReaction),
    path('sources/deleteEmojiReaction/<str:emojiReactionID>', emojiUtils.deleteEmojiReaction)
]