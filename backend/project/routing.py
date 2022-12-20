from django.urls import path
from plc.consumer import PlcConsumer

websocket_urlpatterns = [
    path('plcs/', PlcConsumer.as_asgi()),
]
