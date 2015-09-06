from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class User(models.Model):
	name = models.CharField(max_length=100)
	phone = models.CharField(max_length=20)
	email = models.EmailField(max_length=100)
	college = models.CharField(max_length=100)
	year = models.IntegerField()
	city = models.CharField(max_length=30)
	password = models.CharField(max_length=200)

	def __str__(self):
		return self.name