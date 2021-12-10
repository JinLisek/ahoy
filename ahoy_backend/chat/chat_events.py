from typing import Callable, Dict, List

Message = Dict[str, str]
Subscriber = Callable[[Message], None]


class SubscribersCollector:
    subscribers: List[Subscriber] = []


def register_on_message_handler(callback: Subscriber) -> None:
    SubscribersCollector.subscribers.append(callback)


def post_message(data: Message) -> None:
    for callback in SubscribersCollector.subscribers:
        callback(data)
