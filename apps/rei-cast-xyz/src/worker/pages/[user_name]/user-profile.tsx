import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../../env';

import { Item, ItemRepository, User, UserRepository } from "@rei-init/micro-domain";
import { Content, SideBar, Card, MobileTopBar, ProfileTitle } from '@rei-init/ui';

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
                <MobileTopBar title={user_name} />
                <SideBar>
                    <ProfileTitle>@{user_name}</ProfileTitle>
                </SideBar>
                
                <Content>
                    <div id="cats-island" className="cats-spa-container" 
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                        <p>🐈 Loading Cats...</p>
                    </div>
                    <div id="meow-status-island" className="meow-spa-container"
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                        <p>^w^ Loading Meow Status...</p>
                    </div>
                    <div id="meow-editor-island" className="meow-spa-container"
                        style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
                        <p>^w^ Loading Meow Editor...</p>
                    </div>
                    {
                        items.map(item => (<Card key={item.id} content={item.content} />))
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
                            { component: MeowApp, selector: '#meow-status-island', props: { islandType: MeowAppIslandType.USER_STATUS } },
                            { component: MeowApp, selector: '#meow-editor-island', props: { islandType: MeowAppIslandType.EDITOR, title: '${user_name}' } }
                        ])
                        
                    `}
                </script>
            </body>

        </html>
    );

    return c.html(html);
}
