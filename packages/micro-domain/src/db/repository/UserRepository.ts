import { Repository } from ".";
import { User } from "../../user";

export class UserRepository implements Repository<User> {
    private db: D1Database;
    
    constructor(db: D1Database) {
        this.db = db;
    }

    private readonly PUBLIC_COLUMNS = 'id, email, username, name, avatar_url, config, createdAt, updatedAt';

    async findById(id: number): Promise<User | null> {
        const stmt = this.db.prepare("SELECT "+this.PUBLIC_COLUMNS+" FROM users WHERE id = ?");
        let result = await stmt.bind(id).first<User>();

        return result || null;
    }

    async findByUserName(name: string): Promise<User | null> {
            const stmt = this.db.prepare("SELECT "+this.PUBLIC_COLUMNS+" FROM users WHERE username = ?");
            const result = await stmt.bind(name).first<User>();
            return result || null;
    }

    async findByUserEmail(email: string): Promise<User | null> {
        const stmt = this.db.prepare("SELECT "+this.PUBLIC_COLUMNS+" FROM users WHERE email = ?");
        const result = await stmt.bind(email).first<User>();
        return result || null;
    }

    async findAll(pageSize: number = 10, page: number = 1): Promise<User[]> {
        const offset = (page - 1) * pageSize;
        const stmt = this.db.prepare("SELECT "+this.PUBLIC_COLUMNS+" FROM users LIMIT ? OFFSET ?");
        const results = await stmt.bind(pageSize, offset).all<User>();
        return results.results;
    }

    async findAllWhereNameLike(name: string, pageSize: number = 16, page: number = 1): Promise<User[]> {
        const offset = (page - 1) * pageSize;
        const stmt = this.db.prepare("SELECT "+this.PUBLIC_COLUMNS+" FROM users WHERE name LIKE ? LIMIT ? OFFSET ?");
        const results = await stmt.bind(`%${name}%`, pageSize, offset).all<User>();
        return results.results;
    }

    async save(entity: User): Promise<User> {
        // Set updatedAt to current time for updates
        const now = new Date().toISOString();
        const userToSave = { ...entity, updatedAt: now };
        
        const stmt = this.db.prepare(`
            INSERT INTO users (id, email, username, password_hash, name, avatar_url, config, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                email = excluded.email,
                username = excluded.username,
                password_hash = excluded.password_hash,
                name = excluded.name,
                avatar_url = excluded.avatar_url,
                config = excluded.config,
                updatedAt = excluded.updatedAt
        `);
        await stmt.bind(
            userToSave.id,
            userToSave.email,
            userToSave.username,
            userToSave.password_hash,
            userToSave.name,
            userToSave.avatar_url,
            JSON.stringify(userToSave.config || {}),
            userToSave.createdAt,
            userToSave.updatedAt
        ).run();
        
        // Return the saved user with updated timestamp
        return userToSave;
    }

    async delete(id: string): Promise<void> {
        const stmt = this.db.prepare("DELETE FROM users WHERE id = ?");
        await stmt.bind(id).run();
    }
}