# SkillLink - Kids Learning App

## Overview
A full-stack kids learning/gamification app for ages 6–12. Features gamified quests, origami paper crafts, skill courses, badges, leaderboard, and a parent dashboard. Backed by a PostgreSQL database with an Express REST API.

## Architecture

### Frontend
- React 18 + TypeScript + Vite 5 (dev server on port 5000)
- Tailwind CSS v4, Radix UI, Recharts, Lucide React
- All state in `src/App.tsx`; navigation via `currentScreen` string switch

### Backend
- Express + TypeScript API server (port 3001, run via `tsx`)
- PostgreSQL (Replit built-in) accessed via `pg` Pool
- Vite proxies `/api/*` → `http://localhost:3001`
- Both servers started together by `npm run dev` (via `concurrently`)

### Auth / Identity
- Real signup/login: `POST /api/auth/signup` and `POST /api/auth/login` (username+password stored in DB)
- Signup requires a unique `username_handle` (3–20 chars, letters/numbers/underscore)
- Login looks up by `username_handle` and verifies `password_hash` (plaintext for demo)
- On successful auth, the DB `user` row is returned; `dbUserId` flows through to App state
- Fallback: device UUID in `localStorage` (`skilllink-device-id`) via `syncUser()` for anonymous users

## Project Structure
```
/
├── server/
│   ├── db.ts           — pg Pool singleton
│   └── index.ts        — Express API (all routes inline)
├── src/
│   ├── lib/
│   │   └── api.ts      — typed fetch wrappers for all API endpoints
│   ├── components/     — all screen components
│   ├── App.tsx         — main app + routing + state
│   ├── main.tsx        — entry point
│   └── index.css       — global styles
├── public/
│   └── paper-crafts-header.mp4
├── vite.config.ts      — proxy /api → 3001, port 5000
└── package.json        — "dev" runs concurrently (tsx server + vite)
```

## Database Schema (PostgreSQL)
| Table | Purpose |
|-------|---------|
| `users` | Profiles, sc_coins, xp, level, streak, `username_handle` (unique), `password_hash` |
| `quest_completions` | Quest history with status (completed / pending_approval / approved / rejected) |
| `coin_transactions` | Full audit log of every SC Coin change |
| `course_progress` | Per-user per-course step_index + completion flag |
| `parental_controls` | Screen time, content filter, quest approval toggle per child |
| `leaderboard_snapshots` | Daily snapshots (optional, for trend charts) |
| `friends` | requester_id, addressee_id, status (pending/accepted/declined) |

## API Routes (`/api/*`)
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Liveness check |
| POST | `/users/sync` | Get-or-create user by device_id |
| GET | `/users/:id` | Fetch user row |
| POST | `/users/:id/coins` | Award or spend SC Coins (atomic) |
| GET | `/users/:id/transactions` | Coin transaction history |
| GET | `/users/:id/quests` | Quest completion history |
| POST | `/users/:id/quests` | Record quest completion + award coins |
| PATCH | `/quests/:id/status` | Parent approves / rejects pending quest |
| GET | `/quests/pending` | All pending submissions (for parent dashboard) |
| GET | `/users/:id/courses` | Course progress list |
| PUT | `/users/:id/courses/:courseId` | Upsert course progress |
| GET | `/parental-controls` | Fetch controls for a parent |
| PUT | `/parental-controls` | Upsert parental control settings |
| GET | `/leaderboard` | Top 20 kids by SC Coins |
| POST | `/users/:id/xp` | Add XP and recalculate level |

## Running the App
```bash
npm run dev          # starts both API (3001) and Vite (5000) together
npm run dev:api      # API only
npm run dev:vite     # Vite only
npm run build        # Vite production build → build/
```

## Key Screens & Features

### HomeScreen
- Stats cards (Points, Streak, Badges) are clickable → Statistics/Badges screens
- Streak Reminder banner after 5pm if no quests done that day
- Quick action tiles: Quests, Courses, Skill Tree, Statistics

### StatisticsScreen
- Weekly activity bar chart, skill breakdown, summary cards, recent achievements

### PaperCraftsScreen
- Video header (`paper-crafts-header.mp4`) with iPad autoplay fix
- 7 origami tutorials by difficulty (Easy / Intermediate / Advanced)
- SC Coin badge uses `<SkillCoin>` component (not Star icon)

### CleanRoomQuestScreen (Hero Quest — quest id 16)
- 7 interactive sub-tasks, Cleanliness Meter, Speed Clean Timer (+15 bonus)
- On complete: calls `/api/users/:id/quests` to persist and award coins

### DailyQuestScreen
- Age-based quest pool from `DailyQuestAssigner`
- Quest 16 ("Clean and organize your room") → CleanRoomQuestScreen

### ParentDashboardScreen
- Views child profile, video submissions, and pending quest approvals
- Parental controls (screen time, content filter, purchase approval) saved to DB

### ShopScreen
- Purchases deduct SC Coins via `spendCoins()` → `/api/users/:id/coins`

### LeaderboardScreen
- Live data from `/api/leaderboard`

### ProfileSetupScreen
- Two-step: Info (name + age) → Emoji Avatar Picker (30 kid / 20 parent emojis)

## Navigation Routes
- `home`, `quests`, `quest-detail`, `challenge-mode`
- `badges`, `badge-detail`, `leaderboard`, `messages`
- `profile`, `shop`, `skill-tree`, `settings`
- `courses`, `course-list`, `course-detail`
- `statistics`, `paper-crafts`, `clean-room-quest`
- `parent`, `child-profile`, `video-reviews`
- `creator`, `creator-course-create/edit/analytics`
- `subscription`

## SC Coin Flow
1. App loads → `syncUser()` → `setUserPoints(user.sc_coins)` (DB is authoritative)
2. Quest complete → `completeQuest()` → DB awards coins → `setUserPoints(sc_coins)`
3. Shop purchase → `spendCoins()` → DB deducts coins → `setUserPoints(sc_coins)`
4. All changes logged in `coin_transactions` table

## Capacitor (iOS)
- appId: `com.skilllink.app`, webDir: `build`
- `codemagic.yaml` at repo root: npm ci → npm build → cap sync → unsigned xcodebuild → IPA
