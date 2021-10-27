import json

from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self):
        super().__init__()
        self.__room_name = None
        self.__user = None

    async def connect(self):
        self.__user = self.scope["user"]
        self.__room_name = self.scope["url_route"]["kwargs"]["room_name"]

        if not self.__user.is_authenticated:
            print("Unathenticated user tried to connect to chat")
            return

        await self.channel_layer.group_add(self.__room_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        del code  # unused

        if self.__room_name is None:
            return

        await self.channel_layer.group_discard(self.__room_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        if not self.__user.is_authenticated:
            print("Received chat msg from unathenticated user")
            return

        del bytes_data  # unused

        if self.__room_name is None:
            return

        text_data_json = json.loads(text_data)
        author = self.__user.username
        message = text_data_json["message"]

        await self.channel_layer.group_send(
            self.__room_name,
            {"type": "chat_message", "author": author, "message": message},
        )

    async def chat_message(self, event):
        await self.send(
            text_data=json.dumps(
                {"author": event["author"], "message": event["message"]}
            )
        )
