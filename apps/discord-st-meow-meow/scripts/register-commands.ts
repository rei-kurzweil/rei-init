import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.DISCORD_GUILD_ID;

if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or DISCORD_CLIENT_ID in .env');
  process.exit(1);
}

const commands = [
  new SlashCommandBuilder().setName('meow').setDescription('Get a meow'),
  new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
].map(c => c.toJSON());

async function main() {
  const rest = new REST({ version: '10' }).setToken(token!);

  try {
    if (guildId) {
      console.log('Refreshing guild (dev) application commands...');
      await rest.put(Routes.applicationGuildCommands(clientId!, guildId), { body: commands });
      console.log('Guild commands registered.');
    } else {
      console.log('Refreshing global application commands...');
      await rest.put(Routes.applicationCommands(clientId!), { body: commands });
      console.log('Global commands registered (may take up to an hour to propagate).');
    }
  } catch (err) {
    console.error('Failed to register commands:', err);
    process.exit(1);
  }
}

main();
