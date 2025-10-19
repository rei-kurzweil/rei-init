# @rei-init/discord-st-meow-meow

A minimal Discord bot (Node.js + TypeScript) with a `/meow` slash command.

## Prerequisites
- Discord application with a bot user
- Node 18+ (or environment matching the monorepo)
- pnpm (monorepo uses workspaces)

## Setup
1. Copy `.env.example` to `.env` and fill values:
   - `DISCORD_TOKEN` – Bot token from Discord Developer Portal
   - `DISCORD_CLIENT_ID` – Application (client) ID
   - `DISCORD_GUILD_ID` – Optional guild ID for fast dev registration

2. Install deps from repo root:
   pnpm install

3. Register slash commands (guild-fast):
   pnpm --filter @rei-init/discord-st-meow-meow run register

4. Run the bot locally:
   pnpm --filter @rei-init/discord-st-meow-meow run dev

## Invite URL (example scope)
- OAuth2 URL: `https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=0&scope=bot%20applications.commands`
- Adjust permissions as needed (0 is minimal).

## Notes
- For production, build: `pnpm --filter @rei-init/discord-st-meow-meow run build` then `start`.
- The `register` script uses guild-scoped commands if `DISCORD_GUILD_ID` is set; otherwise it registers globally (slower propagation).
