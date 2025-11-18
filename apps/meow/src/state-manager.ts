import type { Session, SupabaseClient } from '@supabase/supabase-js'
import { createClient } from '@supabase/supabase-js'

export interface AppUser {
    id: number
    name: string
    username: string
    email: string
    avatar_url: string
    config: Record<string, any>
    createdAt: string
    updatedAt: string
}

class StateManager {
    session: Session | null = null
    user: AppUser    | null = null

    supabaseUrl:     string = "";
    supabaseAnonKey: string = "";

    // Singleton Supabase client for the browser session
    public supabaseClient: SupabaseClient | null = null

    public init(supabaseUrl: string, supabaseAnonKey: string) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseAnonKey = supabaseAnonKey;

        if (!this.supabaseClient) {
            this.supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
        }
    }

    // Handle session change from AuthUI
    async handleSessionChange(session: Session | null) {
        // spooky console log 
        console.log("💜💜💜 Handling session change:", session);
        this.session = session
        
        if (session) {
            try {
                // Sync with our backend
                this.user = await this.syncWithBackend(session)
            } catch (error) {
                console.error('Failed to sync with backend:', error)
                this.user = null
            }
        } else {
            // Clear user data when session ends
            console.log("❤️‍🩹❤️‍🩹❤️‍🩹💜💜💜 Handling session change:", session);
            this.user = null
        }
    }

    async connectSupabaseClientFromTokens(access_token: string, refresh_token: string) {
        if (!this.supabaseClient) {
            throw new Error('Supabase client not initialized')
        }
        
        // login using the provided tokens
        const { data, error } = await this.supabaseClient.auth.setSession({ access_token, refresh_token })
        if (error) throw error
        await this.handleSessionChange(data.session)
    }

    async signOut() {
        try {
            if (!this.supabaseClient) {
                throw new Error('Supabase client not initialized')
            }

            await this.supabaseClient.auth.signOut()
        } catch (err) {
            console.warn('Supabase signOut encountered an issue (continuing):', err)
        } finally {
            await this.handleSessionChange(null)
        }
    }


    // Sync session with backend and get user data
    private async syncWithBackend(session: Session): Promise<AppUser> {
        console.log("💜💜💜🙀🙀🙀")
        const response = await fetch('/api/v0/auth/supabase-sync', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
            },
            body: JSON.stringify({
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_at: session.expires_at,
                expires_in: session.expires_in,
                token_type: session.token_type,
                user: session.user
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        return response.json()
    }

    // API helper method for authenticated requests
    async apiRequest(endpoint: string, options: RequestInit = {}) {
        if (!this.session) {
            throw new Error('No active session')
        }

        const response = await fetch(endpoint, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.session.access_token}`,
                ...options.headers
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        return response.json()
    }
}

// Export singleton instance
export const stateManager = new StateManager()