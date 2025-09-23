# 🏗️ rei-init Microservices Architecture (Monolith-first)

This doc summarizes the current **service structure**, **routing priorities**, and **initial APIs** for the rei-init platform.  
The goal: **start monolithic**, **keep API boundaries explicit**, and **design for eventual distribution** (Durable Objects, WS, etc).

---

## 📦 Packages Overview

### Residential Services
| Service       | Purpose |
|--------------|-----------------------------------------|
| **micro-web** | Astro SSR + SSG frontend; exposes top-level routes, handles public profiles & item pages. All routes except `/api/**` come through here. |

---

### Authentication Services
| Service      | Purpose |
|-------------|-----------------------------------------|
| **micro-idp** | Identity provider, wraps Supabase Auth client SDK & SSO component. Issues JWT tokens for other services. |

---

### Core Domain Services
| Service      | Purpose |
|-------------|-----------------------------------------|
| **micro-user** | Core user model CRUD + REST API. |
| **micro-item** | CRUD for items (user-owned content). Metadata in **D1**; content in **KV**. Handles ownership checks, basic moderation hooks, GLB + markdown inspection hooks. |
| **micro-db**   | Shared Drizzle schema, migrations, and DB client. Imported by all core services. |

---

### Peripheral Social Services
| Service         | Purpose |
|----------------|--------------------------------------|
| **micro-follower** | Tracks following/follower relationships. |
| **micro-feed**     | Builds activity feeds from followers/items/events. |
| **micro-reaction** | Likes, emoji reacts, etc. |
| **micro-chat**     | Placeholder; experiments with **Durable Objects** + user sessions; depends on **micro-user**. |
| **micro-multiplayer-3d** | WIP; future real-time shared 3D world state sync. |

---

### Industrial Services
| Service                     | Purpose |
|----------------------------|--------------------------------------|
| **micro-llm**              | Future AI-assisted summarization, embeddings, search. |
| **micro-audio-waveform**   | Future: generate audio waveform previews. |
| **micro-distant-scenery-rendering** | WIP, procedural long-distance renders for 3D spaces. |

---

### Safety & Compliance Services
| Service               | Purpose |
|----------------------|--------------------------------------|
| **micro-moderation** | Moderation dashboard (SSR) + backend API. Handles reviewing system/user-flagged items. Receives events from `micro-item`, `micro-markdown-inspection`, etc. |
| **micro-glb-inspection** | Internal API to validate & parse GLB metadata. Called by `micro-item` on upload. |
| **micro-markdown-inspection** | Internal API to lint/validate markdown content on upload. Called by `micro-item`. |
| **micro-logging**     | Internal API to record structured logs for compliance, moderation, and auditability. |

---

## 🗂️ Routing Priorities (`micro-web`)

```txt
/                     → micro-web (SSR index)
/api/**               → direct to REST handlers (auth, items, users, etc.)
/terms-of-use         → SSR page
/signup               → SSR or SPA
/notifications        → SSR + API calls to micro-feed + micro-user
/moderation           → SSR dashboard backed by micro-moderation

/[user]               → resolve via D1.user.slug → SSR profile
/[user]/[item-id]     → resolve via D1.item.id → SSR item page
/[user]/[item-name]   → resolve via D1.item.slug → SSR item page
