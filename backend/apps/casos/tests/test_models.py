import pytest
from datetime import date
from backend.apps.casos.models import Caso, HogarDePaso

@pytest.mark.django_db
class TestCasosModels:
    def test_crear_hogar_de_paso(self):
        hogar = HogarDePaso.objects.create(
            nombre_hogar="Refugio Esperanza",
            ciudad="Bogotá",
            cupo_maximo=10
        )
        assert hogar.nombre_hogar == "Refugio Esperanza"
        assert str(hogar) == "Refugio Esperanza"

    def test_crear_caso(self):
        hogar = HogarDePaso.objects.create(nombre_hogar="Temporal")
        caso = Caso.objects.create(
            nombre_caso="Firulais",
            estado="ABIERTO",
            fecha_ingreso=date.today(),
            id_hogar_de_paso=hogar
        )
        assert caso.nombre_caso == "Firulais"
        assert caso.estado == "ABIERTO"
        assert caso.id_hogar_de_paso == hogar
        assert str(caso) == "Firulais"
