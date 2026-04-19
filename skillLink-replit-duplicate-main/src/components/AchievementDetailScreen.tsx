import { ArrowLeft, Lock, Star, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

interface AchievementDetailScreenProps {
  badgeId: number;
  onBack: () => void;
}

export function AchievementDetailScreen({ badgeId, onBack }: AchievementDetailScreenProps) {
  const badgeData: Record<number, any> = {
    1: {
      name: 'Early Bird',
      emoji: '🌅',
      unlocked: true,
      description: 'Complete 5 morning quests before 10 AM',
      progress: 5,
      total: 5,
      tips: [
        'Set a morning routine',
        'Complete quests right after breakfast',
        'Get to bed early so you wake up on time',
      ],
      rewards: '50 bonus points + Early Bird badge',
      unlockedDate: 'Unlocked on Oct 1, 2025',
    },
    13: {
      name: 'Speedster',
      emoji: '⚡',
      unlocked: false,
      description: 'Complete 10 quests in a single day',
      progress: 6,
      total: 10,
      tips: [
        'Plan your quests in the morning',
        'Mix easy and hard quests',
        'Take short breaks between quests',
        'Ask for help if you need it!',
      ],
      rewards: '100 bonus points + Speedster badge',
      unlockedDate: null,
    },
    14: {
      name: 'Champion',
      emoji: '🏆',
      unlocked: false,
      description: 'Reach #1 position on the leaderboard',
      progress: 0,
      total: 1,
      tips: [
        'Complete quests every day',
        'Don\'t break your streak',
        'Try harder quests for more points',
        'Help others and be kind!',
      ],
      rewards: '200 bonus points + Champion badge',
      unlockedDate: null,
    },
  };

  const badge = badgeData[badgeId] || badgeData[1];
  const progressPercent = (badge.progress / badge.total) * 100;

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className={`px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg ${
        badge.unlocked 
          ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
          : 'bg-gradient-to-r from-slate-400 to-slate-500'
      }`}>
        <button onClick={onBack} className="text-white mb-6 flex items-center gap-4">
          <ArrowLeft size={20} />
          Back
        </button>
        
        <div className="text-center">
          <div className={`inline-block mb-4 ${badge.unlocked ? 'animate-bounce' : ''}`}>
            {badge.unlocked ? (
              <div className="bg-white rounded-full p-6 shadow-2xl">
                <span className="text-8xl">{badge.emoji}</span>
              </div>
            ) : (
              <div className="bg-slate-300 rounded-full p-6 w-32 h-32 flex items-center justify-center shadow-xl">
                <Lock size={64} className="text-slate-500" />
              </div>
            )}
          </div>
          
          <h2 className="text-white mb-2">{badge.name}</h2>
          {badge.unlocked && (
            <p className="text-white/80">{badge.unlockedDate}</p>
          )}
        </div>
      </div>

      {/* Progress (for locked badges) */}
      {!badge.unlocked && (
        <div className="px-6 mt-6">
          <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-purple-600">Your Progress</h3>
              <span className="text-purple-600">{badge.progress}/{badge.total}</span>
            </div>
            <Progress value={progressPercent} className="h-4 bg-purple-100 mb-3" />
            <div className="flex items-center gap-4 text-slate-600">
              <TrendingUp size={18} className="text-green-500" />
              <span>{badge.total - badge.progress} more to go!</span>
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-3xl p-6">
          <h3 className="text-blue-600 mb-3">How to Earn This Badge</h3>
          <p className="text-slate-700">{badge.description}</p>
        </div>
      </div>

      {/* Tips */}
      <div className="px-6 mt-6">
        <h3 className="text-slate-700 mb-4">Tips to Unlock</h3>
        <div className="space-y-3">
          {badge.tips.map((tip: string, index: number) => (
            <div key={index} className="bg-white border-2 border-green-100 rounded-2xl p-6 flex gap-5">
              <div className="bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-slate-600 flex-1">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards */}
      <div className="px-6 mt-6 mb-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 text-center shadow-lg">
          <Star size={32} className="text-white mx-auto mb-3" fill="currentColor" />
          <h3 className="text-white mb-2">Rewards</h3>
          <p className="text-yellow-100">{badge.rewards}</p>
        </div>
      </div>

      {/* Unlocked Message */}
      {badge.unlocked && (
        <div className="px-6 mb-6">
          <div className="bg-green-50 border-2 border-green-300 rounded-3xl p-6 text-center">
            <h3 className="text-green-600 mb-2">🎉 You Did It!</h3>
            <p className="text-green-700">Keep up the amazing work and unlock more badges!</p>
          </div>
        </div>
      )}
    </div>
  );
}