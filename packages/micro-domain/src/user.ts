export interface User {
    id: number;

    email: string;
    username: string;
    password_hash: string;

    name: string;
    config: Record<string, any>;

    // W3C date time string
    createdAt: string;
    // W3C date time string
    updatedAt: string;
}