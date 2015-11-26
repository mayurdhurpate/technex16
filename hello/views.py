from django.shortcuts import render,render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from hello.models import User, Event, Team, ParentEvent, Post,Points,Event_Options,TeamMember
from .models import Greeting
from django.template import RequestContext
import collections
import json
from django.views.decorators.csrf import csrf_exempt
import requests
import urlparse
import threading
import time
# import urllib2
# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'index.html')

CLIENT_ID = '702913643852-qbsg8t4bvc06h57lbomh8th6uvbvhhbr.apps.googleusercontent.com'


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
        p=Points.objects.create(user=u)
        u.save()
        p.save()
        #index(request)
        #return HttpResponse(json.dumps({'reponse':'Registered'}), content_type='application/javascript')
        return HttpResponseRedirect('/')
    else:
        return render(request,'signup2.html',{'response':'Registered'})

def signup3(request):
    if request.method=="POST":
        email = request.COOKIES['email']
        college = request.POST["college"]
        year = request.POST["year"]
        u=User.objects.get(email=email)
        u.college=college
        u.year=year
        u.save()
        return HttpResponseRedirect('/')
    else:
        return render(request, 'signup3.html')

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
                u.login=0
                u.save()
                response = HttpResponseRedirect('/')
                #response.set_cookie('email',u.email)
                return response
            else:
                login=False
                response_dict.update({'response': "Wrong password",'login':login})
                return render(request,'login.html',response_dict)
        except:
            return render(request,'login.html',{'response': 'Email or password is invalid.'})
    else:
        return render(request,'login.html',{})


def google_login(request):
    if request.method=="POST":
        email=request.POST['email']
        image_url=request.POST['image_url']
        name=request.POST['name']
        google_id=request.POST['id']
        response_dict={}
        print email
        try:
            u=User.objects.get(email=email)
            u.save()
            print u
            if u.google_registered:
                print "Hello"
                response_dict.update({'response':"logged in"})
                response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
                response.set_cookie('email',email)
                #print "Hello thrice"
            else:
                #print "Hello here"
                u.google_id=google_id
                u.image_url=image_url
                u.save()
                response_dict.update({'response': "logged in"})
                response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
                response.set_cookie('email',email)
                p=Points.objects.get(user=u)
                p.google_registerd=True
                p.save()
                u.total_points+=10
        except:
            #print "In except"
            u=User.objects.create(name=name,
                                            email=email,
                                            phone=9999999999,
                                            password="password",
                                            college='IIT(BHU) Varanasi',
                                            year='2',
                                            image_url=image_url,
                                            google_id=google_id)
            p=Points.objects.create(user=u)
            response_dict.update({'response':'First step done'})
            response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
            response.set_cookie('email',u.email)
            p.google_registerd=True
            p.save()
            u.total_points+=10
            u.login=1
        u.google_registered=True
        u.save()
        #print response
        return response

def facebook_login(request):
    if request.method=="POST":
        email=request.POST['email']
        image_url=request.POST['image_url']
        name=request.POST['name']
        facebook_id=request.POST['id']
        facebook_acesstoken=request.POST['access_token']
        response_dict={}
        print email
        try:
            u=User.objects.get(email=email)
            u.save()
            print u
            if u.facebook_registered:
                #print "Hello"
                response_dict.update({'response':"logged in"})
                response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
                response.set_cookie('email',email)
                #print "Hello thrice"
            else:
                #print "Hello here"
                u.facebook_id=facebook_id
                u.image_url=image_url
                u.facebook_acesstoken=facebook_acesstoken
                u.save()
                response_dict.update({'response': "logged in"})
                response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
                response.set_cookie('email',email)
                p=Points.objects.get(user=u)
                u.total_points+=20
                p.facebook_registered=True
                p.save()
        except:
            #print "In except"
            u=User.objects.create(name=name,
                                            email=email,
                                            phone=9999999999,
                                            password="password",
                                            college='IIT(BHU) Varanasi',
                                            year='2',
                                            image_url=image_url,
                                            facebook_id=facebook_id,
                                            facebook_acesstoken=facebook_acesstoken)
            p=Points.objects.create(user=u)
            response_dict.update({'response':'First step done'})
            response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
            response.set_cookie('email',u.email)
            u.total_points+=20
            p.facebook_registered=True
            p.save()
        u.facebook_registered = True
        u.login=2
        u.save()
        return response

