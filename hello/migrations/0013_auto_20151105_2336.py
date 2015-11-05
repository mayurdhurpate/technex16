# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
import ckeditor_uploader.fields


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0012_auto_20151105_1923'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event_Options',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('label', models.CharField(max_length=50)),
                ('content', ckeditor_uploader.fields.RichTextUploadingField()),
                ('order', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='event',
            name='content',
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 5, 23, 36, 43, 346189)),
        ),
        migrations.AddField(
            model_name='event_options',
            name='event',
            field=models.ForeignKey(to='hello.Event'),
        ),
    ]
