import { Repository } from ".";
import { Item } from "../../item";

export class ItemRepository implements Repository<Item> {
    private db: D1Database;

    constructor(db: D1Database) {
        this.db = db;
    }

    async getById(id: string): Promise<Item | null> {
        const stmt = this.db.prepare("SELECT * FROM items WHERE id = ?");
        const result = await stmt.bind(id).first<Item>();
        return result || null;
    }

    async getAll(pageSize: number = 10, page: number = 1): Promise<Item[]> {
        const offset = (page - 1) * pageSize;
        const stmt = this.db.prepare("SELECT * FROM items LIMIT ? OFFSET ?");
        const results = await stmt.bind(pageSize, offset).all<Item>();
        return results.results;
    }

    async getAllWhereNameLike(name: string, pageSize: number = 16, page: number = 1): Promise<Item[]> {
        const offset = (page - 1) * pageSize;
        const stmt = this.db.prepare("SELECT * FROM items WHERE name LIKE ? LIMIT ? OFFSET ?");
        const results = await stmt.bind(`%${name}%`, pageSize, offset).all<Item>();
        return results.results;
    }

    async save(entity: Item): Promise<void> {
        
        const stmt = this.db.prepare(`
            INSERT INTO items (id, from_user_id, to_user_ids, to_item_ids, content, content_type, content_kv_key, matrix, x, y, z, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                from_user_id = excluded.from_user_id,
                to_user_ids = excluded.to_user_ids,
                to_item_ids = excluded.to_item_ids,
                content = excluded.content,
                content_type = excluded.content_type,
                content_kv_key = excluded.content_kv_key,
                matrix = excluded.matrix,
                x = excluded.x,
                y = excluded.y,
                z = excluded.z,
                createdAt = excluded.createdAt
        `);
        await stmt.bind(
            entity.id,
            entity.from_user_id,
            entity.to_user_ids ? JSON.stringify(entity.to_user_ids) : null,
            entity.to_item_ids ? JSON.stringify(entity.to_item_ids) : null,
            entity.content,
            entity.content_type,
            entity.content_kv_key || null,
            entity.matrix ? JSON.stringify(entity.matrix) : null,
            entity.x || null,
            entity.y || null,
            entity.z || null,
            entity.createdAt
        ).run();
    }

    async delete(id: string): Promise<void> {
        const stmt = this.db.prepare("DELETE FROM items WHERE id = ?");
        await stmt.bind(id).run();
    }

}