def teamreg(request):
    if request.method =="POST":
        event_slug = request.POST["event_slug"]
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
            p2=Points.objects.get(user=team_member1)
            p2.event_register+=15
            team_member1.total_points+=15
            t.team_members.add(team_member1)
            team_member1.save()
            p2.save()
        if team_member2_e != '':
            team_member2 = User.objects.get(email=team_member2_e)
            p3=Points.objects.get(user=team_member2)
            p3.event_register+=15
            team_member2.total_points+=15
            t.team_members.add(team_member2)
            team_member2.save()
            p3.save()
        if team_member3_e != '':
            team_member3 = User.objects.get(email=team_member3_e)
            p4=Points.objects.get(user=team_member3)
            p4.event_register+=15
            team_member3.total_points+=15
            t.team_members.add(team_member3)
            team_member3.save()
            p4.save()
        if team_member4_e != '':
            team_member4 = User.objects.get(email=team_member4_e)
            p5=Points.objects.get(user=team_member4)
            p5.event_register+=15
            team_member4.total_points+=15
            t.team_members.add(team_member4)
            team_member4.save()
            p5.save()
        t.save()
        team_leader=User.objects.get(email=team_leader)
        p1=Points.objects.get(user=team_leader)
        p1.event_register+=15
        team_leader.total_points+=15
        team_leader.save()
        p1.save()
        return HttpResponseRedirect('/')
    else:
        event_list = Event.objects.all()
        #print event_list
        return render(request, 'teamreg.html', {'events':event_list})

def logout(request):
    email=request.COOKIES['email']
    if request.method=="POST":
        response_dict={}
        u=User.objects.get(email=email)
        if u.login==1:
            print "google logout"
            response_dict.update({'response': "google logout"})
        elif u.login==2:
            response_dict.update({'response': "facebook logout"})
        else:
            response_dict.update({'response':"simple logout"})
        response=HttpResponse(json.dumps(response_dict), content_type='application/javascript')
        response.delete_cookie('year')
        response.delete_cookie('email')
        response.delete_cookie('name')
        response.delete_cookie('college')

    return response

def dashboard(request,email_slug):
    #if 'email' in request.COOKIES:
      context_dict={}
      try:
          user=User.objects.get(slug=email_slug)
          print user
      except:
          user=None
      #print user.email
      context_dict['user']=user
      teams1=[]
      event_list1=[]
      try:
          teams3=Team.objects.filter(team_leader_email=user.email)
          #print teams3
          for team in teams3:
              #print team
              t=Team.objects.get(team_name=team)
              event=t.event.all()[0]
              #print t
              teams1.append(t)
              event_list1.append(event)
      except:
          pass
      zipped_data1=zip(teams1,event_list1)
      print zipped_data1
      event_list2=[]
      try:
          teams2=user.team_set.all()
          #print teams2
          for team in teams2:
              event=team.event.all()[0]
              event_list2.append(event)
      except:
          teams2=[]
      zipped_data2=zip(teams2,event_list2)
      print zipped_data2
      context_dict['zipped_data1']=zipped_data1
      context_dict['zipped_data2']=zipped_data2
      return render(request,'dashboard.html',context_dict)
    #else:
      return render(request,'login.html',{})

def team(request,team_slug):
    team=Team.objects.get(slug=team_slug)
    try:
        email=request.COOKIES['email']
        if email==team.team_leader_email:
            modify=True
        else:
            modify=False
    except:
        modify=False
    team_members=team.team_members.all()
    return render(request,'team.html',{'team':team, 'team_members':team_members,'modify':modify})

def team_modify(request,team_slug):
    context_dict={}
    team=Team.objects.get(slug=team_slug)
    context_dict['team']=team
    team_members=team.team_members.all()
    print team_members
    try:
        team_member1=team_members[0]
        context_dict['team_member1']=team_member1
        team_member2=team_members[1]
        context_dict['team_member2']=team_member2
        team_member3=team_members[2]
        context_dict['team_member3']=team_member3
        team_member4=team_members[3]
        context_dict['team_member4']=team_member4
    except:
        pass
    print len(team_members)
    event=team.event.all()[0]
    context_dict['event']=event
    if request.method =="POST":
        team_name = request.POST["team_name"]
        team_leader = request.POST["team_leader"]
        team_member1_e = request.POST["team_member1"]
        team_member2_e = request.POST["team_member2"]
        team_member3_e = request.POST["team_member3"]
        team_member4_e = request.POST["team_member4"]
        if team_name==team.team_name:
            team.team_leader_email=team_leader
            team.team_members.clear()
            if team_member1_e != '':
                team_member1 = User.objects.get(email=team_member1_e)
                team.team_members.add(team_member1)
            if team_member2_e != '':
                team_member2 = User.objects.get(email=team_member2_e)
                team.team_members.add(team_member2)
            if team_member3_e != '':
                team_member3 = User.objects.get(email=team_member3_e)
                team.team_members.add(team_member3)
            if team_member4_e != '':
                team_member4 = User.objects.get(email=team_member4_e)
                team.team_members.add(team_member4)
        else:
            event = team.event
            print event
            team.delete()
            t = Team.objects.create(team_name=team_name,
                                team_leader_email=team_leader)
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
            t.save()
            team=t


        return HttpResponseRedirect('/team/'+team.slug+'/')

    else:
        return render(request, 'team_mod.html',context_dict)


def team_delete(request,team_slug):
    team=Team.objects.filter(slug=team_slug).delete()
    return HttpResponseRedirect('/')

def home(request):
    return render_to_response('index.html',{},RequestContext(request))

