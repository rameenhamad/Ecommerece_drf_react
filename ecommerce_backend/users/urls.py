from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path('profile/', ProfileView.as_view(), name='user_profile'),
    path("refresh/", TokenRefreshView.as_view()),    
]
