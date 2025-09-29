#!/usr/bin/env node
/**
 * Apply migrations to local SQLite database for development
 */

import Database from "better-sqlite3";
import * as fs from "fs";
import * as path from "path";

function getMigrationFiles() {
    const migrationsDir = "./migrations";
    if (!fs.existsSync(migrationsDir)) {
        console.log("📁 No migrations directory found. Run 'npm run db:generate' first.");
        return [];
    }

    return fs.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort()
        .map(file => path.join(migrationsDir, file));
}

function main() {
    const dbPath = process.env.DB_PATH || "./local.db";
    const db = new Database(dbPath);

    const migrationFiles = getMigrationFiles();

    if (migrationFiles.length === 0) {
        console.log("✨ No migrations to apply.");
        return;
    }

    console.log(`🚀 Applying ${migrationFiles.length} migration(s) to ${dbPath}`);

    for (const file of migrationFiles) {
        console.log(`📦 Applying ${file}...`);

        try {
            const sql = fs.readFileSync(file, "utf-8");
            db.exec(sql);
            console.log(`✅ Applied ${file}`);
        } catch (error) {
            console.error(`❌ Failed to apply ${file}:`, error.message);
            throw error;
        }
    }

    db.close();
    console.log("🎉 All migrations applied successfully!");
}

main();