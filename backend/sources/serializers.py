from rest_framework import serializers
from .models import Source, Message

class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ["id", "name", "organization", "phone", "email", "remarks"]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "messageID", "sender", "timestamp", "content", "isImage"]