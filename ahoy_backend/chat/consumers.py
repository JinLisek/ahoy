import json
from typing import Optional

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer

from chat.websocket_listener import (
    deregister_user_message_handler,
    register_user_message_handler,
)


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self):
        super().__init__()
        self.__channel_name: Optional[str] = None
        self.__user = None

    @async_to_sync
    async def send_received_message_to_user(
        self, sender: str, receiver: str, message: str
    ) -> None:
        if not self.__user:
            return

        other_chat_user = sender if self.__user.username == receiver else receiver

        await self.send_message(
            sender=sender, other_chat_user=other_chat_user, message=message
        )

    async def connect(self):
        self.__user = self.scope["user"]

        register_user_message_handler(
            username=self.__user.username,
            callback=self.send_received_message_to_user,
        )

        self.__channel_name = self.__user.username

        if not self.__user.is_authenticated:
            print("Unathenticated user tried to connect to chat")
            return

        await self.channel_layer.group_add(self.__channel_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        del code  # unused

        deregister_user_message_handler(username=self.__user.username)

        if self.__channel_name is None:
            return

        await self.channel_layer.group_discard(self.__channel_name, self.channel_name)

    async def send_message(self, other_chat_user: str, sender: str, message: str):
        await self.send(
            text_data=json.dumps(
                {
                    "other_chat_user": other_chat_user,
                    "sender": sender,
                    "message": message,
                }
            )
        )
