# Generated by Django 3.0.3 on 2021-11-24 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sources', '0011_user_bio'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='bio',
            field=models.TextField(blank=True, default='I love BOL!'),
        ),
    ]