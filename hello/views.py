from django.shortcuts import render
from django.http import HttpResponse
from hello.models import User
from .models import Greeting
import json

# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'index.html')


def db(request):

    greeting = Greeting()
    greeting.save()

    greetings = Greeting.objects.all()

    return render(request, 'db.html', {'greetings': greetings})

def signup_email(request):
     if request.method=="POST":
         if request.POST.has_key('email'):
            email1 = request.POST['email']
            #print email1
            try:
                e = User.objects.filter(email=email1)
            except:
                e=None
            #print e
            response_dict = {}
            if e:
                response_dict.update({'response': "Email already registered"})
            else:
                response_dict.update({'response': "DO NOT EXIST" })
            return HttpResponse(json.dumps(response_dict), content_type='application/javascript')

def signup(request):
    if request.method=="POST":
        #print "hello here"
        email=request.POST["email"]
        password=request.POST['password']
        name=request.POST['name']
        mobile=request.POST['mobile']
        #print "hello"
        u=User.objects.get_or_create(name=name,email=email,phone=mobile,password=password,city='Varanasi',college='IIT(BHU) Varanasi',year='2')
        return HttpResponse(json.dumps({'response':'Registered'}),content_type='application/javascript')
    else:
        return render(request,'signup.html',{})

def display(request):
    pass

def login_email(request):
    if request.method=="POST":
        if request.POST.has_key('email'):
           email1 = request.POST['email']
           #print email1
           try:
               e = User.objects.filter(email=email1)
           except:
               e=None
           #print e
           response_dict = {}
           if e:
               response_dict.update({'response': "Email registered"})
           else:
               response_dict.update({'response': "DO NOT EXIST" })
           return HttpResponse(json.dumps(response_dict), content_type='application/javascript')

def login(request):
    if request.method=="POST":
        #print "hello here"
        email=request.POST["email"]
        password=request.POST['password']
        u=User.objects.filter(email=email)
        response_dict = {}
        if u.password==password:
            return HttpResponseRedirect('/')
        else:
            response_dict.update({'response': "Wrong password",'login':login})
            login=False
            return HttpResponse(json.dumps(response_dict), content_type='application/javascript')
    else:
        return render(request,'login.html',{})
