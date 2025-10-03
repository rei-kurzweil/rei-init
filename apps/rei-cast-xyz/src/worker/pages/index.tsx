import React from 'react';
import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../env';

import Content from          '../../react/components/Content';
import { SideBar } from      '../../react/components/SideBar';
import { Card } from         '../../react/components/Card';
import { ProfileTitle } from '../../react/components/ProfileTitle';

import { Item, ItemRepository } from "@rei-init/micro-domain";

export async function HandleHomePage(c: Context<Env & { Bindings: ENV }>) {
    
    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);

    
    let items: Item[] = [];

    items = await itemRepo.findAll(50, 0);
    

    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ rei-cast.xyz</title>
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <SideBar>
                    <ProfileTitle>⚡ REI-CAST.XYZ</ProfileTitle>
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
