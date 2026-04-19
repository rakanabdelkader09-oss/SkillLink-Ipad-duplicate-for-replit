import { Sparkles, Calendar } from 'lucide-react';

export interface WeeklyEvent {
  theme: string;
  emoji: string;
  description: string;
  color: string;
  focusCategory: string;
}

interface WeeklyEventBannerProps {
  event: WeeklyEvent;
  onClick?: () => void;
}

export function WeeklyEventBanner({ event, onClick }: WeeklyEventBannerProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-gradient-to-r ${event.color} rounded-3xl p-5 shadow-lg mb-6 transform hover:scale-105 transition-all`}
    >
      <div className="flex items-center gap-5 mb-3">
        <div className="bg-white/30 backdrop-blur-sm rounded-full p-2">
          <Calendar className="text-white" size={20} />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-white">This Week's Event</h3>
          <p className="text-white/90 text-sm">{event.theme}</p>
        </div>
        <div className="text-4xl">{event.emoji}</div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sparkles className="text-yellow-300" size={20} />
            <span className="text-white">2x Points on {event.focusCategory} quests!</span>
          </div>
        </div>
      </div>
      
      <p className="text-white/80 text-sm mt-3">{event.description}</p>
    </button>
  );
}

// Weekly event rotation
export const weeklyEvents: WeeklyEvent[] = [
  {
    theme: 'Kindness Week',
    emoji: '💝',
    description: 'Spread kindness and earn double points on all Social Skills quests!',
    color: 'from-pink-400 to-red-400',
    focusCategory: 'Social Skills'
  },
  {
    theme: 'Clean Up Week',
    emoji: '🧹',
    description: 'Keep things tidy and earn double points on all Responsibility quests!',
    color: 'from-orange-400 to-yellow-400',
    focusCategory: 'Responsibility'
  },
  {
    theme: 'Learning Week',
    emoji: '📚',
    description: 'Feed your mind and earn double points on all Learning quests!',
    color: 'from-purple-400 to-indigo-400',
    focusCategory: 'Learning'
  },
  {
    theme: 'Creative Week',
    emoji: '🎨',
    description: 'Express yourself and earn double points on all Creativity quests!',
    color: 'from-pink-400 to-purple-400',
    focusCategory: 'Creativity'
  },
  {
    theme: 'Wellness Week',
    emoji: '💪',
    description: 'Take care of yourself and earn double points on all Personal Care quests!',
    color: 'from-blue-400 to-cyan-400',
    focusCategory: 'Personal Care'
  }
];

// Get current week's event (cycles through events)
export function getCurrentWeekEvent(): WeeklyEvent {
  const weekNumber = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  return weeklyEvents[weekNumber % weeklyEvents.length];
}
