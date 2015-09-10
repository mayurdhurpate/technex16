from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
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
        return HttpResponseRedirect('/signup2/')
    else:
        return render(request,'signup.html',{})

def signup2(request):
    if request.method=="POST":
        email=request.POST["email"]
        city=request.POST["city"]
        college=request.POST["college"]
        year=request.POST["year"]
        u=User.objects.get(email=email)
        u.city=city
        u.college=college
        u.year=year
        u.save()
        #index(request)
        return HttpResponse(json.dumps({'reponse':'Registered'}), content_type='application/javascript')
        return HttpResponseRedirect('/')
    else:
        return render(request,'signup2.html',{'response':'Registered'})

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
        u=User.objects.get(email=email)
        response_dict = {}
        if u.password==password:
            return HttpResponseRedirect('/')
        else:
            login=False
            response_dict.update({'response': "Wrong password",'login':login})
            return render(request,'login.html',response_dict)
    else:
        return render(request,'login.html',{})
