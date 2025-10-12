import { useEffect, useState } from 'react'
import { Card, AuthUI } from '@rei-init/ui'
import type { MicroBus } from '@rei-init/micro-bus'
import './App.css'
import { defaultSupabaseConfig, type SupabaseConfig } from './supabase-config'
import { stateManager } from './state-manager'

export enum MeowAppIslandType {
    LOGIN_SIGN_UP = "login-sign-up",
    ADMIN_LOGIN_SIGN_UP = "admin-login-sign-up",
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
    // Ensure supabaseConfig has required properties, fallback to defaults if missing
    if (!supabaseConfig?.url || !supabaseConfig?.anonKey) {
        supabaseConfig = defaultSupabaseConfig;
    }
    
    const [user, setUser] = useState(stateManager.user)
    // Only show loading for auth islands, not status islands
    const [isLoading, setIsLoading] = useState(false)
    const [isProcessingSession, setIsProcessingSession] = useState(false)
    const isAuthIsland = islandType === MeowAppIslandType.LOGIN_SIGN_UP || islandType === MeowAppIslandType.ADMIN_LOGIN_SIGN_UP

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

    async function supabaseConnectFromSessionOrURLFragment() {
        // Parse tokens from URL hash fragment (after #)
        const hashFragment = window.location.hash.substring(1); // Remove the # character
        const urlParams = new URLSearchParams(hashFragment);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (accessToken && refreshToken) {
            console.log("Meow supabaseConnectFromSessionOrURLFragment has both tokens");
            // setIsLoading(true);
            await stateManager.connectSupabaseClientFromTokens(accessToken, refreshToken);
            setUser(stateManager.user);
            // setIsLoading(false);
            
            // Clear tokens from URL hash
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            console.log("Meow supabaseConnectFromSessionOrURLFragment didn't find both tokens");
        }
    }

    useEffect(() => {
        // set supabase url and anon key from props
        stateManager.supabaseUrl = supabaseConfig.url;
        stateManager.supabaseAnonKey = supabaseConfig.anonKey;

        console.log("Meow Supabase config set in state manager:", {
            url: stateManager.supabaseUrl,
            anonKey: stateManager.supabaseAnonKey
        });
        // On mount, check for existing session or URL tokens
        supabaseConnectFromSessionOrURLFragment();

    }, []); // Empty dependency array ensures this runs once on mount




    return (
        <div className={className}>

            {islandType === MeowAppIslandType.USER_STATUS && (
                
                user 
                ? (
                    <>
                    🔑 { user.username }
                    <div>
                        <button onClick={async () => {
                            await stateManager.handleSessionChange(null);
                            setUser(null);
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
                    {isAuthIsland && isLoading && (
                        <Card title="🔄 Syncing..." content="Meow connecting to backend..." />
                    )}
                    {
                        console.log("Meow Rendering AuthUI with config:", supabaseConfig)
                    }
                    <AuthUI
                        supabaseUrl={supabaseConfig.url}
                        supabaseAnonKey={supabaseConfig.anonKey}
                        onSessionChange={async (session) => {
                            // Prevent processing if already processing a session change
                            if (isProcessingSession) {
                                console.log("Auth UI Already processing session change, skipping...");
                                return;
                            }
                            
                            // Check if session is actually different
                            if (session?.access_token === stateManager.session?.access_token) {
                                console.log("Auth UI Session unchanged, skipping...");
                                return;
                            }
                            
                            console.log("Auth UI Processing session change:", session);
                            setIsProcessingSession(true);
                            setIsLoading(true);
                            
                            await stateManager.handleSessionChange(session);
                            setUser(stateManager.user);
                            
                            setIsLoading(false);
                            setIsProcessingSession(false);
                        }}
                    />
                </>
            )}

            {islandType === MeowAppIslandType.ADMIN_LOGIN_SIGN_UP && (
                <>
                    {isAuthIsland && isLoading && (
                        <Card title="🔄 Syncing..." content="Connecting to backend..." />
                    )}

                    <AuthUI
                        supabaseUrl={supabaseConfig.url}
                        supabaseAnonKey={supabaseConfig.anonKey}
                        onSessionChange={async (session) => {
                            // Prevent processing if already processing a session change
                            if (isProcessingSession) {
                                console.log("Already processing session change, skipping...");
                                return;
                            }
                            
                            // Check if session is actually different
                            if (session?.access_token === stateManager.session?.access_token) {
                                console.log("Session unchanged, skipping...");
                                return;
                            }
                            
                            console.log("Processing session change:", session);
                            setIsProcessingSession(true);
                            setIsLoading(true);
                            
                            await stateManager.handleSessionChange(session);
                            setUser(stateManager.user);
                            
                            setIsLoading(false);
                            setIsProcessingSession(false);
                        }}
                    />
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