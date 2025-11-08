# @rei-init/multi-build-tui

Interactive TUI to select which build targets to run for `apps/rei-cast-xyz`.

- Arrow keys to move
- Space or mouse click to toggle
- `a` select all, `n` select none
- `s` save
- `q` quit (auto-saves)

## Files

- `multi-build-options.json`: declares available build targets and their scripts
- `multi-build-config.json`: stores your selections

## Usage

From repo root:

- Launch UI:

  pnpm run multi-build-tui

- Run builds according to config:

  pnpm run multi-build

Both commands build this package first. Requires Bun or Node to execute the compiled files. If using Node, replace `bun run` in root scripts accordingly.
