#!/usr/bin/env node
/**
 * Apply migrations to D1 database using wrangler
 * This script reads the d1.config.json and uses wrangler to execute migrations
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

function loadD1Config() {
    const configPath = "./d1.config.json";
    if (!fs.existsSync(configPath)) {
        console.error("❌ d1.config.json not found. Copy d1.config.example.json and fill in your D1 details.");
        process.exit(1);
    }

    return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

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

function runMigration(databaseName, sqlFile, isLocal = false) {
    const flag = isLocal ? "--local" : "--remote";
    const command = `pnpm dlx wrangler d1 execute ${databaseName} ${flag} --file=${sqlFile}`;



    console.log(`📦 Executing: ${command}`);

    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ Applied ${sqlFile}`);
    } catch (error) {
        console.error(`❌ Failed to apply ${sqlFile}:`, error.message);
        throw error;
    }
}

function main() {
    const isLocal = process.argv.includes('--local');
    const config = loadD1Config();
    const migrationFiles = getMigrationFiles();

    if (migrationFiles.length === 0) {
        console.log("✨ No migrations to apply.");
        return;
    }

    console.log(`🚀 Applying ${migrationFiles.length} migration(s) to ${config.database_name} (${isLocal ? 'local' : 'remote'})`);

    for (const file of migrationFiles) {
        runMigration(config.database_name, file, isLocal);
    }

    console.log("🎉 All migrations applied successfully!");
}

main();