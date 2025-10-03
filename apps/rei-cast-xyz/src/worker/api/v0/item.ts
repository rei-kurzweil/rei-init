import { Hono } from "hono";
import { ENV } from "../../env";
import { Item, ItemRepository } from "@rei-init/micro-domain";

const ItemRouter = new Hono<{ Bindings: ENV }>();

// Handle /api/v0/item/:item_id
ItemRouter.get("/:item_id", async (c) => {
    const item_id = c.req.param("item_id");

    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
    const item = await itemRepo.findById(Number(item_id));

    return c.json({
        item
    });
});

// handle adding item
ItemRouter.post("/", async (c) => {
    const itemRecord: Item = await c.req.json();

    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
    const newItem = await itemRepo.save(itemRecord);

    return c.json({
        item: newItem
    });
});

// handle removing item
ItemRouter.delete("/:item_id", async (c) => {
    const item_id = c.req.param("item_id");

    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
    const deleted = await itemRepo.delete(item_id);

    return c.json({
        success: deleted
    });
});


export default ItemRouter;