# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0004_auto_20150918_0104'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 9, 18, 1, 11, 9, 899624)),
        ),
        migrations.AlterField(
            model_name='team',
            name='team_name',
            field=models.CharField(unique=True, max_length=100),
        ),
    ]
