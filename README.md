# Spark prototype

A small, dependency-free click-through prototype for **Spark**, a quiet daily intention practice.

The prototype offers two reviewer paths:

- **Core daily flow** (default): intention selection, confirmation, and optional next-visit reflection
- **First-time setup:** reminder preference and morning cue before continuing into the daily flow

Across those paths, the prototype covers four product states:

1. Reminder preference and morning cue
2. Daily intention selection
3. Selection confirmation
4. Optional next-day reflection

It is intentionally static: no account, backend, analytics, or persistence. Open `index.html` directly or serve the directory with any static web server.

Direct links can open either path:

- `?flow=daily&screen=today`
- `?flow=setup&screen=setup`

## GitHub Pages

This repository is designed to deploy directly from the `main` branch root with GitHub Pages. It contains only the original prototype concept and does not contain the source interview prompt or any restricted material.
