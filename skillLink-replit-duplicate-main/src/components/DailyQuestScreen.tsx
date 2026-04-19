import { useState, useMemo, useEffect } from 'react';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Star, Sparkles, ChevronRight, Heart, GraduationCap, Palette, Home, Users, RefreshCw, Lock } from 'lucide-react';
import { Progress } from './ui/progress';
import { UserProfile } from './ProfileSetupScreen';
import { assignDailyQuests, shouldRefreshQuests, getAllAgeAppropriateQuests } from './DailyQuestAssigner';
import { useTranslation, Language } from './translations';

interface DailyQuestScreenProps {
  onQuestSelect?: (questId: number) => void;
  userProfile?: UserProfile | null;
  assignedQuests?: any[];
  onQuestsRefresh?: (quests: any[]) => void;
  language?: Language;
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
  difficulty: 'easy' | 'medium' | 'hard';
}

export function DailyQuestScreen({ onQuestSelect, userProfile, assignedQuests: propAssignedQuests, onQuestsRefresh, language = 'en' }: DailyQuestScreenProps) {
  const t = useTranslation(language);
  const [lastRefreshDate, setLastRefreshDate] = useState<Date>(new Date());
  
  // Use ALL age-appropriate quests instead of just assigned ones
  // This allows kids to choose which quests to complete
  const initialQuests = getAllAgeAppropriateQuests(userProfile?.age || 9);
  
  const [allQuests, setAllQuests] = useState<Quest[]>(initialQuests);

  // Use all age-appropriate quests (kids can choose which ones to do)
  const quests = allQuests;

  const toggleQuest = (id: number) => {
    setAllQuests(allQuests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
  };

  const completedCount = quests.filter(q => q.completed).length;
  const totalPoints = quests.filter(q => q.completed).reduce((sum, q) => sum + q.points, 0);
  const progress = quests.length > 0 ? (completedCount / quests.length) * 100 : 0;
  
  // Find the next quest to complete (first incomplete quest)
  const nextQuestIndex = quests.findIndex(q => !q.completed);
  const nextQuest = nextQuestIndex >= 0 ? quests[nextQuestIndex] : null;

  const getCategoryColor = (color: string, type: 'border' | 'bg' | 'text') => {
    const colors: any = {
      blue: { border: 'border-blue-200', bg: 'bg-blue-100', text: 'text-blue-700' },
      orange: { border: 'border-orange-200', bg: 'bg-orange-100', text: 'text-orange-700' },
      purple: { border: 'border-purple-200', bg: 'bg-purple-100', text: 'text-purple-700' },
      pink: { border: 'border-pink-200', bg: 'bg-pink-100', text: 'text-pink-700' },
      red: { border: 'border-red-200', bg: 'bg-red-100', text: 'text-red-700' },
    };
    return colors[color]?.[type] || colors.blue[type];
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels = {
      easy: { text: 'Easy', color: 'bg-green-500', icon: '⭐' },
      medium: { text: 'Medium', color: 'bg-yellow-500', icon: '⭐⭐' },
      hard: { text: 'Hard', color: 'bg-orange-500', icon: '⭐⭐⭐' },
    };
    return labels[difficulty as keyof typeof labels] || labels.easy;
  };

  return (
    <div className="h-full bg-background pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <h2 className="text-white mb-2">{t.todaysMissions}</h2>
        <p className="text-white/80 mb-4">{t.completeMissions}</p>
        
        <div className="flex items-center gap-3 mb-4">
          {userProfile && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
              <p className="text-white text-sm">🎯 Age {userProfile.age}</p>
            </div>
          )}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block flex items-center gap-2">
            <RefreshCw size={14} className="text-white" />
            <p className="text-white text-sm">Resets at Midnight</p>
          </div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Progress</span>
            <span className="text-white">{completedCount}/{quests.length}</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/30 mb-3" />
          <div className="flex items-center justify-center gap-2 bg-yellow-400 rounded-xl py-2">
            <Star size={20} className="text-yellow-700" fill="currentColor" />
            <span className="text-yellow-900">{totalPoints} Points Earned</span>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-2xl p-4 mb-6">
          <h3 className="text-blue-700 dark:text-blue-300 mb-1">🎯 Choose Your Quests!</h3>
          <p className="text-blue-600 dark:text-blue-400 text-sm">All {quests.length} quests are unlocked - pick any you want to do today!</p>
        </div>

        {/* Next Quest Up */}
        {nextQuest && (
          <div className="mb-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-white" size={24} />
              <h3 className="text-white">Suggested Quest</h3>
            </div>
            <div className="bg-white rounded-2xl p-4">
              <div className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${getCategoryColor(nextQuest.color, 'bg')} rounded-2xl text-3xl`}>
                  {nextQuest.icon}
                </div>
                <div className="flex-1">
                  <p className="text-foreground mb-1">{nextQuest.title}</p>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getDifficultyLabel(nextQuest.difficulty).color} text-white text-xs`}>
                      {getDifficultyLabel(nextQuest.difficulty).text}
                    </Badge>
                    <Badge className="bg-primary text-primary-foreground">
                      +{nextQuest.points} pts
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Available Quest List */}
        <div className="space-y-3">
          {quests.map((quest, index) => {
            const isCompleted = quest.completed;
            
            return (
              <div
                key={quest.id}
                className={`bg-card rounded-2xl p-4 shadow-md border-2 transition-all cursor-pointer ${
                  isCompleted
                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30'
                    : `${getCategoryColor(quest.color, 'border')} hover:border-primary hover:shadow-lg`
                }`}
                onClick={() => onQuestSelect?.(quest.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Quest Status Icon */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${getCategoryColor(quest.color, 'bg')} rounded-2xl text-2xl`}>
                      {quest.icon}
                    </div>
                    
                    <div className="flex-1">
                      <p className={`${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {quest.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={`${getDifficultyLabel(quest.difficulty).color} text-white text-xs px-2 py-0`}>
                          {getDifficultyLabel(quest.difficulty).text}
                        </Badge>
                        <span className="text-xs">{getDifficultyLabel(quest.difficulty).icon}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`rounded-full ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}>
                        +{quest.points}
                      </Badge>
                      <ChevronRight className="text-muted-foreground flex-shrink-0" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bonus Challenge */}
        {completedCount < quests.length && (
          <div className="mt-6 mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 text-center shadow-lg">
            <Sparkles className="text-white mx-auto mb-2" size={32} />
            <h3 className="text-white mb-2">{t.bonusChallenge}</h3>
            <p className="text-yellow-100 mb-3">{t.completeAllQuests}</p>
            <div className="bg-white rounded-2xl py-2 px-4 inline-block">
              <span className="text-orange-600">+50 {t.bonusPoints} 🎉</span>
            </div>
          </div>
        )}
        
        {/* All Complete Celebration */}
        {completedCount === quests.length && quests.length > 0 && (
          <div className="mt-6 mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-6 text-center shadow-lg">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-white mb-2">Amazing Job!</h3>
            <p className="text-green-100 mb-3">You completed all quests today!</p>
            <div className="bg-white rounded-2xl py-2 px-4 inline-block">
              <span className="text-green-700">+50 Bonus Points Earned! ✨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}