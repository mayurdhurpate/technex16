# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0017_auto_20151109_2119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 10, 0, 44, 0, 909289)),
        ),
    ]
