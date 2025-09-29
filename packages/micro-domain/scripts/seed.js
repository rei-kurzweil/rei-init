#!/usr/bin/env node
/**
 * Seed the database with initial data
 * Can be used for both local SQLite and D1 databases
 */

import * as fs from "fs";
import { execSync } from "child_process";

function loadD1Config() {
  const configPath = "./d1.config.json";
  if (!fs.existsSync(configPath)) {
    console.log("⚠️ d1.config.json not found. Will only seed local database.");
    return null;
  }
  
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
}

function seedLocal() {
  console.log("🌱 Seeding local database...");
  
  try {
    // Import better-sqlite3 dynamically since this is a .js file
    import("better-sqlite3").then(({ default: Database }) => {
      const dbPath = process.env.DB_PATH || "./local.db";
      const db = new Database(dbPath);
      
      const seedSql = fs.readFileSync("./migrations/0001_seed_data.sql", "utf-8");
      db.exec(seedSql);
      
      db.close();
      console.log("✅ Local database seeded successfully!");
    });
  } catch (error) {
    console.error("❌ Failed to seed local database:", error.message);
  }
}

function seedD1(config, isLocal = false) {
  const flag = isLocal ? "--local" : "--remote";
  const command = `wrangler d1 execute ${config.database_name} ${flag} --file=./migrations/0001_seed_data.sql`;
  
  console.log(`🌱 Seeding D1 database (${isLocal ? 'local' : 'remote'})...`);
  console.log(`📦 Executing: ${command}`);
  
  try {
    execSync(command, { stdio: 'inherit' });
    console.log("✅ D1 database seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed D1 database:", error.message);
  }
}

function main() {
  const args = process.argv.slice(2);
  const isD1Local = args.includes('--d1-local');
  const isD1Remote = args.includes('--d1-remote');
  
  if (!isD1Local && !isD1Remote) {
    // Default: seed local SQLite
    seedLocal();
    return;
  }
  
  const d1Config = loadD1Config();
  if (!d1Config) {
    console.error("❌ D1 config required for D1 seeding. Create d1.config.json first.");
    process.exit(1);
  }
  
  if (isD1Local) {
    seedD1(d1Config, true);
  }
  
  if (isD1Remote) {
    seedD1(d1Config, false);
  }
}

main();