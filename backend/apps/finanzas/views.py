from rest_framework import viewsets
from .models import Gasto, Proveedor
from .serializers import GastoSerializer, ProveedorSerializer

class GastoViewSet(viewsets.ModelViewSet):
    queryset = Gasto.objects.all()
    serializer_class = GastoSerializer
    filterset_fields = ['estado', 'fecha_pago']
    ordering = ['-fecha_pago']

from rest_framework.decorators import action
from rest_framework.response import Response

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer
    ordering = ['-id_proveedor']

    @action(detail=True, methods=['get'])
    def gastos(self, request, pk=None):
        """Historial de gastos de un proveedor específico"""
        proveedor = self.get_object()
        gastos = proveedor.gastos.all().order_by('-fecha_pago')
        serializer = GastoSerializer(gastos, many=True)
        return Response(serializer.data)
