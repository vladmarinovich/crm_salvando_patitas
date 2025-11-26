from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GastoViewSet, ProveedorViewSet

router = DefaultRouter()
router.register(r'gastos', GastoViewSet)
router.register(r'proveedores', ProveedorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
