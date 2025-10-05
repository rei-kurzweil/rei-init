// Clean example - just one script tag needed!

import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from '../react-ssr';

import { ENV } from '../env';
import { Content, MobileTopBar, SideBar, Card, ProfileTitle } from '@rei-init/ui';
import { Item, ItemRepository } from "@rei-init/micro-domain";

export async function HandleHomePage(c: Context<Env & { Bindings: ENV }>) {
    
    const itemRepo = new ItemRepository(c.env.REI_CAST_XYZ_D1);

    let items: Item[] = await itemRepo.findAll(50, 0);

    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ rei-cast.xyz with Meow (Simple)</title>
                <link rel="stylesheet" href="/styles.css" />
                <link rel="stylesheet" href="/apps/meow/meow-spa.css" />
            </head>
            <body>
                <MobileTopBar title={"⚡ REI-CAST.XYZ"}/>
                <SideBar>
                    <ProfileTitle>⚡ REI-CAST.XYZ</ProfileTitle>
                </SideBar>
                <Content>
                    <div 
                        data-app-meow
                        data-meow-title="Mrrow :3"
                        className="meow-spa-container"
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}
                    >
                        <p>Loading nyEditor... :3</p>
                    </div>

                    {
                        items.map(item => (
                            <Card key={item.id} content={item.content} />
                        ))
                    }
                    
                </Content>
                
                <script type="module" src="/apps/meow/meow-spa-auto.js"></script>
            </body>
        </html>
    );

    return c.html(html);
}