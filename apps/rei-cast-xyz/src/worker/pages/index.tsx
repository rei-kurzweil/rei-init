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
                <title>⚡ rei-cast.xyz</title>
                <link rel="stylesheet" href="/styles.css" />
                <link rel="stylesheet" href="/apps/meow/meow.css" />
                <link rel="stylesheet" href="/apps/cats/cats.css" />
                
                <script type="importmap">
                {`{
                    "imports": {
                        "react": "https://esm.sh/react@19.0.0",
                        "react-dom/client": "https://esm.sh/react-dom@19.0.0/client",
                        "@rei-init/micro-bus": "/apps/micro-bus.js"
                    }
                }`}
                </script>
            </head>
            <body>
                <MobileTopBar title={"⚡ REI-CAST.XYZ"}/>
                <SideBar>
                    <ProfileTitle>⚡ REI-CAST.XYZ</ProfileTitle>
                </SideBar>
                <Content>
                    <div id="cats-island" className="cats-spa-container" 
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                        <p>🐈 Loading Cats...</p>
                    </div>
                    
                    <div id="meow-login-island" className="meow-spa-container"
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                        <p>^w^ Loading Meow Login...</p>
                    </div>
                    
                    <div id="meow-status-island" className="meow-spa-container"
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                        <p>^w^ Loading Meow Status...</p>
                    </div>

                    {
                        items.map(item => (
                            <Card key={item.id} content={item.content} />
                        ))
                    }
                </Content>
                <script type="module">
                    {/* javascript */ `
                        import { mountMultipleIslands } from '/apps/spa-multi-island.js'
                        
                        // Import app components
                        import CatsApp from '/apps/cats/cats-spa.js'
                        import { MeowApp, MeowAppIslandType } from '/apps/meow/meow-spa.js'
                        
                        // Mount multiple islands with shared micro-bus
                        const sharedBus = mountMultipleIslands([
                            { component: CatsApp, selector: '#cats-island' },
                            { component: MeowApp, selector: '#meow-login-island', props: { islandType: MeowAppIslandType.LOGIN_SIGN_UP } },
                            { component: MeowApp, selector: '#meow-status-island', props: { islandType: MeowAppIslandType.USER_STATUS } }
                        ])
                        
                    `}
                </script>
            </body>
        </html>
    );

    return c.html(html);
}