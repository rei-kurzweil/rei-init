// import React from 'react'; // Not needed for JSX with new transform
import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../env';


import { Content, SideBar, ProfileTitle } from '@rei-init/ui';


export async function HandleSearchPage(c: Context<Env & { Bindings: ENV }>) {
    
    
    

    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ rei-cast.xyz</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <div className="layout-container">
                    <SideBar>
                        <ProfileTitle>⚡ SEARCH 🔍</ProfileTitle>
                    </SideBar>
                    <Content>
                        {"no items found."}
                    </Content>
                </div>
            </body>

        </html>
    );

    return c.html(html);
}
