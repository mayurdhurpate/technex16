# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0009_auto_20151008_2238'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='login',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 10, 8, 22, 42, 12, 595208)),
        ),
    ]
