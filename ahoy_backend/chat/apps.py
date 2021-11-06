from django.apps import AppConfig

from chat.websocket_listener import setup_websocket_event_handlers


class ChatConfig(AppConfig):
    name = "chat"
    verbose_name = "Ahoy Chat"

    def ready(self):
        setup_websocket_event_handlers()
