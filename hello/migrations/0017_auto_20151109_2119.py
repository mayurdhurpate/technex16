# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0016_auto_20151109_2100'),
    ]

    operations = [
        migrations.AddField(
            model_name='parentevent',
            name='intro',
            field=models.CharField(max_length=2000, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 9, 21, 19, 16, 797013)),
        ),
    ]
