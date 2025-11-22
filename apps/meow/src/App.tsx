import { useEffect, useRef, useState } from 'react'
import { Card } from '@rei-init/ui'
import type { MicroBus } from '@rei-init/micro-bus'
import './App.css'
import { defaultSupabaseConfig, type SupabaseConfig } from './supabase-config'
import { stateManager } from './state-manager'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


export enum MeowAppIslandType {
    LOGIN_SIGN_UP = "login-sign-up",
    EDITOR = "editor",
    USER_STATUS = "user-status",
}

export interface MeowAppProps {
    className?: string
    islandType?: MeowAppIslandType
    islandBus?: MicroBus
    supabaseConfig?: SupabaseConfig
}

function App({ className, islandType, supabaseConfig = defaultSupabaseConfig }: MeowAppProps) {

    console.log("init island type: ", islandType);

    const [user,      setUser]      = useState(stateManager.user)
    const [isLoading, setIsLoading] = useState(false)

    // Track last processed access token to avoid duplicate session handling
    const lastHandledAccessTokenRef = useRef<string | null>(stateManager.session?.access_token ?? null)

    async function sendItem() {
        if (!user) {
            alert("Please log in first! 🔐")
            return
        }

        try {
            // Example API call using the state manager
            const result = await stateManager.apiRequest('/api/v0/items', {
                method: 'POST',
                body: JSON.stringify({
                    content: "Test item from meow app",
                    content_type: "text/plain"
                })
            })
            alert("Item sent! 🚀")
            console.log("Item created:", result)
        } catch (error) {
            console.error("Failed to send item:", error)
            alert("Failed to send item 😿")
        }
    }

    async function supabaseConnectURLParams() {
        console.log("🩷🩷🩷 connect from session or URL fragment");
        // Parse tokens from URL hash fragment (after #)
        const hashFragment = window.location.hash.substring(1); // Remove the # character
        const urlParams = new URLSearchParams(hashFragment);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (accessToken && refreshToken) {
            setIsLoading(true);
            await stateManager.connectSupabaseClientFromTokens(accessToken, refreshToken);
            setUser(stateManager.user);
            setIsLoading(false);

            // Clear tokens from URL hash
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            console.log("Meow supabaseConnectURLParams didn't find both tokens");
        }
    }

    useEffect(() => {

        // set supabase url and anon key from props
        stateManager.supabaseUrl     = supabaseConfig.url;
        stateManager.supabaseAnonKey = supabaseConfig.anonKey;

        // Ensure supabaseConfig has required properties, fallback to defaults if missing
        if (!supabaseConfig?.url || !supabaseConfig?.anonKey) {
            supabaseConfig = defaultSupabaseConfig;
        } 
        
        console.log("🩷🩷🩷 Initializing Supabase Client with light pink hearts 🩷🩷🩷");
        stateManager.init(supabaseConfig.url, supabaseConfig.anonKey);
        
        // Only attempt URL-fragment token connect on the LOGIN_SIGN_UP island
        // and ensure we only process it once per-page globally to avoid duplicates across multiple islands
        if (islandType === MeowAppIslandType.LOGIN_SIGN_UP) {
            const w = window as any;
            if (!w.__meowProcessedURLTokens) {
                w.__meowProcessedURLTokens = true;
                supabaseConnectURLParams();
            } else {
                console.log('Meow URL tokens already processed on this page, skipping.');
            }
        }


        // supabase:  get session,  and handle session change

        if (!stateManager.supabaseClient) {
            console.warn("🩷🩷🩷 Supabase client not initialized yet, cannot handle session");
            return
        }

        const   supabase   = stateManager.supabaseClient,
                authClient = supabase.auth;

        authClient.getSession().then(({ data: { session } }) => {
            if (!session) {             console.log("🩷🩷🩷 no existing session found");
                return;
            }

            console.log("🩷🩷🩷 already had session", session)
        })

        const {
            data: { subscription },
        } = authClient.onAuthStateChange(async (_event, session) => {
            setIsLoading(true);
            console.log("❤️‍🔥❤️‍🔥❤️‍🔥 Auth state changed, processing...", session);

            
            await stateManager.handleSessionChange(session);

            console.log("❤️‍🔥❤️‍🔥❤️‍🔥 handle session update");
            if (stateManager.user) {
                console.log("❤️‍🔥❤️‍🔥❤️‍🔥 handle session update", stateManager.user);
                setUser(stateManager.user);
            }

            setIsLoading(false);
            
        })

    }, [stateManager.supabaseClient]); // Empty dependency array ensures this runs once on mount




    return (
        <div className={className}>
            {
                        stateManager.supabaseClient != null ? "stateManager.supabaseClient is ready" : "stateManager.supabaseClient is null"
            }

            {islandType === MeowAppIslandType.USER_STATUS && (
                
                user 
                ? (
                    <>
                    🔑 { user.username }
                    <div>
                        <button onClick={async () => {
                            await stateManager.signOut();
                            setUser(null);
                            lastHandledAccessTokenRef.current = null;
                        }}>
                            Sign Out
                        </button>
                    </div>
                    </>
                )
                : (
                    <a href="/login">Sign In</a>
                ) 
                                
            )}

            {islandType === MeowAppIslandType.LOGIN_SIGN_UP && (
                <>
                    {isLoading &&  ( 
                        <Card title="🔄 Syncing..." content="Meow connecting to backend..." />
                    )}
                    
                    {stateManager.supabaseClient != null && (
                        <Auth
                            supabaseClient={stateManager.supabaseClient}
                            appearance={{ theme: ThemeSupa }}
                        />
                    )}
                    
                </>
            )}

            {islandType === MeowAppIslandType.EDITOR && (
                <>
                    {/* todo: add editor component */}
                    <div className="card">
                        <button onClick={() => sendItem()}>
                            🚀 add item {user ? `(as ${user.username})` : '(login required)'}
                        </button>
                    </div>
                </>
            )}


        </div>
    )
}

export default App