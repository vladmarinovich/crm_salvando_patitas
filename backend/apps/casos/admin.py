from django.contrib import admin
from .models import Caso, HogarDePaso

@admin.register(Caso)
class CasoAdmin(admin.ModelAdmin):
    list_display = ('nombre_caso', 'estado', 'id_hogar_de_paso', 'fecha_ingreso')
    search_fields = ('nombre_caso',)
    list_filter = ('estado', 'fecha_ingreso')

@admin.register(HogarDePaso)
class HogarDePasoAdmin(admin.ModelAdmin):
    list_display = ('nombre_hogar', 'ciudad', 'cupo_maximo')
    search_fields = ('nombre_hogar', 'ciudad')
