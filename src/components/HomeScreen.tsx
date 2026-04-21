import { useState, useEffect } from 'react';
import { Flame, Trophy, Sparkles, ListTodo, BookOpen, TrendingUp, Settings, Crown, Bell, BarChart2, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { UserProfile } from './ProfileSetupScreen';
import { SkillLevels } from './SkillTreeScreen';
import { WeeklyEventBanner, WeeklyEvent } from './WeeklyEventBanner';
import { ScreenTimeTracker } from './ScreenTimeTracker';
import { useTranslation, Language } from './translations';
import { SkillCoin } from './CurrencyIcons';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  userProfile: UserProfile | null;
  userPoints: number;
  skillLevels?: SkillLevels;
  weeklyEvent?: WeeklyEvent;
  language?: Language;
  assignedQuests?: any[];
}

function StreakReminderBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 flex items-center gap-5 shadow-lg mb-4 animate-pulse">
      <div className="bg-white/20 rounded-2xl p-2 flex-shrink-0">
        <Bell className="text-white" size={22} />
      </div>
      <div className="flex-1">
        <p className="text-white font-bold text-sm">Streak Reminder! 🔥</p>
        <p className="text-orange-100 text-xs">You haven't completed a quest today — don't break your 7-day streak!</p>
      </div>
      <button
        onClick={onDismiss}
        className="bg-white/20 rounded-full p-1.5 active:opacity-70 flex-shrink-0"
      >
        <X size={16} className="text-white" />
      </button>
    </div>
  );
}

