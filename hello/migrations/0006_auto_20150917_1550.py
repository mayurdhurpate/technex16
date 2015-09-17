# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0005_merge'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='team_leader_email',
            field=models.CharField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='event',
            name='parent_event',
            field=models.ForeignKey(to='hello.ParentEvent'),
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 9, 17, 15, 50, 29, 988457)),
        ),
        migrations.DeleteModel(
            name='Parent_Event',
        ),
    ]
