// import React from 'react'; // Not needed for JSX with new transform
import type { Context } from 'hono';
import type { Env } from 'hono';
import { renderToString } from 'react-dom/server';

import { ENV } from '../env';
import { serializeSupabaseConfig } from '../supabase-config';

import { Content, SideBar, ProfileTitle } from '@rei-init/ui';


export async function HandleAuthPage(c: Context<Env & { Bindings: ENV }>) {
    
    
    const html = "<!DOCTYPE html>" + 
    renderToString(
        <html>
            <head>
                <title>⚡ Login</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
                <div className="layout-container">
                    <SideBar>
                        <ProfileTitle>🔑 LOGIN</ProfileTitle>
                        <div id="meow-status-island" className="meow-spa-container">
                            <p>^w^ Loading Meow Status...</p>
                        </div>
                    </SideBar>
                    <Content>
                        <div id="meow-sign-in-island" className="meow-spa-container"
                            style={{ borderRadius: '0.5rem', padding: '1rem', margin: '1rem 0' }}>
                            <p>^w^ Loading Sign In...</p>
                        </div>
                        
                        <p>{
                            "invite only rn. hmu on bluesky to join the beta @rei-cast.xyz" 
                        }</p>
                        
                    </Content>
                </div>

                {/* Cats background - covers entire screen */}
                <div id="cats-island" className="cats-spa-container">
                    <p className="loadingCats">🐈 Loading Cats...</p>
                </div>
                
                <script type="module">
                    {/* javascript */ `
                        import { mountMultipleIslands } from '/js/spa-multi-island.js'
                        
                        // Import app components
                        import { MeowApp, MeowAppIslandType } from '/apps/meow/meow-spa.js'
                        import CatsApp from '/apps/cats/cats-spa.js'
                        
                        // Mount multiple islands with shared micro-bus
                        const sharedBus = mountMultipleIslands([
                            { 
                                component: MeowApp, 
                                selector: '#meow-status-island', 
                                props: { 
                                    islandType: MeowAppIslandType.USER_STATUS,
                                    supabaseConfig: ${serializeSupabaseConfig(c)}
                                }
                            },
                            { 
                                component: MeowApp, 
                                selector: '#meow-sign-in-island', 
                                props: { 
                                    islandType: MeowAppIslandType.LOGIN_SIGN_UP,
                                    supabaseConfig: ${serializeSupabaseConfig(c)}
                                }
                            },
                            { 
                                component: CatsApp, 
                                selector: '#cats-island' 
                            }
                        ])
                        
                    `}
                </script>
            </body>

        </html>
    );

    return c.html(html);
}
