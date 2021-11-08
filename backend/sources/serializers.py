from rest_framework import serializers
from .models import Friendship, Source, Message, User, Group

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
        fields = ["id", "userID", "profilePicPath", "username"]

class GroupSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Group
        fields = ["id", "groupID", "users"]

class UserField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
            'id': obj.id,
            'userID': obj.userID,
            'profilePicPath': obj.profilePicPath,
            'username': obj.username
        }

    def to_internal_value(self, data):
        try:
            try:
                obj_userID = data
                user = User.objects.get(userID=obj_userID)
                return user
            except KeyError:
                raise serializers.ValidationError('id is a required field.')
            except ValueError:
                raise serializers.ValidationError('id must be an integer.')
        except User.DoesNotExist:
            raise serializers.ValidationError('Obj does not exist.')

class FriendshipSerializer(serializers.ModelSerializer):
    fromUser = UserField(queryset=User.objects.all())
    toUser = UserField(queryset=User.objects.all())

    class Meta:
        model = Friendship
        fields = ["id", "fromUser", "toUser"]