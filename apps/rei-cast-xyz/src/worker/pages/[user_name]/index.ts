import { Hono } from "hono";
import { HandleUserProfile } from "./user-profile";
import { HandleUserItem } from "./[item_id]";

export const UserRouter = new Hono();

// Handle /:user_name (user profile)
UserRouter.get("/", HandleUserProfile);

// Handle /:user_name/:item_id (specific user item)
UserRouter.get("/:item_id", HandleUserItem);