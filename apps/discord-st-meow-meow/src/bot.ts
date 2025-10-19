import 'dotenv/config';
import { Client, GatewayIntentBits, Events, type Client as DiscordClient, type Interaction } from 'discord.js';

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('Missing DISCORD_TOKEN in .env');
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

client.once(Events.ClientReady, (c: DiscordClient<true>) => {
  console.log(`Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  if (commandName === 'meow') {
    await interaction.reply('🐱 meow~');
    return;
  }
  if (commandName === 'ping') {
    await interaction.reply('Pong!');
    return;
  }
});

client.login(token);
