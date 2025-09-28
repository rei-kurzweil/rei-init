export interface User {
    id: number;

    email: string;
    username: string;
    password_hash: string;

    name: string;
    config: Record<string, any>;

    createdAt: string;
}