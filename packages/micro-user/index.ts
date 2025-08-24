// packages/micro-user/index.ts

import { eq } from "drizzle-orm";

import { bus } from "micro-bus";
import { db, users } from "micro-db";

// Respond to user lookups
bus.respond("micro-user.get", async ({ id }) => {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  if (!user) throw new Error(`User ${id} not found`);
  return user;
});

// Publish login events somewhere inside login flow
export async function onUserLogin(id: string) {
  bus.publish("user.logged_in", { id });
}