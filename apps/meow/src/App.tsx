import { useState } from 'react'
import { Card, AuthUI } from '@rei-init/ui'
import './App.css'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config'
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
    islandBus?: any
}

function App({ className, islandType }: MeowAppProps) {
    const [user, setUser] = useState(stateManager.user)
    const [isLoading, setIsLoading] = useState(false)
    
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

    return (
        <div className={className}>
            
            {islandType === MeowAppIslandType.USER_STATUS && user && (
                <>
                    {`Signed in as ${user.username} • Email: ${user.email}`}
                </>
            )}

            {islandType === MeowAppIslandType.LOGIN_SIGN_UP && (
                <>
                    {isLoading && (
                        <Card title="🔄 Syncing..." content="Connecting to backend..." />
                    )}
                
                    <AuthUI 
                        supabaseUrl={SUPABASE_URL} 
                        supabaseAnonKey={SUPABASE_ANON_KEY}
                        onSessionChange={async (session) => {
                            console.log("Session changed:", session);
                            setIsLoading(true);
                            await stateManager.handleSessionChange(session);
                            setUser(stateManager.user);
                            setIsLoading(false);
                    }}
                />
                </>
            )}

            {islandType === MeowAppIslandType.ADMIN_LOGIN_SIGN_UP && (
                <>
                    {isLoading && (
                        <Card title="🔄 Syncing..." content="Connecting to backend..." />
                    )}
                
                    <AuthUI 
                        supabaseUrl={SUPABASE_URL} 
                        supabaseAnonKey={SUPABASE_ANON_KEY}
                        onSessionChange={async (session) => {
                            console.log("Session changed:", session);
                            setIsLoading(true);
                            await stateManager.handleSessionChange(session);
                            setUser(stateManager.user);
                            setIsLoading(false);
                    }}
                />
                </>
            )}

            {islandType === MeowAppIslandType.EDITOR && (
                <>
                </>
            )}

            <div className="card">
                <button onClick={() => sendItem()}>
                    🚀 add item {user ? `(as ${user.username})` : '(login required)'}
                </button>
            </div>
        </div>
    )
}

export default App