import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Sparkles, Lock, Timer } from 'lucide-react';
import { Progress } from './ui/progress';
import { UserProfile } from './ProfileSetupScreen';
import { getDailyQuestSelection } from './DailyQuestAssigner';
import { useTranslation, Language } from './translations';
import { SkillCoin } from './CurrencyIcons';

const MAX_DAILY_QUESTS = 5;

interface DailyQuestScreenProps {
  onQuestSelect?: (questId: number) => void;
  userProfile?: UserProfile | null;
  assignedQuests?: any[];
  onQuestsRefresh?: (quests: any[]) => void;
  language?: Language;
  completedQuestIds?: number[];
}

export function DailyQuestScreen({ onQuestSelect, userProfile, completedQuestIds = [], language = 'en' }: DailyQuestScreenProps) {
  const t = useTranslation(language);

  // Exactly 5 quests for today — deterministic daily seed
  const todayQuests = getDailyQuestSelection(userProfile?.age || 9);

  // Always derived from the live completedQuestIds prop — never stale
  const quests = todayQuests.map(q => ({ ...q, completed: completedQuestIds.includes(q.id) }));
  const dailyCount = quests.filter(q => q.completed).length;
  const totalPoints = quests.filter(q => q.completed).reduce((sum, q) => sum + q.points, 0);
  const progress = Math.min((dailyCount / MAX_DAILY_QUESTS) * 100, 100);
  const remainingSlots = Math.max(0, MAX_DAILY_QUESTS - dailyCount);

  // Live countdown to LOCAL midnight (feels natural — same as when the day changes on the device)
  const getMsUntilMidnight = () => {
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); // next local midnight
    return nextMidnight.getTime() - now.getTime();
  };
  const formatCountdown = (ms: number) => {
    const total = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
  };
  const [countdown, setCountdown] = useState(() => formatCountdown(getMsUntilMidnight()));

  useEffect(() => {
    const tick = setInterval(() => {
      const ms = getMsUntilMidnight();
      setCountdown(formatCountdown(ms));
      if (ms <= 1000) window.location.reload();
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // Border colour by difficulty (not category)
  const getBorderStyle = (difficulty: string, isCompleted: boolean, isLocked: boolean) => {
    if (isCompleted) return 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30';
    if (isLocked)    return 'border-slate-200 dark:border-slate-700 opacity-50 cursor-not-allowed';
    const borders: Record<string, string> = {
      beginner:     'border-green-300 hover:border-green-400 hover:shadow-lg cursor-pointer',
      intermediate: 'border-orange-400 hover:border-orange-500 hover:shadow-lg cursor-pointer',
      advanced:     'border-red-400   hover:border-red-500   hover:shadow-lg cursor-pointer',
    };
    return borders[difficulty] ?? borders.beginner;
  };

  const getDifficultyStyle = (difficulty: string) => {
    const styles: Record<string, { label: string; badgeColor: string; icon: string; sc: number }> = {
      beginner:     { label: 'Beginner',     badgeColor: 'bg-green-500',  icon: '⭐',      sc: 5  },
      intermediate: { label: 'Intermediate', badgeColor: 'bg-orange-500', icon: '⭐⭐',    sc: 10 },
      advanced:     { label: 'Advanced',     badgeColor: 'bg-red-500',    icon: '⭐⭐⭐',  sc: 15 },
    };
    return styles[difficulty] ?? styles.beginner;
  };

  return (
    <div className="h-full bg-background pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <h2 className="text-white mb-2">{t.todaysMissions}</h2>
        <p className="text-white/80 mb-4">{t.completeMissions}</p>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {userProfile && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
              <p className="text-white text-sm">🎯 Age {userProfile.age}</p>
            </div>
          )}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-flex items-center gap-2">
            <Timer size={14} className="text-white" />
            <p className="text-white text-sm">Resets in {countdown}</p>
          </div>
        </div>

        {/* Daily progress bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">Daily Quests</span>
            <span className="text-white font-bold">{dailyCount}/{MAX_DAILY_QUESTS}</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/30 mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-white/80 text-sm">
              {remainingSlots > 0
                ? `${remainingSlots} quest${remainingSlots !== 1 ? 's' : ''} remaining today`
                : '🎉 Daily limit reached!'}
            </span>
            <div className="flex items-center gap-1 bg-yellow-400 rounded-xl py-1.5 px-3">
              <SkillCoin size={14} />
              <span className="text-yellow-900 text-sm font-bold">{totalPoints} SC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Countdown banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-4 mb-5 shadow-md flex items-center gap-3">
          <Timer className="text-white flex-shrink-0" size={20} />
          <div>
            <p className="text-white font-bold text-sm">Quests refresh in {countdown}</p>
            <p className="text-blue-100 text-xs mt-0.5">New quests unlock every day at midnight 🌟</p>
          </div>
        </div>

        {/* Daily limit reached banner */}
        {dailyCount >= MAX_DAILY_QUESTS && (
          <div className="bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-300 dark:border-orange-700 rounded-2xl p-4 mb-5 text-center">
            <p className="text-orange-700 dark:text-orange-300 font-bold">🏆 You've completed your 5 quests for today!</p>
            <p className="text-orange-600 dark:text-orange-400 text-sm mt-1">Amazing work — come back tomorrow for new quests.</p>
          </div>
        )}

        {/* Difficulty key */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium">Difficulty:</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-green-400 inline-block" /> Beginner</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-orange-400 inline-block" /> Intermediate</span>
          <span className="flex items-center gap-1 text-xs"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> Advanced</span>
        </div>

        {/* The 5 daily quests — flat list */}
        <div className="space-y-3 mb-6">
          {quests.map((quest, index) => {
            const isCompleted = quest.completed;
            const isLocked    = !isCompleted && dailyCount >= MAX_DAILY_QUESTS;
            const diff        = getDifficultyStyle(quest.difficulty);

            return (
              <div
                key={quest.id}
                className={`bg-card rounded-2xl p-4 shadow-md border-2 transition-all ${getBorderStyle(quest.difficulty, isCompleted, isLocked)}`}
                onClick={() => { if (!isLocked) onQuestSelect?.(quest.id); }}
              >
                <div className="flex items-center gap-3">
                  {/* Step number / lock / check */}
                  <div className={`flex items-center justify-center w-9 h-9 rounded-full font-bold flex-shrink-0 ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isLocked    ? 'bg-slate-200 dark:bg-slate-700' :
                                  'bg-primary text-primary-foreground'
                  }`}>
                    {isCompleted ? '✓' : isLocked ? <Lock size={14} className="text-slate-400" /> : <span className="text-sm">{index + 1}</span>}
                  </div>

                  {/* Icon */}
                  <div className="text-3xl flex-shrink-0">{quest.icon}</div>

                  {/* Title + badges */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold leading-snug ${
                      isCompleted ? 'line-through text-muted-foreground' :
                      isLocked    ? 'text-muted-foreground' : 'text-foreground'
                    }`}>
                      {quest.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <Badge className={`${diff.badgeColor} text-white text-xs px-2 py-0`}>{diff.label}</Badge>
                      {quest.verifyType === 'film'
                        ? <Badge className="bg-sky-500 text-white text-xs px-2 py-0">📹 Film it</Badge>
                        : <Badge className="bg-violet-500 text-white text-xs px-2 py-0">✅ Parent approves</Badge>
                      }
                    </div>
                  </div>

                  {/* SC + XP rewards */}
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className={`flex items-center gap-1 rounded-full px-2.5 py-1 ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}>
                      <SkillCoin size={11} />
                      <span className="text-white text-xs font-bold">+{quest.points} SC</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full px-2.5 py-1 bg-purple-500">
                      <span className="text-white text-xs font-bold">+{quest.points * 4} XP</span>
                    </div>
                  </div>
                </div>

                {/* Locked explanation */}
                {isLocked && (
                  <p className="mt-2 ml-12 text-xs text-muted-foreground">
                    You've completed your 5 quests for today! Come back tomorrow.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom celebration / bonus card */}
        {dailyCount >= MAX_DAILY_QUESTS ? (
          <div className="mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-white font-bold mb-2">Amazing Job!</h3>
            <p className="text-green-100 mb-3">You completed all {MAX_DAILY_QUESTS} quests today!</p>
            <div className="bg-white rounded-2xl py-2 px-4 inline-block">
              <span className="text-green-700 font-bold">+50 Bonus SC Earned! ✨</span>
            </div>
          </div>
        ) : dailyCount > 0 ? (
          <div className="mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-5 text-center shadow-lg">
            <Sparkles className="text-white mx-auto mb-2" size={28} />
            <p className="text-white font-bold">{t.bonusChallenge}</p>
            <p className="text-yellow-100 text-sm mt-1">
              Complete all {MAX_DAILY_QUESTS} quests today for a bonus!
            </p>
            <div className="bg-white rounded-2xl py-2 px-4 inline-block mt-3">
              <span className="text-orange-600 font-bold">+50 {t.bonusPoints} 🎉</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
