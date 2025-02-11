from django.shortcuts import render, redirect
from .models import User

def home(request):
    return render(request, 'users/home.html')

def users(request):
    # Salvar os dados da tela para o banco de dados.
    if request.method == "POST":
        new_user = User()
        new_user.name = request.POST.get('name')
        new_user.age = request.POST.get('age')
        new_user.save()

        return redirect('home')
    
    return render(request, 'users/home.html')

    
def users_page(request):
    # Retornar os dados para a página de listagem de usuários
    users = {
        'users': User.objects.all()
    }
    return render(request, 'users/users.html', users)
