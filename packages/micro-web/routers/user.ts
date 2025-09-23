// packages/micro-web/routers/user.ts
import { bus } from "@rei-init/micro-bus";

export const userRouter = (app) => {
  app.get("/:slug", async (c) => {
    // First look up the user ID by slug via DB
    // then request full user object from micro-user
    const id = await lookupUserIdBySlug(c.req.param("slug"));
    const user = await bus.request("micro-user.get", { id });
    return c.render("user", { user });
  });

  app.get("/:slug/:itemSlug", async (c) => {
    const itemId = await lookupItemIdBySlug(c.req.param("itemSlug"));
    const item = await bus.request("micro-item.get", { id: itemId });
    return c.render("item", { item });
  });
};