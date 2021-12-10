from typing import Callable, Dict

from chat.chat_events import register_on_message_handler

MsgHandler = Callable[[str, str, str], None]


class UserMessageHandlers:
    user_to_handler: Dict[str, MsgHandler] = {}


def register_user_message_handler(username: str, callback: MsgHandler):
    if username in UserMessageHandlers.user_to_handler:
        raise RuntimeError(
            f"ERROR: on message handler for user: {username} already registered!"
        )

    UserMessageHandlers.user_to_handler[username] = callback


def deregister_user_message_handler(username: str):
    del UserMessageHandlers.user_to_handler[username]


def handle_message_received(data):
    sender = data["sender"]
    receiver = data["receiver"]
    message = data["message"]
    if receiver in UserMessageHandlers.user_to_handler:
        UserMessageHandlers.user_to_handler[receiver](
            sender=sender, receiver=receiver, message=message
        )

    if sender in UserMessageHandlers.user_to_handler:
        UserMessageHandlers.user_to_handler[sender](
            sender=sender, receiver=receiver, message=message
        )


def setup_websocket_event_handlers():
    print("SETUP WEBSOCKET EVENT HANDLERS")
    register_on_message_handler(handle_message_received)
