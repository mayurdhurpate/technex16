# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0018_auto_20151110_0044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 10, 13, 31, 44, 572000)),
        ),
    ]
