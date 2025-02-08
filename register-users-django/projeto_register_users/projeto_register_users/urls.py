from django.urls import path
from app_register_users import views

urlpatterns = [
    # rota, view responsável, nome de referência
    # facebook.com
    path('', views.home, name='home'),

    # facebook.com/enzortorres
    # path('enzortorres/)

]

