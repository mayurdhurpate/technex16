from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify
from ckeditor_uploader.fields import RichTextUploadingField

class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class User(models.Model):
    email = models.EmailField(max_length=100)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=200)
    college = models.CharField(max_length=100)
    year = models.CharField(max_length=5)
    total_points=models.IntegerField(default=0)
    google_id = models.CharField(max_length=200)
    image_link = models.URLField(default="")
    slug = models.SlugField(unique=True)
    image_url=models.CharField(null=True,blank=True,max_length=1000)
    google_id=models.CharField(null=True,blank=True,max_length=100)
    google_registered=models.BooleanField(default=False)
    facebook_acesstoken=models.CharField(null=True,blank=True,max_length=200)
    facebook_id=models.CharField(null=True,blank=True,max_length=200)
    facebook_registered=models.BooleanField(default=False)
    login=models.IntegerField(default=0)#mannual=0,google=1,facebook=2
    def save(self, *args, **kwargs):
      self.slug = slugify(self.email)
      super(User, self).save(*args,**kwargs)

    def __str__(self):
        return self.name

class ParentEvent(models.Model):
    name=models.CharField(max_length=100)
    order=models.IntegerField(default=1)
    intro=models.CharField(max_length=2000,null=True,blank=True)

    def __str__(self):
        return self.name


class Event(models.Model):
    name=models.CharField(max_length=100)
    parent_event=models.ForeignKey(ParentEvent)
    order=models.IntegerField(default=1)
    slug = models.SlugField(unique=True)
    def save(self, *args, **kwargs):
      self.slug = slugify(self.name)
      super(Event, self).save(*args,**kwargs)

    def __str__(self):
        return self.name

class Event_Options(models.Model):
    label = models.CharField(max_length=50)
    content = content=RichTextUploadingField()
    event = models.ForeignKey(Event)
    order = models.IntegerField()
    def __str__(self):
        return "%s" % (self.label)
    def __unicode__(self):
        return u'%s' % (self.label)


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

class Points(models.Model):
    user=models.OneToOneField(User)
    google_registerd = models.BooleanField(default=False)
    facebook_registered = models.BooleanField(default=False)
    app_download  = models.BooleanField(default=False)
    event_register  = models.IntegerField(default=0)
    share_technex_website  = models.BooleanField(default=False)
    share_technex_page  = models.BooleanField(default=False)
    #guest lectures sharing -
    #workshop register - 50
    #post share - 5
    #post like - 2
    #visit 1 day - 1
    #invite from link(referral) - 5
    #accomodation allotment,fees - 200
    #abstract submission - 50
    #industrial conclave - 50
    #watermark app photo - 50
    #pronites register - 200
    def __str__(self):
        return self.user.name
