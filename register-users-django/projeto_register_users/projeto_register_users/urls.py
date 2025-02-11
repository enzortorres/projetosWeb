from django.urls import path
from django.contrib import admin
from app_register_users import views

urlpatterns = [
    # rota, view responsável, nome de referência
    # facebook.com
    # users.com/users
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('users/', views.users_page, name='listagem_usuarios'),
    path('register/', views.users, name='register_user'),

    # facebook.com/enzortorres
    # path('enzortorres/)
]
