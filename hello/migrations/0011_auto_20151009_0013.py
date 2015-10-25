# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0010_auto_20151008_2242'),
    ]

    operations = [
        migrations.CreateModel(
            name='Points',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('google_registerd', models.BooleanField(default=False)),
                ('facebook_registered', models.BooleanField(default=False)),
                ('app_download', models.BooleanField(default=False)),
                ('event_register', models.IntegerField(default=0)),
                ('share_technex_website', models.BooleanField(default=False)),
                ('share_technex_page', models.BooleanField(default=False)),
            ],
        ),
        migrations.RenameField(
            model_name='user',
            old_name='points',
            new_name='total_points',
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 10, 9, 0, 12, 58, 46354)),
        ),
        migrations.AddField(
            model_name='points',
            name='user',
            field=models.OneToOneField(to='hello.User'),
        ),
    ]
