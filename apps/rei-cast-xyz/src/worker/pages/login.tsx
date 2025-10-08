// import React from 'react'; // Not needed for JSX with new transform
import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../env';


import { Content, SideBar, ProfileTitle, MobileTopBar } from '@rei-init/ui';


export async function HandleAuthPage(c: Context<Env & { Bindings: ENV }>) {
    
    
    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ Login</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <MobileTopBar title={"🔑 LOGIN"} />
                <SideBar>
                    <ProfileTitle>🔑 LOGIN</ProfileTitle>
                </SideBar>
                <Content>
                    {
                        "invite only rn. hmu on bsky @rei-cast.xyz" 
                    }
                    
                </Content>
            </body>

        </html>
    );

    return c.html(html);
}
