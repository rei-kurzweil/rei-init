import { Hono } from "hono";

import { ENV } from "./env";
import { APIRouter } from "./api/v0";
import { UserRouter } from "./pages/[user_name]";

const app = new Hono<{ Bindings: ENV }>();


app.route("/api/v0", APIRouter);

app.route("/:user_name", UserRouter)


export default app;


// app.get("/api/v0/item/:item_id", (c) => {
//         const item_id = c.req.param("item_id");
//         const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
//         const item = itemRepo.findById(Number(item_id));
//         return c.json({
//                 item
//         })
// });


// app.get("/api/v0/user/:user_id/items", async (c) => {
//         const user_id = c.req.param("user_id");
//         const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);
//         const items: Item[] = await itemRepo.findAllByFromUserId(Number(user_id), 50);

//         return c.json({
//                 items
//         })
//});

