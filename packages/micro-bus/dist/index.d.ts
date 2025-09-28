import { Item, User } from '@rei-init/micro-domain';

type PubSubTopics = {
    "user.logged_in": {
        id: string;
    };
    "item.created": {
        id: string;
        title: string;
    };
};
type RequestReplyTopics = {
    "micro-item.get": {
        id: string;
    } & {
        response: Item;
    };
    "micro-user.get": {
        id: string;
    } & {
        response: User;
    };
};
declare class MicroBus {
    private subscriptions;
    private responders;
    /** Publish an event — fire-and-forget */
    publish<T extends keyof PubSubTopics>(topic: T, data: PubSubTopics[T]): void;
    /** Subscribe to an event */
    subscribe<T extends keyof PubSubTopics>(topic: T, handler: (data: PubSubTopics[T]) => void): () => void;
    /** Make a request and get a response */
    request<T extends keyof RequestReplyTopics>(topic: T, data: Omit<RequestReplyTopics[T], "response">): Promise<RequestReplyTopics[T]["response"]>;
    /** Respond to requests for a given topic */
    respond<T extends keyof RequestReplyTopics>(topic: T, handler: (data: Omit<RequestReplyTopics[T], "response">) => Promise<RequestReplyTopics[T]["response"]> | RequestReplyTopics[T]["response"]): void;
}

export { MicroBus };
