import { ArrowLeft, Star, Flame, Trophy, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ChildProfileScreenProps {
  onBack: () => void;
}

export function ChildProfileScreen({ onBack }: ChildProfileScreenProps) {
  const stats = {
    totalPoints: 1247,
    streak: 7,
    badges: 12,
    rank: 6,
    questsCompleted: 43,
    coursesCompleted: 3,
  };

  const recentAchievements = [
    { name: 'Early Bird', emoji: '🌅', date: 'Oct 1, 2025' },
    { name: 'Bookworm', emoji: '📚', date: 'Sep 28, 2025' },
    { name: 'Math Wizard', emoji: '🧙‍♂️', date: 'Sep 25, 2025' },
  ];

  const recentQuests = [
    { name: 'Brush teeth', completed: true, points: 10, date: 'Today' },
    { name: 'Read for 15 min', completed: true, points: 20, date: 'Today' },
    { name: 'Math practice', completed: true, points: 30, date: 'Yesterday' },
    { name: 'Help with dishes', completed: true, points: 15, date: 'Yesterday' },
    { name: 'Draw favorite animal', completed: true, points: 25, date: '2 days ago' },
  ];

  const favoriteCategories = [
    { name: 'Creativity', icon: '🎨', count: 15 },
    { name: 'Life Skills', icon: '🎯', count: 12 },
    { name: 'Healthy Habits', icon: '💪', count: 10 },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-indigo-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        
        <div className="text-center mb-6">
          <div className="bg-white rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center text-6xl shadow-xl">
            🧒
          </div>
          <h2 className="text-white mb-2">Alex's Profile</h2>
          <p className="text-indigo-100">Member since August 2025</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Star className="text-yellow-300 mx-auto mb-2" size={24} fill="currentColor" />
            <p className="text-white text-2xl">{stats.totalPoints}</p>
            <p className="text-indigo-100 text-sm">Points</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Flame className="text-orange-300 mx-auto mb-2" size={24} />
            <p className="text-white text-2xl">{stats.streak}</p>
            <p className="text-indigo-100 text-sm">Day Streak</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <Trophy className="text-yellow-300 mx-auto mb-2" size={24} />
            <p className="text-white text-2xl">#{stats.rank}</p>
            <p className="text-indigo-100 text-sm">Rank</p>
          </div>
        </div>
      </div>

      {/* Activity Overview */}
      <div className="px-6 mt-6">
        <Card className="p-5 border-2 border-indigo-100">
          <h3 className="text-slate-700 mb-4">Activity Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-blue-600 text-3xl">{stats.questsCompleted}</p>
              <p className="text-slate-600">Quests Done</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 text-center">
              <p className="text-purple-600 text-3xl">{stats.coursesCompleted}</p>
              <p className="text-slate-600">Courses Done</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-green-600 text-3xl">{stats.badges}</p>
              <p className="text-slate-600">Badges Earned</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <p className="text-orange-600 text-3xl">89%</p>
              <p className="text-slate-600">Success Rate</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Achievements */}
      <div className="px-6 mt-6">
        <h3 className="text-slate-700 mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {recentAchievements.map((achievement, idx) => (
            <div key={idx} className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-4xl">{achievement.emoji}</div>
              <div className="flex-1">
                <p className="text-slate-700">{achievement.name}</p>
                <p className="text-slate-500 text-sm">{achievement.date}</p>
              </div>
              <Trophy className="text-yellow-600" size={24} />
            </div>
          ))}
        </div>
      </div>

      {/* Favorite Categories */}
      <div className="px-6 mt-6">
        <h3 className="text-slate-700 mb-4">Favorite Categories</h3>
        <div className="space-y-3">
          {favoriteCategories.map((category, idx) => (
            <div key={idx} className="bg-white border-2 border-blue-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-3xl">{category.icon}</div>
              <div className="flex-1">
                <p className="text-slate-700">{category.name}</p>
                <p className="text-slate-400 text-sm">{category.count} activities completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quests */}
      <div className="px-6 mt-6 mb-6">
        <h3 className="text-slate-700 mb-4">Recent Quests</h3>
        <div className="space-y-2">
          {recentQuests.map((quest, idx) => (
            <div key={idx} className="bg-green-50 border-2 border-green-200 rounded-2xl p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <Star size={16} className="text-white" fill="currentColor" />
              </div>
              <div className="flex-1">
                <p className="text-slate-700 text-sm">{quest.name}</p>
                <p className="text-slate-400 text-xs">{quest.date}</p>
              </div>
              <Badge className="bg-green-500 text-sm">+{quest.points}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="px-6 mb-6">
        <Card className="p-5 bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-blue-600" size={24} />
            <h3 className="text-blue-700">Parent Insights</h3>
          </div>
          <ul className="space-y-2 text-slate-700">
            <li>• Most active time: Afternoons (3-5 PM)</li>
            <li>• Favorite activity type: Creative quests</li>
            <li>• Best day: Fridays (avg 140 points)</li>
            <li>• Learning streak: 7 consecutive days 🔥</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}