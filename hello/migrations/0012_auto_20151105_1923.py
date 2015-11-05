# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
import ckeditor_uploader.fields


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0011_auto_20151009_0013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='content',
            field=ckeditor_uploader.fields.RichTextUploadingField(),
        ),
        migrations.AlterField(
            model_name='post',
            name='datetime_added',
            field=models.DateTimeField(default=datetime.datetime(2015, 11, 5, 19, 23, 52, 989238)),
        ),
    ]
