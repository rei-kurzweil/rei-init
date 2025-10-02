import { ItemRepository } from "@rei-init/micro-domain";

import { Item } from "@rei-init/micro-domain";

import { Hono } from "hono";
import { ENV } from "./env";

const app = new Hono<{ Bindings: ENV }>();

app.get("/api/v0/item/:item_id", (c) => {
        const item_id = c.req.param("item_id");
        
        const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);


        const item = itemRepo.findById(Number(item_id));

        return c.json({
                item
        })
});


app.get("/api/v0/user/:user_id/items", async (c) => {
        const user_id = c.req.param("user_id");
        
        const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
        const items: Item[] = await itemRepo.findAllByFromUserId(Number(user_id), 50);

        return c.json({
                items
        })
});

export default app;