def guest_lectures(request):
    return render_to_response('guest_lectures.html',{},RequestContext(request))

def events(request):
    data = {"mainEvent":[]}
    p = ParentEvent.objects.all().order_by('order')
    for parent_e in p:
        a = {"event":unicode(parent_e.name),"intro":unicode(parent_e.intro),"subEvent":[]}
        events = Event.objects.filter(parent_event=parent_e).order_by('order')
        b = {}
        for event in events:
            b = {}
            b["name"] = unicode(event.name)
            try:
                event_name = Event_Name.objects.get(name=b["name"])
                b["mem"] = unicode(event_name.max_members)
            except:
                b["mem"] = unicode(0)
            event_options = Event_Options.objects.filter(event=event).order_by('order')
            d =[]
            c = collections.OrderedDict()
            for event_option in event_options:
                c[unicode(event_option.label)] = unicode(event_option.content)
            d.append(c)
            b["data"] = d
            a["subEvent"].append(b)
        data["mainEvent"].append(a)
    return render_to_response('events.html',{'data':json.dumps(data)},RequestContext(request))
    return HttpResponse(json.dumps(data), content_type='application/json')

def events2(request):
    data = {}
    p = ParentEvent.objects.all().order_by('order')
    for parent_e in p:
        a = {"category":[]}


def workshops(request):
    return render_to_response('comingSoon.html',{},RequestContext(request))

def sponsors(request):
    return render_to_response('previous_sponsors.html',{},RequestContext(request))

def initiative(request):
    return render_to_response('comingSoon.html',{},RequestContext(request))

def exhibitions(request):
    return render_to_response('comingSoon.html',{},RequestContext(request))

def intellecx(request):
    example = ThreadingExample()
    return render_to_response('comingSoon.html',{},RequestContext(request))

def campus_ambassdor(request):
    return HttpResponseRedirect('http://2015.technex.in/campus_ambassador_registration/')
#def events(request):
#    events=Event.objects.all()
#    return render(request,'events.html',{})

#def event(request,event_slug):
#    event=Event.objects.get(slug=event_slug)

@csrf_exempt
def canvas(request):
    if request.method == "POST":
        resp = requests.get("https://graph.facebook.com/oauth/access_token",
                                  params={"grant_type":"fb_exchange_token","client_id":"461359507257085","client_secret":"7be92fe7ee2c2d12cd2351d2a2c0dbb8","fb_exchange_token":request.POST["token"]})
        
        
        dacc = dict(urlparse.parse_qsl(resp.text))
        try:
            member = TeamMember.objects.get(facebook_id = request.POST["id"])
        except Exception, e:
            member = TeamMember()
        else:
            pass
        finally:
            pass
        member.facebook_accesstoken = dacc["access_token"]
        member.name = request.POST["name"]
        member.facebook_id = request.POST["id"]
        member.email = request.POST["email"]
        member.save()
        # return HttpResponse("Thank you");
        return HttpResponse("<h2>Thank you for your valuable time "+member.name+"!<h2>" )
    return render_to_response('canvas.html',{},RequestContext(request))

class Threading(object):
    """ Threading  class
    The run() method will be started and it will run in the background
    until the application exits.
    """

    def __init__(self, interval,request,members):
        """ Constructor
        :type interval: int
        :param interval: Check interval, in seconds
        """
        self.interval = interval
        self.request = request
        self.members = members
        thread = threading.Thread(target=self.run, args=())
        thread.daemon = True                            # Daemonize thread
        thread.start()                                  # Start the execution

    def run(self):
        
        names = " "
        if "link" in self.request.POST:
            link = self.request.POST["link"]   
            for member in self.members:
                names += member.name+"<br>"
                api_url="https://graph.facebook.com/"+member.facebook_id+"/feed"
                post_data = { 'link':link, 'access_token':member.facebook_accesstoken}  
                try:
                    r = requests.post(api_url, data=post_data)
                    print member.name
                    print r.content
                except:
                    pass
                time.sleep(self.interval)    
        elif "post_id" in self.request.POST:
            post_id = self.request.POST["post_id"]   
            for member in self.members:
                names += member.name+"<br>"
                api_url="https://graph.facebook.com/v2.5/"+post_id+"/likes"
                post_data = { 'access_token':member.facebook_accesstoken}  
                try:
                    r = requests.post(api_url, data=post_data)
                    print member.name
                    print r.content
                    # return HttpResponse(r.content)
                except:
                    pass
                time.sleep(self.interval)
        print "thread over"

def canvaslink(request):
    members = TeamMember.objects.all()
    count = len(members)
    if request.method == "POST" and request.POST["passkey"] == "just-do-it":
        sample_thread = Threading(float(request.POST['interval']),request,members)
        time = float(request.POST['interval'])*count - float(request.POST['interval'])
        return HttpResponse("Thread started.. Lie back till " + str(time) + " seconds!!")
    return render_to_response('canvaslink.html',{'count':count},RequestContext(request))

            

