from django.contrib import admin
from .models import User

# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id_user', 'name', 'age')
    search_fields = ('name',)
    # list_filter('coluna que deseja criar o filtro')