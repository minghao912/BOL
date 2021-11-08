from django.db import models

class Source(models.Model):
    name = models.CharField(max_length=256)
    organization = models.CharField(max_length=256)
    phone = models.TextField(blank=True)
    email = models.TextField(blank=True)
    remarks = models.TextField(blank=True)

class User(models.Model):
    userID = models.CharField(max_length=256)

class Friend(models.Model):
    fromUser = models.ForeignKey(User, related_name="from_user", on_delete=models.CASCADE)
    toUser = models.ForeignKey(User, related_name="to_user", on_delete=models.CASCADE)

class Group(models.Model):
    groupID = models.CharField(max_length=256)
    users = models.ManyToManyField(User, related_name="users")

class Message(models.Model):
    messageID = models.CharField(max_length=256)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    sender = models.CharField(max_length=256)
    timestamp = models.CharField(max_length=64)
    content = models.TextField(blank=True)