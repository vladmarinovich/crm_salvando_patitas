import pytest
from backend.apps.donaciones.models import Donante, Donacion

@pytest.mark.django_db
class TestDonacionesModels:
    def test_crear_donante(self):
        donante = Donante.objects.create(
            donante="Juan Perez",
            tipo_id="CC",
            identificacion="123456789",
            correo="juan@example.com"
        )
        assert donante.donante == "Juan Perez"
        assert str(donante) == "Juan Perez"

    def test_crear_donacion(self):
        donante = Donante.objects.create(donante="Maria Lopez")
        donacion = Donacion.objects.create(
            id_donante=donante,
            monto=50000,
            estado="APROBADA"
        )
        assert donacion.monto == 50000
        assert donacion.id_donante == donante
        assert str(donacion) == f"Donacion {donacion.id_donacion}"
