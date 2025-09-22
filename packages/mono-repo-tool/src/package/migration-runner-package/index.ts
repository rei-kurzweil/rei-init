import fs from 'fs-extra';
import path, { dirname } from 'path';
import { execa } from 'execa';
import { initTSLibrary } from '../util.ts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);


/**
 * Initialize a Drizzle ORM D1 schema and migration runner package.
 * @param targetDir The target directory for the package contents to be created in.
 * @param name The name of the package.
 * 
 * 
 * This should install drizzle kit and set up a schema with users and items where users own items
 * This should create a bin folder with cli.ts for running migrations and generating types
 */
export async function init_DrizzleORM_D1_schema_and_migration_runner_package(targetDir: string, name: string) {
    // set up package with package.json and tsconfig.json
    initTSLibrary(targetDir, name, false)

    // make folder
    await fs.ensureDir(targetDir);

    // install drizzle kit
    await execa('pnpm', ['add', 'drizzle-orm', 'drizzle-kit'], { cwd: targetDir });

    // create bin folder
    await fs.ensureDir(path.join(targetDir, 'bin'));

    // create directories for migration i/o (ts -> sql)
    await fs.ensureDir(path.join(targetDir, 'src'));
    await fs.ensureDir(path.join(targetDir, 'migrations'));

    // get the drizzle.config.ts tempalte content:
    const drizzle_config_ts_template_content = await fs.readFile(path.join(__dirname, 'template', 'drizzle.config.ts'), 'utf-8');

    // create drizzle.config.ts
    await fs.writeFile(path.join(targetDir, 'drizzle.config.ts'), drizzle_config_ts_template_content);

    //create .env for secrets
    await fs.writeFile(path.join(targetDir, '.env'),
`CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_DATABASE_ID=your_database_id
CLOUDFLARE_D1_TOKEN=your_token`
    );

    // populate generic schema, also from the template folder:
    const schemaContent = await fs.readFile(path.join(__dirname, 'template', 'src', 'db', 'schema.ts'), 'utf-8');
    await fs.ensureDir(path.join(targetDir, 'src', 'db'));
    await fs.writeFile(path.join(targetDir, 'src', 'db', 'schema.ts'), schemaContent);

}