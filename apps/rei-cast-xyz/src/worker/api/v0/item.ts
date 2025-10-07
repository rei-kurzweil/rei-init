import { Hono } from "hono";
import { ENV, AuthContext } from "../../env";
import { Item, ItemRepository } from "@rei-init/micro-domain";
import { authMiddleware } from "./auth-middleware";

const ItemRouter = new Hono<{ Bindings: ENV } & AuthContext>();

// Handle /api/v0/item/:item_id
ItemRouter.get("/:item_id", async (c) => {
    const item_id = c.req.param("item_id");

    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
    const item = await itemRepo.findById(Number(item_id));

    return c.json({
        item
    });
});

// handle adding item (protected)
ItemRouter.post("/", authMiddleware, async (c) => {
    const user = c.get("user"); // Internal user from auth middleware
    const itemData = await c.req.json();
    
    // Create item with the authenticated user as the owner
    const now = new Date().toISOString();
    const itemRecord: Item = {
        id: 0, // Will be auto-incremented
        from_user_id: user.id,
        to_user_ids: itemData.to_user_ids || [],
        to_item_ids: itemData.to_item_ids || [],
        content: itemData.content || "{}",
        content_type: itemData.content_type || "application/json",
        content_kv_key: itemData.content_kv_key || null,
        matrix: itemData.matrix || null,
        x: itemData.x || null,
        y: itemData.y || null,
        z: itemData.z || null,
        createdAt: now
    };

    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
    const newItem = await itemRepo.save(itemRecord);

    return c.json({
        item: newItem
    });
});

// handle removing item (protected)
ItemRouter.delete("/:item_id", authMiddleware, async (c) => {
    const user = c.get("user"); // Internal user from auth middleware
    const item_id = c.req.param("item_id");
    
    // Check if the item exists and belongs to the user
    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
    const item = await itemRepo.findById(Number(item_id));
    
    if (!item) {
        return c.json({ error: "Item not found" }, 404);
    }
    
    if (item.from_user_id !== user.id) {
        return c.json({ error: "Not authorized to delete this item" }, 403);
    }

    await itemRepo.delete(item_id);

    return c.json({
        success: true,
        message: "Item deleted successfully"
    });
});


export default ItemRouter;