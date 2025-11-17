import { useEffect, useRef, useState } from 'react'
import { Card, AuthUI } from '@rei-init/ui'
import type { MicroBus } from '@rei-init/micro-bus'
import './App.css'
import { defaultSupabaseConfig, type SupabaseConfig } from './supabase-config'
import { stateManager } from './state-manager'
import { DebugUrlTracker } from './DebugUrlTracker'

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
    // Ensure supabaseConfig has required properties, fallback to defaults if missing
    if (!supabaseConfig?.url || !supabaseConfig?.anonKey) {
        supabaseConfig = defaultSupabaseConfig;
    }
    
    const [user, setUser] = useState(stateManager.user)
    // Only show loading for auth islands, not status islands
    const [isLoading, setIsLoading] = useState(false)
    const [isProcessingSession, setIsProcessingSession] = useState(false)
    const isAuthIsland = islandType === MeowAppIslandType.LOGIN_SIGN_UP
    // Track last processed access token to avoid duplicate session handling
    const lastHandledAccessTokenRef = useRef<string | null>(stateManager.session?.access_token ?? null)
    // Debug URL tracker instance
    const debugTrackerRef = useRef<DebugUrlTracker | null>(null)

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
            // Seed last handled token so AuthUI's onSessionChange doesn't double-handle
            lastHandledAccessTokenRef.current = stateManager.session?.access_token ?? accessToken;
            // setIsLoading(false);
            
            // Clear tokens from URL hash
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            console.log("Meow supabaseConnectFromSessionOrURLFragment didn't find both tokens");
        }
    }

    useEffect(() => {
        // Initialize debug URL tracker to track query and fragment parameters
        if (!debugTrackerRef.current) {
            debugTrackerRef.current = new DebugUrlTracker();
            // Make debug tracker available globally for console access
            (window as any).meowDebug = debugTrackerRef.current;
        }
        
        // set supabase url and anon key from props
        stateManager.supabaseUrl = supabaseConfig.url;
        stateManager.supabaseAnonKey = supabaseConfig.anonKey;

        console.log("Meow Supabase config set in state manager:", {
            url: stateManager.supabaseUrl,
            anonKey: stateManager.supabaseAnonKey
        });

        // Only attempt URL-fragment token connect on the LOGIN_SIGN_UP island
        // and ensure we only process it once per-page globally to avoid duplicates across multiple islands
        if (islandType === MeowAppIslandType.LOGIN_SIGN_UP) {
            const w = window as any;
            if (!w.__meowProcessedURLTokens) {
                w.__meowProcessedURLTokens = true;
                supabaseConnectFromSessionOrURLFragment();
            } else {
                console.log('Meow URL tokens already processed on this page, skipping.');
            }
        }

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
                    {isAuthIsland && isLoading && (
                        <Card title="🔄 Syncing..." content="Meow connecting to backend..." />
                    )}
                    <AuthUI
                        supabaseUrl={supabaseConfig.url}
                        supabaseAnonKey={supabaseConfig.anonKey}
                        onSessionChange={async (session) => {
                            // Prevent processing if already processing a session change
                            if (isProcessingSession) {
                                console.log("Auth UI Already processing session change, skipping...");
                                return;
                            }
                            
                            // Handle sign-out events explicitly
                            if (!session) {
                                console.log("Auth UI Session is null (sign-out), processing...");
                                setIsProcessingSession(true);
                                setIsLoading(true);
                                await stateManager.handleSessionChange(null);
                                setUser(stateManager.user);
                                lastHandledAccessTokenRef.current = null;
                                setIsLoading(false);
                                setIsProcessingSession(false);
                                return;
                            }

                            const incomingAccessToken = session?.access_token ?? null;

                            // Skip if we've already handled this exact token
                            if (incomingAccessToken && lastHandledAccessTokenRef.current === incomingAccessToken) {
                                console.log("Auth UI Session token already handled, skipping...");
                                return;
                            }

                            // Also skip if it matches current stateManager session
                            if (incomingAccessToken && incomingAccessToken === stateManager.session?.access_token) {
                                console.log("Auth UI Session unchanged (matches state), skipping...");
                                lastHandledAccessTokenRef.current = incomingAccessToken; // keep in sync
                                return;
                            }
                            
                            console.log("Auth UI Processing session change:", session);
                            setIsProcessingSession(true);
                            setIsLoading(true);
                            
                            await stateManager.handleSessionChange(session);
                            setUser(stateManager.user);
                            lastHandledAccessTokenRef.current = stateManager.session?.access_token ?? incomingAccessToken;
                            
                            setIsLoading(false);
                            setIsProcessingSession(false);
                        }}
                    />
                </>
            )}

            {/* ADMIN_LOGIN_SIGN_UP removed; admin uses LOGIN_SIGN_UP mode */}

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