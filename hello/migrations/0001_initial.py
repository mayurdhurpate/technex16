# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Greeting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('when', models.DateTimeField(auto_now_add=True, verbose_name=b'date created')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('phone', models.PositiveIntegerField()),
                ('email', models.EmailField(max_length=100)),
                ('college', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('city', models.CharField(max_length=30)),
                ('password', models.CharField(max_length=200)),
            ],
        ),
    ]
