# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0019_auto_20151110_1331'),
    ]

    operations = [
        migrations.CreateModel(
            name='TeamMember',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.EmailField(max_length=100, null=True, blank=True)),
                ('name', models.CharField(max_length=100, null=True, blank=True)),
                ('phone', models.CharField(max_length=20, null=True, blank=True)),
                ('facebook_accesstoken', models.CharField(max_length=500, null=True, blank=True)),
                ('facebook_id', models.CharField(max_length=200, null=True, blank=True)),
            ],
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 26, 0, 13, 11, 186905)),
        ),
    ]
