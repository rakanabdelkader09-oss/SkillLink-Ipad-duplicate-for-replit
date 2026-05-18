import { useState } from 'react';
import { Badge } from './ui/badge';
import { Star, Sparkles, ChevronRight, RefreshCw, Lock } from 'lucide-react';
import { Progress } from './ui/progress';
import { UserProfile } from './ProfileSetupScreen';
import { getAllAgeAppropriateQuests, getDailyCompletedCount, incrementDailyCompletedCount } from './DailyQuestAssigner';
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

interface Quest {
  id: number;
  title: string;
  icon: string;
  points: number;
  completed: boolean;
  category: string;
  color: string;
  minAge: number;
  maxAge: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export function DailyQuestScreen({ onQuestSelect, userProfile, completedQuestIds = [], language = 'en' }: DailyQuestScreenProps) {
  const t = useTranslation(language);

  const allQuests = getAllAgeAppropriateQuests(userProfile?.age || 9).map(q => ({
    ...q,
    completed: completedQuestIds.includes(q.id),
  }));

  const [dailyCount, setDailyCount] = useState(() => getDailyCompletedCount());

  const completedCount = allQuests.filter(q => q.completed).length;
  const totalPoints = allQuests.filter(q => q.completed).reduce((sum, q) => sum + q.points, 0);
  const progress = MAX_DAILY_QUESTS > 0 ? Math.min((dailyCount / MAX_DAILY_QUESTS) * 100, 100) : 0;
  const remainingSlots = Math.max(0, MAX_DAILY_QUESTS - dailyCount);

  const getCategoryColor = (color: string, type: 'border' | 'bg' | 'text') => {
    const colors: any = {
      blue:   { border: 'border-blue-200',   bg: 'bg-blue-100',   text: 'text-blue-700' },
      orange: { border: 'border-orange-200', bg: 'bg-orange-100', text: 'text-orange-700' },
      purple: { border: 'border-purple-200', bg: 'bg-purple-100', text: 'text-purple-700' },
      pink:   { border: 'border-pink-200',   bg: 'bg-pink-100',   text: 'text-pink-700' },
      red:    { border: 'border-red-200',    bg: 'bg-red-100',    text: 'text-red-700' },
    };
    return colors[color]?.[type] || colors.blue[type];
  };

  const getDifficultyStyle = (difficulty: string) => {
    const styles: Record<string, { label: string; color: string; icon: string; sc: number }> = {
      beginner:     { label: 'Beginner',     color: 'bg-green-500',  icon: '⭐',    sc: 5  },
      intermediate: { label: 'Intermediate', color: 'bg-yellow-500', icon: '⭐⭐',  sc: 10 },
      advanced:     { label: 'Advanced',     color: 'bg-orange-500', icon: '⭐⭐⭐', sc: 15 },
    };
    return styles[difficulty] || styles.beginner;
  };

  // Group quests by difficulty
  const beginnerQuests     = allQuests.filter(q => q.difficulty === 'beginner');
  const intermediateQuests = allQuests.filter(q => q.difficulty === 'intermediate');
  const advancedQuests     = allQuests.filter(q => q.difficulty === 'advanced');

  const nextQuest = allQuests.find(q => !q.completed) || null;

  const handleQuestClick = (questId: number, isCompleted: boolean) => {
    if (!isCompleted && dailyCount >= MAX_DAILY_QUESTS) return;
    onQuestSelect?.(questId);
  };

  const QuestCard = ({ quest, index }: { quest: Quest; index: number }) => {
    const isCompleted = quest.completed;
    const isLocked = !isCompleted && dailyCount >= MAX_DAILY_QUESTS;
    const style = getDifficultyStyle(quest.difficulty);

    return (
      <div
        className={`bg-card rounded-2xl p-4 shadow-md border-2 transition-all ${
          isCompleted
            ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30'
            : isLocked
            ? 'border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed'
            : `${getCategoryColor(quest.color, 'border')} hover:border-primary hover:shadow-lg cursor-pointer`
        }`}
        onClick={() => !isLocked && handleQuestClick(quest.id, isCompleted)}
      >
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isCompleted ? 'bg-green-500 text-white' :
            isLocked    ? 'bg-slate-300 dark:bg-slate-600' :
                          'bg-primary text-primary-foreground'
          }`}>
            {isCompleted ? '✓' : isLocked ? <Lock size={16} className="text-white" /> : index + 1}
          </div>

          <div className="flex items-center gap-4 flex-1">
            <div className={`flex items-center justify-center w-12 h-12 ${getCategoryColor(quest.color, 'bg')} rounded-2xl text-2xl`}>
              {quest.icon}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${isCompleted ? 'line-through text-muted-foreground' : isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                {quest.title}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge className={`${style.color} text-white text-xs px-2 py-0`}>
                  {style.label}
                </Badge>
                <span className="text-xs text-muted-foreground">{style.icon}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}>
                <SkillCoin size={12} />
                <span className="text-white text-xs font-bold">{quest.points}</span>
              </div>
              {!isLocked && <ChevronRight className="text-muted-foreground" size={18} />}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const QuestGroup = ({ title, quests, color }: { title: string; quests: Quest[]; color: string }) => {
    if (quests.length === 0) return null;
    return (
      <div className="mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-white text-sm font-bold mb-3 ${color}`}>
          {title} ({quests.filter(q => q.completed).length}/{quests.length})
        </div>
        <div className="space-y-3">
          {quests.map((quest, i) => <QuestCard key={quest.id} quest={quest} index={i} />)}
        </div>
      </div>
    );
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
            <RefreshCw size={14} className="text-white" />
            <p className="text-white text-sm">Resets at Midnight</p>
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
              {remainingSlots > 0 ? `${remainingSlots} quest${remainingSlots !== 1 ? 's' : ''} remaining today` : '🎉 Daily limit reached!'}
            </span>
            <div className="flex items-center gap-1 bg-yellow-400 rounded-xl py-1.5 px-3">
              <Star size={16} className="text-yellow-700" fill="currentColor" />
              <span className="text-yellow-900 text-sm font-bold">{totalPoints} SC</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Daily Refresh Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-5 mb-6 shadow-md">
          <div className="flex items-center gap-3">
            <RefreshCw className="text-white flex-shrink-0" size={22} />
            <div>
              <p className="text-white font-bold text-sm">Quests refresh every day!</p>
              <p className="text-blue-100 text-xs mt-0.5">Come back tomorrow for brand-new quests 🌟</p>
            </div>
          </div>
        </div>

