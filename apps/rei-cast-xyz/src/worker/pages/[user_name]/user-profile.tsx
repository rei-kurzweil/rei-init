import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';


import { ENV } from '../../env';

import Content from '../../../react/components/Content';
import { SideBar } from '../../../react/components/SideBar';

import { ItemRepository } from "@rei-init/micro-domain";

export function HandleUserProfile(c: Context<Env & { Bindings: ENV }>) {
    const user_name = c.req.param("user_name");

    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);

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

                </Content>
            </body>

        </html>


    );

    return c.html(html);
}
