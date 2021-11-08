from rest_framework import serializers
from .models import Friend, Source, Message, User, Group

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ["id", "name", "organization", "phone", "email", "remarks"]

class MessageSerializer(serializers.ModelSerializer):
    group = serializers.RelatedField(source="group", queryset=Group.objects.all())

    class Meta:
        model = Message
        fields = ["id", "messageID", "group", "sender", "timestamp", "content"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "userID"]

class GroupSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Group
        fields = ["id", "groupID", "users"]

class FriendSerializer(serializers.ModelSerializer):
    fromUser = serializers.RelatedField(source="from_user", queryset=User.objects.all())
    toUser = serializers.RelatedField(source="to_user", queryset=User.objects.all())

    class Meta:
        model = Friend
        fields = ["id", "fromUser", "toUser"]