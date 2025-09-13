from django.shortcuts import render

# Create your views here.
def index(req):
	return render(req,'index.html')

def Login(req):
	return render(req,'login.html')

def register(req):
	return render(req,'register.html')

def register_emp(req):
	return render(req,'register_emp.html')

def Post_offer(req):
	return render(req,'validation.html')

def Profile(req):
	return render(req,'profile.html')