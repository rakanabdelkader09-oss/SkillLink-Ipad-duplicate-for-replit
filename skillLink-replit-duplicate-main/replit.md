# SkillLink - Kids Learning App

## Overview
A React + Vite single-page application (SkillLink) — a kids learning/gamification app for ages 6–12, featuring gamified quests, origami paper crafts, skill courses, badges, leaderboard, and a parent dashboard.

## Project Structure
- Root `package.json` and `vite.config.ts` — main config for Replit
- `src/` — all application source code
  - `src/components/` — all screen components
  - `src/assets/` — images and static assets (including `skillcoin-new.png`)
  - `src/App.tsx` — main app component and routing
  - `src/main.tsx` — entry point
  - `src/index.css` — global styles
- `public/paper-crafts-header.mp4` — video header for Paper Crafts section

## Tech Stack
- React 18 + TypeScript
- Vite 6 (bundler/dev server)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Radix UI components
- Recharts, Lucide React, Sonner

## Running the App
The app runs on port 5000 via the "Start application" workflow.
```bash
npm run dev
```

## Key Screens & Features

### HomeScreen
- All stat cards (Points, Streak, Badges) are clickable and navigate to Statistics/Badges screens
- Streak Reminder banner shows after 5pm if no quests completed that day
- Quick action tiles: Quests, Courses, Skill Tree, **Statistics** (replaces old dead icon)
- Premium subscription banner

### StatisticsScreen (new)
- Full progress dashboard with weekly activity bar chart
- Skill breakdown with progress bars
- Summary cards (quests done, avg level, total XP, best streak)
- Recent achievements list
- Navigation: accessible from HomeScreen stats cards and Statistics quick action

### ProfileSetupScreen (updated)
- Two-step avatar setup: Info (name + age) → Emoji Avatar Picker
- 30 curated emoji avatars for kids, 20 for parents
- Selected emoji used as profile picture throughout app

### PaperCraftsScreen (new — priority section)
- Video header using `public/paper-crafts-header.mp4`
- 7 origami tutorials organized by difficulty: Easy (3) → Intermediate (2) → Advanced (2, locked)
- Step-by-step UI with YouTube thumbnail embeds and direct YouTube links
- Step selector chips, progress tracking, and individual step completion
- Back navigation to PaperCrafts course list

### CleanRoomQuestScreen (new — Hero Quest)
- 7 interactive sub-tasks with per-task point values (total 45 pts)
- Animated Cleanliness Meter filling as tasks are checked
- Optional Speed Clean Timer (10 min countdown) with +15 bonus pts
- Photo upload proof button (Camera capture)
- Celebration screen with star rating and total points earned

### CoursesScreen (updated)
- Age-based recommended courses (6–7, 8–10, 11–12) shown at top
- Paper Crafts featured prominently as a category
- Full category list with Paper Crafts, Creativity, Teamwork, etc.

### DailyQuestScreen (updated)
- Age-based quest pool from DailyQuestAssigner
- Spec-required quests added: Set Table, Tidy Toys, Simple Snack, Sort Laundry (ages 6-7),
  Help Prepare Meal, Plan Healthy Snack, Homework Streak (ages 8-10),
  Cook Meal Independently, Plan Next Day, Household Task Lead (ages 11-12)
- Quest 15 or 16 ("Clean and organize your room") routes to CleanRoomQuestScreen

### CurrencyIcons (updated)
- SkillCoin now uses the new attached gold coin image (`skillcoin-new.png`)

### ProfilePhotoScreen (`profile` route)
- Simple photo upload + 12 profile picture border designs

### ShopScreen
- Profile picture border designs purchasable with SkillCoins

### CourseDetailScreen
- Full step-by-step lesson architecture with YouTube embeds and quiz gates

### SubscriptionScreen
- Base Plan: €6.99/mo (1 child) | Family Plan: €12.99/mo

## Navigation Routes
- `home`, `quests`, `quest-detail`, `challenge-mode`
- `badges`, `badge-detail`, `leaderboard`, `messages`
- `profile`, `shop`, `skill-tree`, `settings`
- `courses`, `course-list`, `course-detail`
- `statistics` (new), `paper-crafts` (new), `clean-room-quest` (new)
- `parent`, `child-profile`, `video-reviews`
- `creator`, `creator-course-create/edit/analytics`
- `subscription`

## Migration Notes (Vercel → Replit)
- Changed dev server port from 3000 → 5000 and host to `0.0.0.0`
- Added `allowedHosts: true` to Vite server config for Replit's proxied iframe
- Updated `package.json` dev/preview scripts with explicit port and host flags