export function HomeScreen({ onNavigate, userProfile, userPoints, skillLevels, weeklyEvent, language = 'en', assignedQuests = [] }: HomeScreenProps) {
  const t = useTranslation(language);
  const [showStreakBanner, setShowStreakBanner] = useState(false);

  const totalQuests = assignedQuests.length || 0;
  const completedQuests = assignedQuests.filter((q: any) => q.completed).length || 0;
  const questProgress = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  // Show streak reminder if no quests completed and after 5pm
  useEffect(() => {
    const hour = new Date().getHours();
    const hasCompletedToday = completedQuests > 0;
    const dismissed = sessionStorage.getItem('streak-reminder-dismissed');
    if (hour >= 17 && !hasCompletedToday && !dismissed) {
      setShowStreakBanner(true);
    }
  }, [completedQuests]);

  const dismissStreakBanner = () => {
    setShowStreakBanner(false);
    sessionStorage.setItem('streak-reminder-dismissed', '1');
  };

  const quickActions = [
    { id: 'quests', label: t.dailyQuests, icon: ListTodo, color: 'from-[#2563eb] to-[#1d4ed8]', count: totalQuests },
    { id: 'courses', label: t.courses, icon: BookOpen, color: 'from-purple-400 to-purple-500', count: '📚' },
    { id: 'skill-tree', label: 'Skill Tree', icon: TrendingUp, color: 'from-green-400 to-emerald-500', count: '🌟' },
    { id: 'statistics', label: 'Statistics', icon: BarChart2, color: 'from-indigo-400 to-indigo-600', count: '📈' },
  ];

  const recentBadges = [
    { name: 'Early Bird', emoji: '🌅' },
    { name: 'Creative', emoji: '🎨' },
    { name: 'Book Worm', emoji: '📚' },
  ];

  return (
    <div className="h-full bg-background pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-primary px-6 pt-12 pb-6 rounded-b-[3rem] shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-primary-foreground/80">{t.welcomeTo}</h3>
            <h2 className="text-primary-foreground font-bold">
              {userProfile?.name || 'Friend'}! {userProfile?.avatar || '👋'}
            </h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => onNavigate('settings')} className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl hover:bg-white/30 transition-all active:scale-90">
              <Settings className="text-primary-foreground" size={22} />
            </button>
            <button onClick={() => onNavigate('shop')} className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl hover:bg-white/30 transition-all active:scale-90">
              <Sparkles className="text-yellow-300" size={22} />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-5">
          <button
            onClick={() => onNavigate('statistics')}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <SkillCoin size={20} />
              <span className="text-white text-sm">{t.points}</span>
            </div>
            <p className="text-white text-2xl font-bold">{userPoints}</p>
          </button>
          <button
            onClick={() => onNavigate('statistics')}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="text-orange-400" size={20} />
              <span className="text-white text-sm">{t.streak}</span>
            </div>
            <p className="text-white text-2xl font-bold">7 {language === 'es' ? 'días' : language === 'fr' ? 'jours' : language === 'de' ? 'Tage' : language === 'ja' ? '日' : language === 'zh' ? '天' : 'days'}</p>
          </button>
          <button
            onClick={() => onNavigate('badges')}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center active:scale-95 transition-transform"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="text-yellow-300" size={20} />
              <span className="text-white text-sm">{t.badges}</span>
            </div>
            <p className="text-white text-2xl font-bold">12</p>
          </button>
        </div>
      </div>

      {/* Streak Reminder */}
      {showStreakBanner && (
        <div className="px-6 mt-4">
          <StreakReminderBanner onDismiss={dismissStreakBanner} />
        </div>
      )}

      {/* Go Premium Banner */}
      <div className="px-6 mt-5">
        <button
          onClick={() => onNavigate('subscription')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-6 flex items-center gap-4 shadow-lg active:scale-95 transition-transform"
        >
          <div className="bg-white/20 rounded-2xl p-2.5">
            <Crown className="text-yellow-300" size={24} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-white font-black text-base">Unlock Premium ✨</p>
            <p className="text-purple-100 text-xs">Base Plan from €6.99/mo — Cancel anytime</p>
          </div>
          <div className="bg-white text-purple-600 font-black text-xs px-3 py-1.5 rounded-full">
            See Plans
          </div>
        </button>
      </div>

      {/* Daily Progress */}
      <div className="px-6 mt-4">
        <div className="bg-card rounded-3xl p-5 shadow-md border-2 border-border">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-primary font-bold">{t.todaysProgress}</h3>
            <Badge className="bg-primary rounded-full">
              {completedQuests}/{totalQuests} {t.done}
            </Badge>
          </div>
          <Progress value={questProgress} className="h-3 bg-muted" />
          <p className="text-muted-foreground mt-2 text-sm">
            {completedQuests === totalQuests && totalQuests > 0
              ? '🎉 All quests complete! Amazing job!'
              : t.keepGoing + ' 🎉'}
          </p>
        </div>
      </div>

      {/* Weekly Event Banner */}
      {weeklyEvent && (
        <div className="px-6 mt-4">
          <WeeklyEventBanner event={weeklyEvent} onNavigate={onNavigate} />
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h3 className="text-foreground font-bold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-5">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.id)}
              className={`bg-gradient-to-br ${action.color} rounded-3xl p-5 text-left shadow-lg active:scale-95 transition-transform`}
            >
              <action.icon className="text-white mb-2" size={28} />
              <p className="text-white font-semibold text-sm">{action.label}</p>
              <div className="mt-2 bg-white/20 rounded-full px-2 py-0.5 inline-flex items-center">
                <span className="text-white text-xs">{action.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Screen Time */}
      <div className="px-6 mt-4">
        <ScreenTimeTracker />
      </div>

      {/* Recent Badges */}
      <div className="px-6 mt-4 mb-6">
        <h3 className="text-foreground font-bold mb-3">Recent Badges</h3>
        <div className="flex gap-5">
          {recentBadges.map((badge) => (
            <button
              key={badge.name}
              onClick={() => onNavigate('badges')}
              className="flex-1 bg-card border-2 border-border rounded-2xl p-5 text-center shadow-sm active:scale-95 transition-transform"
            >
              <div className="text-3xl mb-1">{badge.emoji}</div>
              <p className="text-xs text-muted-foreground">{badge.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
