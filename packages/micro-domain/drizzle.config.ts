import { defineConfig } from "drizzle-kit";
import * as fs from "fs";
import * as path from "path";

function getDbConfig() {
    // Try to read local d1.config.json first
    const configPath = "./d1.config.json";
    let d1Config = null;

    if (fs.existsSync(configPath)) {
        try {
            d1Config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
            console.log(`Using D1 config: ${d1Config.database_name}`);
        } catch (error) {
            console.warn(`Failed to parse ${configPath}:`, error);
        }
    }

    // For local development, we use SQLite
    const localDbPath = process.env.DB_PATH || "./local.db";

    return {
        url: localDbPath,
    };
}

export default defineConfig({
    dialect: "sqlite",
    driver: 'd1-http',
    schema: "./src/db/schema.ts",

    out: "./migrations",
    dbCredentials: getDbConfig(),
});