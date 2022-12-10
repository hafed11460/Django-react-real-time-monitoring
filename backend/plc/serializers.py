from rest_framework import serializers
from plc.models import PLC


class ControllerSerializer(serializers.ModelSerializer):
    class Meta:
        model=PLC
        fields = ['id','ip_v4','slot','rack']