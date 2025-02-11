from django.shortcuts import render
from .models import User

def home(request):
    return render(request, 'users/home.html')

def users(request):
    # Salvar os dados da tela para o banco de dados.
    new_user = User()
    new_user.name = request.POST.get('name')
    new_user.age = request.POST.get('age')
    new_user.save()

    # Exibir todos os usuários já cadastrados em uma nova página
    users = {
        'users': User.objects.all()
    }

    # Retornar os dados para a página de listagem de usuários
    return render(request, 'users/users.html', users)