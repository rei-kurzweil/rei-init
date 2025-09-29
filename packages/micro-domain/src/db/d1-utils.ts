import * as fs from "fs";
import * as path from "path";

export interface D1DatabaseConfig {
  binding: string;
  database_name: string;
  database_id: string;
}

export interface WranglerConfig {
  name: string;
  d1_databases?: D1DatabaseConfig[];
}

/**
 * Find and parse wrangler.jsonc configuration from current or parent directories
 */
export function findWranglerConfig(startDir: string = process.cwd()): WranglerConfig | null {
  let currentDir = startDir;
  const maxDepth = 5;
  let depth = 0;

  while (depth < maxDepth) {
    const wranglerPath = path.join(currentDir, "wrangler.jsonc");
    if (fs.existsSync(wranglerPath)) {
      try {
        const content = fs.readFileSync(wranglerPath, "utf-8");
        // Simple JSONC parser - remove comments and trailing commas
        const cleanContent = content
          .replace(/\/\*[\s\S]*?\*\//g, "") // Remove /* */ comments
          .replace(/\/\/.*$/gm, "") // Remove // comments
          .replace(/,(\s*[}\]])/g, "$1"); // Remove trailing commas
        return JSON.parse(cleanContent);
      } catch (error) {
        console.warn(`Failed to parse wrangler.jsonc at ${wranglerPath}:`, error);
      }
    }
    
    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) break; // Reached root
    currentDir = parentDir;
    depth++;
  }
  
  return null;
}

/**
 * Get the primary D1 database configuration
 */
export function getD1Config(): D1DatabaseConfig | null {
  const wranglerConfig = findWranglerConfig();
  return wranglerConfig?.d1_databases?.[0] || null;
}

/**
 * Generate wrangler commands for D1 migrations
 */
export function generateD1Commands(migrationSqlPath: string): string[] {
  const d1Config = getD1Config();
  if (!d1Config) {
    throw new Error("No D1 database configuration found in wrangler.jsonc");
  }

  return [
    // Local development
    `wrangler d1 execute ${d1Config.database_name} --local --file=${migrationSqlPath}`,
    
    // Remote deployment
    `wrangler d1 execute ${d1Config.database_name} --remote --file=${migrationSqlPath}`,
  ];
}

/**
 * Generate migration SQL files from Drizzle migration folder
 */
export function getMigrationFiles(migrationsDir: string = "./migrations"): string[] {
  if (!fs.existsSync(migrationsDir)) {
    return [];
  }
  
  return fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .map(file => path.join(migrationsDir, file))
    .sort();
}

export default {
  findWranglerConfig,
  getD1Config,
  generateD1Commands,
  getMigrationFiles,
};