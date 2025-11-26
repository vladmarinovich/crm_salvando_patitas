from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Donante, Donacion
from .serializers import DonanteSerializer, DonacionSerializer

class DonanteViewSet(viewsets.ModelViewSet):
    queryset = Donante.objects.all()
    serializer_class = DonanteSerializer
    search_fields = ['donante', 'identificacion', 'correo', 'ciudad']
    filterset_fields = ['tipo_id', 'tipo_donante', 'ciudad']
    ordering = ['-fecha_creacion']

    @action(detail=False, methods=['get'])
    def top(self, request):
        """Retorna los 10 donantes con mayor monto total donado"""
        top_donantes = Donante.objects.annotate(
            total=Sum('donaciones__monto')
        ).order_by('-total')[:10]
        serializer = self.get_serializer(top_donantes, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def donaciones(self, request, pk=None):
        """Historial de donaciones de un donante específico"""
        donante = self.get_object()
        donaciones = donante.donaciones.all().order_by('-fecha_donacion')
        serializer = DonacionSerializer(donaciones, many=True)
        return Response(serializer.data)

class DonacionViewSet(viewsets.ModelViewSet):
    queryset = Donacion.objects.all()
    serializer_class = DonacionSerializer
    filterset_fields = ['estado', 'medio_pago', 'fecha_donacion']
    ordering_fields = ['monto', 'fecha_donacion']
    ordering = ['-fecha_donacion']
