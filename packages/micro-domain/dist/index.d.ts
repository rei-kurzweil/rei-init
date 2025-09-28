interface Item {
    id: number;
    from_user_id: number;
    to_user_ids?: number[];
    to_item_ids?: number[];
    content: string;
    content_type: string;
    content_kv_key?: string;
    matrix?: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    x?: number;
    y?: number;
    z?: number;
    createdAt: number;
}

interface User {
    id: number;
    email: string;
    username: string;
    password_hash: string;
    name: string;
    config: Record<string, any>;
    createdAt: string;
}

export type { Item, User };
