from plc.models import PLC
from plc.serializers import ControllerSerializer
from rest_framework.viewsets import ModelViewSet

class ControllerViewSet(ModelViewSet):
    queryset = PLC.objects.all()
    serializer_class = ControllerSerializer
    permission_classes = []
