# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0002_auto_20150917_2310'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='slug',
            field=models.SlugField(default='line', unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 9, 17, 23, 39, 59, 196786)),
        ),
    ]
