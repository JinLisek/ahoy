class SubscribersCollector:
    subscribers = []


def register_on_message_handler(callback):
    SubscribersCollector.subscribers.append(callback)


def post_message(data):
    for callback in SubscribersCollector.subscribers:
        callback(data)
