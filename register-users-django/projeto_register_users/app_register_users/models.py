from django.db import models

class User(models.Model):
    id_user = models.AutoField(primary_key=True, verbose_name='ID')
    name = models.TextField(max_length=255, verbose_name='Nome')
    age = models.IntegerField(verbose_name='Idade')

    class Meta:
        ordering = ['id_user']
        verbose_name = 'Usuário'

    def __str__(self):
        return self.name