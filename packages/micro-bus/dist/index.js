"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MicroBus: () => MicroBus
});
module.exports = __toCommonJS(index_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MicroBus
});
