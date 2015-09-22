from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from hello.models import User, Event, Team, ParentEvent, Post
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
        u=User.objects.create(name=name,
                                    email=email,
                                    phone=mobile,
                                    password=password,
                                    college='IIT(BHU) Varanasi',
                                    year='2')
        return HttpResponseRedirect('/signup2/')
    else:
        return render(request,'signup.html',{})

def signup2(request):
    if request.method=="POST":
        email=request.COOKIES['email']
        college=request.POST["college"]
        year=request.POST["year"]
        u=User.objects.get(email=email)
        u.college=college
        u.year=year
        u.save()
        #index(request)
        #return HttpResponse(json.dumps({'reponse':'Registered'}), content_type='application/javascript')
        return HttpResponseRedirect('/')
    else:
        return render(request,'signup2.html',{'response':'Registered'})

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
        try:
            u=User.objects.get(email=email)
            response_dict = {}
            if u.password==password:
                return HttpResponseRedirect('/')
            else:
                login=False
                response_dict.update({'response': "Wrong password",'login':login})
                return render(request,'login.html',response_dict)
        except:
            return render(request,'login.html',{'response': 'Email or password is invalid.'})
    else:
        return render(request,'login.html',{})

def idcheck(request):
    if request.method=="POST":
        id = request.POST["id"]
        print id
        try:
            i = User.objects.filter(google_id=id)
        except:
            i=None

        response_dict = {}
        if i:
            print "USER EXISTS"
            response_dict.update({'response':"EXIST"})
        else:
            response_dict.update({'response': "DO NOT EXIST" })
        return HttpResponse(json.dumps(response_dict), content_type='application/javascript')
    else:
        HttpResponse("FFFFFF")

def teamreg(request):
    if request.method =="POST":
        event_slug = request.POST["event"]
        team_name = request.POST["team_name"]
        team_leader = request.POST["team_leader"]
        team_member1_e = request.POST["team_member1"]
        team_member2_e = request.POST["team_member2"]
        team_member3_e = request.POST["team_member3"]
        team_member4_e = request.POST["team_member4"]

        t = Team.objects.create(team_name=team_name,
                            team_leader_email=team_leader)

        event = Event.objects.get(slug=event_slug)
        t.event.add(event)

        if team_member1_e != '':
            team_member1 = User.objects.get(email=team_member1_e)
            t.team_members.add(team_member1)
        if team_member2_e != '':
            team_member2 = User.objects.get(email=team_member2_e)
            t.team_members.add(team_member2)
        if team_member3_e != '':
            team_member3 = User.objects.get(email=team_member3_e)
            t.team_members.add(team_member3)
        if team_member4_e != '':
            team_member4 = User.objects.get(email=team_member4_e)
            t.team_members.add(team_member4)

        return HttpResponseRedirect('/')

    else:
        event_list = Event.objects.all()
        print event_list
        return render(request, 'teamreg.html', {'events':event_list})

def logout(request):
    response=render(request,'index.html')
    response.delete_cookie('year')
    response.delete_cookie('email')
    response.delete_cookie('name')
    response.delete_cookie('college')
    return response

def dashboard(request,email_slug):
    if 'email' in request.COOKIES:
      context_dict={}
      user=User.objects.get(slug=email_slug)
      context_dict['user']=user
      teams1={}
      teams2={}
      try:
          teams1=Team.objects.get(team_leader_email=user.email)
          teams2=user.team_set.all()
      except:
          pass
      context_dict['teams2']=teams2
      context_dict['teams1']=teams1
      return render(request,'dashboard.html',context_dict)
    else:
      return render(request,'login.html',{})
