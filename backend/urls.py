from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Salvando Patitas CRM API",
      default_version='v1',
      description="API para gestión de donaciones y rescate animal",
      contact=openapi.Contact(email="tu@email.com"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.apps.donaciones.urls')),
    path('api/', include('backend.apps.casos.urls')),
    path('api/', include('backend.apps.finanzas.urls')),
    path('api/', include('backend.apps.core.urls')),
    
    # Documentación Swagger
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
