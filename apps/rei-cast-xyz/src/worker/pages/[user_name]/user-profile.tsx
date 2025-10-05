import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../../env';

import { Item, ItemRepository, User, UserRepository } from "@rei-init/micro-domain";
import { Content, SideBar, Card, MobileTopBar } from '@rei-init/ui';

export async function HandleUserProfile(c: Context<Env & { Bindings: ENV }>) {
    const user_name = c.req.param("user_name");

    const userRepo = new UserRepository(c.env.REI_CAST_XYZ_D1);
    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);

    // Fetch user by user_name
    const user: User | null  = await userRepo.findByUserName(user_name);
    
    let items: Item[] = [];

    if (user) {
        // Fetch items by user_id
        items = await itemRepo.findAllByFromUserId(user.id, 50);
    }

    const html = "<!DOCTYPE html>" +
    renderToString(
        <html>
            <head>
                <title>{user_name}</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <MobileTopBar title={user_name} />
                <SideBar>
                    <div>@{user_name}</div>
                </SideBar>
                <Content>
                    {
                        items.map(item => (<Card key={item.id} content={item.content} />))
                    }
                </Content>
            </body>

        </html>
    );

    return c.html(html);
}
