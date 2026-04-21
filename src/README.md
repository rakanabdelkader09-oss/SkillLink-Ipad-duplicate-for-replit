# SkillLink - Turn Screen Time into Skill Time! ✨

A mobile app prototype for kids ages 6-12 focused on gamifying life skills and education through auto-assigned daily quests, self-directed courses, and rewards with built-in screen time tracking.

## Features

- 🎯 Auto-assigned daily quests (3-5 per day)
- 📚 Self-directed learning courses
- 🎮 Gamification with points and badges
- 📱 Screen time tracking (Brainrot Monitor)
- 👨‍👩‍👧 Parent dashboard with analytics
- 🎨 Creator platform for course monetization
- 🌍 Multi-language support (11 languages)

## Deployment

This project is configured for deployment on Netlify or Vercel.

### Deploy to Netlify

1. Push this repository to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings are already configured in `netlify.toml`
6. Click "Deploy site"

### Deploy to Vercel

1. Push this repository to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Settings are already configured in `vercel.json`
6. Click "Deploy"

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons
- Recharts for analytics

## Project Structure

```
/
├── src/
│   └── main.tsx          # Entry point
├── components/           # All React components
├── styles/
│   └── globals.css       # Global styles
├── App.tsx              # Main app component
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
└── netlify.toml         # Netlify configuration
```

## License

This is a prototype application.
