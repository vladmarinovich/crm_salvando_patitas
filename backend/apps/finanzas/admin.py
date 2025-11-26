from django.contrib import admin
from .models import Gasto, Proveedor

@admin.register(Gasto)
class GastoAdmin(admin.ModelAdmin):
    list_display = ('id_proveedor', 'monto', 'fecha_pago', 'estado', 'id_caso')
    search_fields = ('id_proveedor__nombre_proveedor', 'id_caso__nombre_caso')
    list_filter = ('estado', 'fecha_pago')

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ('nombre_proveedor', 'nit', 'nombre_contacto')
    search_fields = ('nombre_proveedor', 'nit')
