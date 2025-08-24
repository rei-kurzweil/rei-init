// packages/micro-item/index.ts
import { bus } from "micro-bus";
import { db, items } from "micro-db";
import { eq } from "drizzle-orm";

// Respond to item lookups
bus.respond("micro-item.get", async ({ id }) => {
  const item = await db.query.items.findFirst({ where: eq(items.id, id) });
  if (!item) throw new Error(`Item ${id} not found`);
  return item;
});

// Create items
export async function createItem(ownerId: string, data: any) {
  //if (data.glbFile) data.glbManifest = await inspectGlb(data.glbFile);
  //if (data.description) data.markdownWarnings = await inspectMarkdown(data.description);

  const [item] = await db.insert(items).values({ ...data, ownerId }).returning();
  bus.publish("item.created", { id: item.id, title: item.title });
  return item;
}
