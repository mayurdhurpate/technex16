# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0009_merge'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 9, 25, 2, 17, 15, 98955)),
        ),
        migrations.AlterField(
            model_name='user',
            name='google_id',
            field=models.CharField(max_length=100, unique=True, null=True, blank=True),
        ),
    ]
