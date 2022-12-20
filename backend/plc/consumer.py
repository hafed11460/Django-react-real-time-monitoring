from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

class PlcConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.room_name = 'plc_room'

    def connect(self):

        self.accept()
        print('connected!')
        async_to_sync(self.channel_layer.group_add)(
            self.room_name,
            self.channel_name
        )

    def disconnect(self,code):
        print('disconnected !')

    def receive_json(self, connect, **kwargs):
        pass

    def event_send_plc_data(self, event):
        value = event['value']
        self.send_json({
            'type': 'send_plc_data',
            'value': value,
        })