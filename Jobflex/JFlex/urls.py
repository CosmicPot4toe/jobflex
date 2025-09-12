from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login/", views.Login, name="login"),
    path("reg/", views.register, name="register"),
    path("reg_emp/", views.register_emp, name="register_emp"),
    path("post_offer/", views.Post_offer, name="validate"),
    path("profile/", views.Profile, name="profile"),
]