from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('user/', views.UserList.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path('getToken/', obtain_auth_token),
    path('change-password/', views.ChangePassword.as_view()),
    path('user/me/', views.UserData.as_view()),
    path('integracion1', views.SimulateKinesiologyAPI.as_view()),
]