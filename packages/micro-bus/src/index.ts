import { User, Item } from "@rei-init/micro-domain";

type PubSubTopics = {
  "user.logged_in": { id: string };
  "item.created": { id: string; title: string };
};

type RequestReplyTopics = {
  "micro-item.get": { id: string } & { response: Item };
  "micro-user.get": { id: string } & { response: User };
};

export class MicroBus {
  private subscriptions = new Map<string, Set<(data: any) => void>>();
  private responders = new Map<string, (data: any) => Promise<any>>();

  // === Pub/Sub ===

  /** Publish an event — fire-and-forget */
  publish<T extends keyof PubSubTopics>(
    topic: T,
    data: PubSubTopics[T]
  ): void {
    const subs = this.subscriptions.get(topic as string);
    if (!subs) return;
    for (const handler of subs) {
      try {
        handler(data);
      } catch (err) {
        console.error(`[micro-bus] subscriber error on "${String(topic)}":`, err);
      }
    }
  }

  /** Subscribe to an event */
  subscribe<T extends keyof PubSubTopics>(
    topic: T,
    handler: (data: PubSubTopics[T]) => void
  ): () => void {
    if (!this.subscriptions.has(topic as string)) {
      this.subscriptions.set(topic as string, new Set());
    }
    this.subscriptions.get(topic as string)!.add(handler as any);

    // return unsubscribe fn
    return () => {
      this.subscriptions.get(topic as string)?.delete(handler as any);
    };
  }

  // === Request/Reply ===

  /** Make a request and get a response */
  async request<T extends keyof RequestReplyTopics>(
    topic: T,
    data: Omit<RequestReplyTopics[T], "response">
  ): Promise<RequestReplyTopics[T]["response"]> {
    const responder = this.responders.get(topic as string);
    if (!responder) {
      throw new Error(`[micro-bus] no responder registered for "${String(topic)}"`);
    }
    return responder(data);
  }

  /** Respond to requests for a given topic */
  respond<T extends keyof RequestReplyTopics>(
    topic: T,
    handler: (
      data: Omit<RequestReplyTopics[T], "response">
    ) => Promise<RequestReplyTopics[T]["response"]> | RequestReplyTopics[T]["response"]
  ): void {
    if (this.responders.has(topic as string)) {
      throw new Error(`[micro-bus] responder already exists for "${String(topic)}"`);
    }
    this.responders.set(topic as string, async (data) => handler(data));
  }
}