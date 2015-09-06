from django.shortcuts import render, redirect
from django.http import HttpResponse

from .models import Greeting, User

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
    if request.method=="GET":
        email=request.GET["email"]
        e=User.objects.filter(email=email)
        if e:
            return HttpResponse("Email already registered")
        else:
            return HttpResponse("DO NOT EXIST")

def signup(request):
	if request.method == "GET":
		return render(request, 'signup.html')
	if request.method == "POST":
		email = request.POST.get('email', '')
		name = request.POST.get('name', '')
		phone = request.POST.get('mobile','')
		password = request.POST.get('password', '')

		if email and name and phone and password:
			user = User(
				name=name,
				email=email,
				phone=phone,
				password=password,
				college='IIT BHU',
				year = '2',
				city= 'Varanasi',
			)
			user.save()
			return redirect('/')
		else:
			return redirect('/signup')

def display(request):
	a = User.objects.all()
	s = ""
	for item in a:
		s += '<p>' + item.name + '</p><br>'
	return HttpResponse(s)