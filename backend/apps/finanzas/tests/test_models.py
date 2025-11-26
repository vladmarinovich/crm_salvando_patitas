import pytest
from datetime import date
from backend.apps.finanzas.models import Gasto, Proveedor
from backend.apps.casos.models import Caso

@pytest.mark.django_db
class TestFinanzasModels:
    def test_crear_proveedor(self):
        proveedor = Proveedor.objects.create(
            nombre_proveedor="Veterinaria Central",
            nit="900123456",
            ciudad="Medellín"
        )
        assert proveedor.nombre_proveedor == "Veterinaria Central"
        assert str(proveedor) == "Veterinaria Central"

    def test_crear_gasto(self):
        proveedor = Proveedor.objects.create(nombre_proveedor="Tienda Mascotas")
        caso = Caso.objects.create(nombre_caso="Michi")
        
        gasto = Gasto.objects.create(
            nombre_gasto="Comida Gato",
            monto=25000,
            estado="PAGADO",
            fecha_pago=date.today(),
            id_proveedor=proveedor,
            id_caso=caso
        )
        
        assert gasto.monto == 25000
        assert gasto.id_proveedor == proveedor
        assert gasto.id_caso == caso
        assert str(gasto) == "Comida Gato"
