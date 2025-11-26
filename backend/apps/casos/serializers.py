from rest_framework import serializers
from .models import HogarDePaso, Caso

class HogarDePasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = HogarDePaso
        fields = '__all__'

class CasoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caso
        fields = '__all__'

    def validate(self, data):
        # Validación de fechas
        if data.get('fecha_salida') and data.get('fecha_ingreso'):
            if data['fecha_salida'] < data['fecha_ingreso']:
                raise serializers.ValidationError({"fecha_salida": "La fecha de salida no puede ser anterior a la de ingreso."})
        return data
