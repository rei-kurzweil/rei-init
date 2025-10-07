import type { Session } from '@supabase/supabase-js'

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
    user: AppUser | null = null

    // Handle session change from AuthUI
    async handleSessionChange(session: Session | null) {
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
            this.user = null
        }
    }

    // Sync session with backend and get user data
    private async syncWithBackend(session: Session): Promise<AppUser> {
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