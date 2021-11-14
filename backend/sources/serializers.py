from rest_framework import serializers
from .models import Friendship, Source, Message, User, Group, EmojiReaction

# Used for foreign key and many-to-many relationships in the database
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
                obj_userID = data.userID
                user = User.objects.get(userID=obj_userID)
                return user
            except KeyError:
                raise serializers.ValidationError('id is a required field.')
            except AttributeError:
                try: 
                    obj_userID = data
                    user = User.objects.get(userID=obj_userID)
                    return user
                except:
                    raise serializers.ValidationError('Error occured with userID')
        except User.DoesNotExist:
            raise serializers.ValidationError('User does not exist.')

class GroupField(serializers.RelatedField):
    def to_representation(self, obj):
        # Create array of users for JSON response
        userArr = []
        for user in obj.users.all():
            userArr.append(UserSerializer(user).data)

        return {
            'groupID': obj.groupID,
            'users': userArr
        }

    def to_internal_value(self, data):
        try:
            try:
                obj_groupID = data.groupID
                group = Group.objects.get(groupID=obj_groupID)
                return group
            except KeyError:
                raise serializers.ValidationError('id is a required field')
        except Group.DoesNotExist:
            raise serializers.ValidationError('Group does not exist.')

class MessageField(serializers.RelatedField):
    def to_representation(self, obj):
        return {
            "messageID": obj.messageID,
            "group": GroupSerializer(obj.group).data,
            "sender": UserSerializer(obj.sender).data,
            "timestamp": obj.timestamp,
            "content": obj.content
        }

    def to_internal_value(self, data):
        try:
            try:
                obj_messageID = data
                msg = Message.objects.get(messageID=obj_messageID)
                return msg
            except KeyError:
                raise serializers.ValidationError('id is a required field')
        except Group.DoesNotExist:
            raise serializers.ValidationError('Message does not exist.')

# Serializers, turn data from table fields to JSON objects
class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ["id", "name", "organization", "phone", "email", "remarks"]

class MessageSerializer(serializers.ModelSerializer):
    group = GroupField(queryset=Group.objects.all())
    sender = UserField(queryset=User.objects.all())

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

class FriendshipSerializer(serializers.ModelSerializer):
    fromUser = UserField(queryset=User.objects.all())
    toUser = UserField(queryset=User.objects.all())

    class Meta:
        model = Friendship
        fields = ["id", "fromUser", "toUser"]

class EmojiReactionSerializer(serializers.ModelSerializer):
    messageID = MessageField(queryset=Message.objects.all())
    sender = UserField(queryset=User.objects.all())

    class Meta:
        model = EmojiReaction
        fields = ["id", "messageID", "emojiReactionID", "sender", "timestamp", "emoji"]