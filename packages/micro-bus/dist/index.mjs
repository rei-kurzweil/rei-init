// src/index.ts
var MicroBus = class {
  subscriptions = /* @__PURE__ */ new Map();
  responders = /* @__PURE__ */ new Map();
  // === Pub/Sub ===
  /** Publish an event — fire-and-forget */
  publish(topic, data) {
    const subs = this.subscriptions.get(topic);
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
  subscribe(topic, handler) {
    if (!this.subscriptions.has(topic)) {
      this.subscriptions.set(topic, /* @__PURE__ */ new Set());
    }
    this.subscriptions.get(topic).add(handler);
    return () => {
      this.subscriptions.get(topic)?.delete(handler);
    };
  }
  // === Request/Reply ===
  /** Make a request and get a response */
  async request(topic, data) {
    const responder = this.responders.get(topic);
    if (!responder) {
      throw new Error(`[micro-bus] no responder registered for "${String(topic)}"`);
    }
    return responder(data);
  }
  /** Respond to requests for a given topic */
  respond(topic, handler) {
    if (this.responders.has(topic)) {
      throw new Error(`[micro-bus] responder already exists for "${String(topic)}"`);
    }
    this.responders.set(topic, async (data) => handler(data));
  }
};
export {
  MicroBus
};
