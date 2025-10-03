import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../../env';
import Content from '../../../react/components/Content';
import { SideBar } from '../../../react/components/SideBar';
import { Card } from '../../../react/components/Card';

import { Item, ItemRepository, User, UserRepository } from "@rei-init/micro-domain";

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

    const html = renderToString(
        <html>
            <head>
                <title>{user_name}</title>
            </head>
            <body>
                <SideBar>
                    <div>User Profile: {user_name}</div>
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
