from django.db import models

class Source(models.Model):
    name = models.CharField(max_length=256)
    organization = models.CharField(max_length=256)
    phone = models.TextField(blank=True)
    email = models.TextField(blank=True)
    remarks = models.TextField(blank=True)

class Message(models.Model):
    messageID = models.CharField(max_length=256)
    sender = models.CharField(max_length=256)
    timestamp = models.CharField(max_length=64)
    content = models.TextField(blank=True)
    isImage = models.BooleanField()