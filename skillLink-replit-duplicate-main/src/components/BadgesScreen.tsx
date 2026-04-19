import { Lock } from 'lucide-react';

interface BadgesScreenProps {
  onBadgeSelect?: (badgeId: number) => void;
}

export function BadgesScreen({ onBadgeSelect }: BadgesScreenProps) {
  const badges = [
    { id: 1, name: 'Early Bird', emoji: '🌅', unlocked: true, description: 'Complete 5 morning quests' },
    { id: 2, name: 'Bookworm', emoji: '📚', unlocked: true, description: 'Read for 7 days straight' },
    { id: 3, name: 'Math Wizard', emoji: '🧙‍♂️', unlocked: true, description: 'Solve 50 math problems' },
    { id: 4, name: 'Artist', emoji: '🎨', unlocked: true, description: 'Complete 10 art quests' },
    { id: 5, name: 'Helper', emoji: '🤝', unlocked: true, description: 'Help with chores 10 times' },
    { id: 6, name: 'Fitness Star', emoji: '⭐', unlocked: true, description: 'Complete 20 exercise quests' },
    { id: 7, name: 'Curious Mind', emoji: '🤔', unlocked: true, description: 'Learn 100 new words' },
    { id: 8, name: 'Team Player', emoji: '🤗', unlocked: true, description: 'Send 50 positive messages' },
    { id: 9, name: 'Week Warrior', emoji: '🔥', unlocked: true, description: '7-day streak' },
    { id: 10, name: 'Creative Genius', emoji: '💡', unlocked: true, description: 'Complete 5 creative quests' },
    { id: 11, name: 'Quiz Master', emoji: '🎓', unlocked: true, description: 'Get 100% on 10 quizzes' },
    { id: 12, name: 'Explorer', emoji: '🗺️', unlocked: true, description: 'Try all quest types' },
    { id: 13, name: 'Speedster', emoji: '⚡', unlocked: false, description: 'Complete 10 quests in 1 day' },
    { id: 14, name: 'Champion', emoji: '🏆', unlocked: false, description: 'Reach #1 on leaderboard' },
    { id: 15, name: 'Legend', emoji: '👑', unlocked: false, description: 'Earn 10,000 points' },
    { id: 16, name: 'Perfect Week', emoji: '💯', unlocked: false, description: 'Complete all quests for 7 days' },
    { id: 17, name: 'Social Butterfly', emoji: '🦋', unlocked: false, description: 'Send 100 messages' },
    { id: 18, name: 'Super Learner', emoji: '🚀', unlocked: false, description: 'Complete 100 total quests' },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <h2 className="text-white mb-2">Badges & Achievements</h2>
        <p className="text-purple-100 mb-4">Collect them all! 🏆</p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
          <p className="text-white mb-2">Your Collection</p>
          <p className="text-white text-3xl">{unlockedCount}/{badges.length}</p>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => (
            <button
              key={badge.id}
              onClick={() => onBadgeSelect?.(badge.id)}
              className={`rounded-2xl p-4 text-center transition-all ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 shadow-lg transform hover:scale-105'
                  : 'bg-slate-100 border-2 border-slate-200 opacity-60 hover:opacity-80'
              }`}
            >
              {badge.unlocked ? (
                <>
                  <div className="text-5xl mb-2 animate-bounce">{badge.emoji}</div>
                  <p className="text-slate-700 text-sm">{badge.name}</p>
                </>
              ) : (
                <>
                  <div className="bg-slate-200 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <Lock size={24} className="text-slate-400" />
                  </div>
                  <p className="text-slate-400 text-sm">???</p>
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Details */}
      <div className="px-6 mt-6 mb-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5">
          <h3 className="text-blue-600 mb-3">Recently Unlocked</h3>
          <div className="space-y-3">
            {badges.filter(b => b.unlocked).slice(-3).reverse().map((badge) => (
              <div key={badge.id} className="bg-white rounded-2xl p-3 flex items-center gap-3">
                <div className="text-3xl">{badge.emoji}</div>
                <div className="flex-1">
                  <p className="text-slate-700">{badge.name}</p>
                  <p className="text-slate-400 text-sm">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
