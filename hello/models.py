from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class User(models.Model):
    email = models.EmailField(max_length=100)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=200)
    college = models.CharField(max_length=100)
    year = models.CharField(max_length=5)
    points=models.IntegerField(default=0)
    google_id = models.CharField(max_length=200)
    image_link = models.URLField(default="")
    slug = models.SlugField(unique=True)
    image_url=models.CharField(null=True,blank=True,max_length=1000)
    google_id=models.CharField(null=True,blank=True,unique=True,max_length=100)
    google_registered=models.BooleanField(default=False)
    facebook_acesstoken=models.CharField(null=True,blank=True,unique=True,max_length=200)
    facebook_id=models.CharField(null=True,blank=True,unique=True,max_length=200)
    facebook_registered=models.BooleanField(default=False)
    def save(self, *args, **kwargs):
      self.slug = slugify(self.email)
      super(User, self).save(*args,**kwargs)

    def __str__(self):
        return self.name

class ParentEvent(models.Model):
    name=models.CharField(max_length=100)
    order=models.IntegerField(default=1)

    def __str__(self):
        return self.name


class Event(models.Model):
    name=models.CharField(max_length=100)
    content=models.TextField()
    parent_event=models.ForeignKey(ParentEvent)
    order=models.IntegerField(default=1)
    slug = models.SlugField(unique=True)
    def save(self, *args, **kwargs):
      self.slug = slugify(self.name)
      super(Event, self).save(*args,**kwargs)

    def __str__(self):
        return self.name

class Team(models.Model):
    team_name = models.CharField(max_length=100,unique=True)
    team_leader_email=models.CharField(max_length=100)
    team_members=models.ManyToManyField(User)
    event=models.ManyToManyField(Event)
    slug = models.SlugField(unique=True)
    def save(self, *args, **kwargs):
      self.slug = slugify(self.team_name)
      super(Team, self).save(*args,**kwargs)

    def __str__(self):
        return self.team_name


class Post(models.Model):
    title=models.CharField(max_length=200)
    content=models.TextField()
    event=models.ForeignKey(Event)
    datetime_added=models.DateTimeField(default=datetime.now())
    priority=models.IntegerField(default=1)

    def __str__(self):
        return self.title
