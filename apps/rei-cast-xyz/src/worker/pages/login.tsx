import React from 'react';
import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../env';

import Content from          '../../react/components/Content';
import { SideBar } from      '../../react/components/SideBar';
import { ProfileTitle } from '../../react/components/ProfileTitle';


export async function HandleAuthPage(c: Context<Env & { Bindings: ENV }>) {
    
    
    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ Login</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <SideBar>
                    <ProfileTitle>⚡ LOGIN 🔑</ProfileTitle>
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
