# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0008_merge'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='facebook_acesstoken',
            field=models.CharField(max_length=200, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='user',
            name='facebook_id',
            field=models.CharField(max_length=200, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='user',
            name='facebook_registered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='google_registered',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='image_url',
            field=models.CharField(max_length=1000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 10, 8, 22, 38, 52, 481332)),
        ),
        migrations.AlterField(
            model_name='user',
            name='google_id',
            field=models.CharField(max_length=100, null=True, blank=True),
        ),
    ]
