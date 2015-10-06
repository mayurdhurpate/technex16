# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0008_auto_20150923_2352'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='facebook_acesstoken',
            field=models.CharField(max_length=200, unique=True, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='user',
            name='facebook_id',
            field=models.CharField(max_length=200, unique=True, null=True, blank=True),
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
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 10, 6, 14, 45, 37, 347029)),
        ),
    ]
