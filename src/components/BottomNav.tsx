import { Home, ListTodo, Trophy, BookOpen, User } from 'lucide-react';
import { useTranslation, Language } from './translations';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  language?: Language;
}

export function BottomNav({ currentScreen, onNavigate, language = 'en' }: BottomNavProps) {
  const t = useTranslation(language);
  
  const navItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'quests', label: t.quests, icon: ListTodo },
    { id: 'courses', label: t.courses, icon: BookOpen },
    { id: 'leaderboard', label: t.leaderboard, icon: Trophy },
    { id: 'profile', label: t.profile, icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border px-2 py-2 max-w-3xl mx-auto shadow-lg z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground scale-105'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon size={22} strokeWidth={2.5} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
