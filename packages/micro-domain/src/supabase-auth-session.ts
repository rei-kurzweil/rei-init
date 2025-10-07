export interface SupabaseAuthSession {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: {
        id: string;
        aud: string;
        role: string;
        email: string;
        phone: string | null;
        confirmed_at: string | null;
        last_sign_in_at: string | null;
        app_metadata: {
            provider: string;
            providers: string[];
        };

        user_metadata: {
            email: string;
        name: string;
            avatar_url: string | null;
            [key: string]: any;
        }
    }
}