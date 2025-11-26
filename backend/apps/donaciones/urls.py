from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DonanteViewSet, DonacionViewSet

router = DefaultRouter()
router.register(r'donantes', DonanteViewSet)
router.register(r'donaciones', DonacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
