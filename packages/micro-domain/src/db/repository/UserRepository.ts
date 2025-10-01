import { Repository } from ".";
import { User } from "../../user";

export class UserRepository implements Repository<User> {
    private db: D1Database;
    
    constructor(db: D1Database) {
        this.db = db;
    }

    async getById(id: string): Promise<User | null> {
        const stmt = this.db.prepare("SELECT * FROM users WHERE id = ?");
        const result = await stmt.bind(id).first<User>();
        return result || null;
    }

    async getAll(pageSize: number = 10, page: number = 1): Promise<User[]> {
        const offset = (page - 1) * pageSize;
        const stmt = this.db.prepare("SELECT * FROM users LIMIT ? OFFSET ?");
        const results = await stmt.bind(pageSize, offset).all<User>();
        return results.results;
    }

    async getAllWhereNameLike(name: string, pageSize: number = 16, page: number = 1): Promise<User[]> {
        const offset = (page - 1) * pageSize;
        const stmt = this.db.prepare("SELECT * FROM users WHERE name LIKE ? LIMIT ? OFFSET ?");
        const results = await stmt.bind(`%${name}%`, pageSize, offset).all<User>();
        return results.results;
    }

    async save(entity: User): Promise<void> {
        const stmt = this.db.prepare(`
            INSERT INTO users (id, email, username, password_hash, name, config, createdAt)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                email = excluded.email,
                username = excluded.username,
                password_hash = excluded.password_hash,
                name = excluded.name,
                config = excluded.config,
                createdAt = excluded.createdAt
        `);
        await stmt.bind(
            entity.id,
            entity.email,
            entity.username,
            entity.password_hash,
            entity.name,
            JSON.stringify(entity.config || {}),
            entity.createdAt
        ).run();
    }

    async delete(id: string): Promise<void> {
        const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
        await stmt.bind(id).run();
    }
}