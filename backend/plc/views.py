from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import random
from rest_framework.viewsets import ModelViewSet
from plc.models import PLC
from plc.serializers import ControllerSerializer

channel_layer = get_channel_layer()

def generat_data():
    ls = [10,11,12,13,14,15]

    # value = random.choice(ls)
    value =  random.randint(50, 100)
    print(value)
    async_to_sync(channel_layer.group_send)(
    'plc_room', {'type': 'event_send_plc_data', 'value': value})


class ControllerViewSet(ModelViewSet):
    queryset = PLC.objects.all()
    serializer_class = ControllerSerializer
    permission_classes = []
