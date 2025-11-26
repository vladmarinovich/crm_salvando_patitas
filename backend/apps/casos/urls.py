from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CasoViewSet, HogarDePasoViewSet

router = DefaultRouter()
router.register(r'casos', CasoViewSet)
router.register(r'hogares', HogarDePasoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
