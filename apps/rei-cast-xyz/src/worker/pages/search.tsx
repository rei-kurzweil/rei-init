import React from 'react';
import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../env';

import Content from          '../../react/components/Content';
import { SideBar } from      '../../react/components/SideBar';
import { ProfileTitle } from '../../react/components/ProfileTitle';


export async function HandleSearchPage(c: Context<Env & { Bindings: ENV }>) {
    
    
    

    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ rei-cast.xyz</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <SideBar>
                    <ProfileTitle>⚡ SEARCH 🔍</ProfileTitle>
                </SideBar>
                <Content>
                    {
                        "no items found." 
                    }
                </Content>
            </body>

        </html>
    );

    return c.html(html);
}
