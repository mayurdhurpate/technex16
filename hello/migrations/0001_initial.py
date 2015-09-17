# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('content', models.TextField()),
                ('order', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Greeting',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('when', models.DateTimeField(auto_now_add=True, verbose_name=b'date created')),
            ],
        ),
        migrations.CreateModel(
            name='ParentEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('order', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('datetime_added', models.DateTimeField(default=datetime.datetime(2015, 9, 17, 23, 7, 35, 749575))),
                ('priority', models.IntegerField(default=1)),
                ('event', models.ForeignKey(to='hello.Event')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('team_name', models.CharField(max_length=100)),
                ('team_leader_email', models.CharField(max_length=100)),
                ('event', models.ManyToManyField(to='hello.Event')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('email', models.EmailField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=200)),
                ('college', models.CharField(max_length=100)),
                ('year', models.CharField(max_length=5)),
                ('points', models.IntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='team',
            name='team_members',
            field=models.ManyToManyField(to='hello.User'),
        ),
        migrations.AddField(
            model_name='event',
            name='parent_event',
            field=models.ForeignKey(to='hello.ParentEvent'),
        ),
    ]