        {/* Daily Limit Warning */}
        {dailyCount >= MAX_DAILY_QUESTS && (
          <div className="bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-300 dark:border-orange-700 rounded-2xl p-4 mb-6 text-center">
            <p className="text-orange-700 dark:text-orange-300 font-bold">🏆 You've completed {dailyCount} quests today!</p>
            <p className="text-orange-600 dark:text-orange-400 text-sm mt-1">Amazing work! Come back tomorrow for more.</p>
          </div>
        )}

        {/* Suggested Quest (next incomplete) */}
        {nextQuest && dailyCount < MAX_DAILY_QUESTS && (
          <div className="mb-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <Sparkles className="text-white" size={24} />
              <h3 className="text-white font-bold">Suggested Quest</h3>
            </div>
            <div className="bg-white rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleQuestClick(nextQuest.id, false)}>
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-14 h-14 ${getCategoryColor(nextQuest.color, 'bg')} rounded-2xl text-3xl flex-shrink-0`}>
                  {nextQuest.icon}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-semibold mb-1">{nextQuest.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyStyle(nextQuest.difficulty).color} text-white text-xs`}>
                      {getDifficultyStyle(nextQuest.difficulty).label}
                    </Badge>
                    <div className="flex items-center gap-1 bg-primary rounded-full px-2 py-0.5">
                      <SkillCoin size={12} />
                      <span className="text-white text-xs font-bold">+{nextQuest.points} SC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grouped Quest Lists */}
        <QuestGroup title="⭐ Beginner — 5 SC"     quests={beginnerQuests}     color="bg-green-500"  />
        <QuestGroup title="⭐⭐ Intermediate — 10 SC" quests={intermediateQuests} color="bg-yellow-500" />
        <QuestGroup title="⭐⭐⭐ Advanced — 15 SC"   quests={advancedQuests}     color="bg-orange-500" />

        {/* Bonus Challenge / All-complete celebration */}
        {dailyCount > 0 && dailyCount < MAX_DAILY_QUESTS && (
          <div className="mt-4 mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 text-center shadow-lg">
            <Sparkles className="text-white mx-auto mb-2" size={32} />
            <h3 className="text-white font-bold mb-2">{t.bonusChallenge}</h3>
            <p className="text-yellow-100 mb-3 text-sm">Complete {MAX_DAILY_QUESTS} quests today for a bonus!</p>
            <div className="bg-white rounded-2xl py-2 px-4 inline-block">
              <span className="text-orange-600 font-bold">+50 {t.bonusPoints} 🎉</span>
            </div>
          </div>
        )}

        {dailyCount >= MAX_DAILY_QUESTS && (
          <div className="mt-4 mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-white font-bold mb-2">Amazing Job!</h3>
            <p className="text-green-100 mb-3">You completed all {MAX_DAILY_QUESTS} quests today!</p>
            <div className="bg-white rounded-2xl py-2 px-4 inline-block">
              <span className="text-green-700 font-bold">+50 Bonus SC Earned! ✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
