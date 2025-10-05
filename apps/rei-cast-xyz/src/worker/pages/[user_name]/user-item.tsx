import { Context } from "hono";
import { renderToString } from "react-dom/server";

import { ItemRepository, User, Item, UserRepository } from "@rei-init/micro-domain";
import { ENV } from "../../env";

import { Content, SideBar, Card, MobileTopBar } from '@rei-init/ui';


export async function HandleUserItem(c: Context<Env & { Bindings: ENV }>) {
    const user_name = c.req.param("user_name");
    const item_id = c.req.param("item_id");

    const userRepo = new UserRepository(c.env.REI_CAST_XYZ_D1);
    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);

    // Fetch user by user_name
    const user: User | null  = await userRepo.findByUserName(user_name);
    
    let item: Item | null = null;

    if (user) {
        // Fetch item by item_id
        item = await itemRepo.findById(Number(item_id));
    }

    const html = "<!DOCTYPE html>" +
    renderToString(
        <html>
            <head>
                <title>{user_name} - {item_id}</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <MobileTopBar title={user_name} />
                <SideBar>
                    <div>{user_name}</div>
                </SideBar>
                <Content>
                    {
                        item ? <Card key={item.id} content={item.content} /> : <div>Item not found</div>
                    }
                </Content>
            </body>

        </html>
    );
    
    return c.html(html);
}