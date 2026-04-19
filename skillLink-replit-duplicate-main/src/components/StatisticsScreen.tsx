import { ArrowLeft, Flame, Star, Trophy, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { SkillLevels } from './SkillTreeScreen';
import { Progress } from './ui/progress';

interface StatisticsScreenProps {
  onBack: () => void;
  userPoints?: number;
  skillLevels?: SkillLevels;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Personal Care': 'from-blue-400 to-blue-500',
  'Responsibility': 'from-orange-400 to-orange-500',
  'Learning': 'from-purple-400 to-purple-500',
  'Creativity': 'from-pink-400 to-pink-500',
  'Social Skills': 'from-red-400 to-red-500',
};

const CATEGORY_EMOJIS: Record<string, string> = {
  'Personal Care': '🪥',
  'Responsibility': '🏠',
  'Learning': '📚',
  'Creativity': '🎨',
  'Social Skills': '🤝',
};

const weeklyData = [
  { day: 'Mon', quests: 4, points: 60 },
  { day: 'Tue', quests: 3, points: 45 },
  { day: 'Wed', quests: 5, points: 80 },
  { day: 'Thu', quests: 2, points: 30 },
  { day: 'Fri', quests: 4, points: 65 },
  { day: 'Sat', quests: 6, points: 95 },
  { day: 'Sun', quests: 3, points: 50 },
];

const maxPoints = Math.max(...weeklyData.map(d => d.points));

export function StatisticsScreen({ onBack, userPoints = 1247, skillLevels }: StatisticsScreenProps) {
  const totalXP = skillLevels
    ? Object.values(skillLevels).reduce((sum, s) => sum + s.xp, 0)
    : 620;

  const averageLevel = skillLevels
    ? Math.round(Object.values(skillLevels).reduce((sum, s) => sum + s.level, 0) / Object.keys(skillLevels).length)
    : 4;

  return (
    <div className="h-full bg-background overflow-y-auto pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4 active:opacity-70">
          <ArrowLeft size={20} /> Back
        </button>
        <h2 className="text-white font-bold text-2xl mb-1">Your Progress</h2>
        <p className="text-indigo-100 text-sm">Track your learning journey 📈</p>

        {/* Top stats */}
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center">
            <Flame className="text-orange-300 mx-auto mb-1" size={22} />
            <p className="text-white font-bold text-xl">7</p>
            <p className="text-indigo-100 text-xs">Day Streak</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center">
            <Trophy className="text-yellow-300 mx-auto mb-1" size={22} />
            <p className="text-white font-bold text-xl">{userPoints}</p>
            <p className="text-indigo-100 text-xs">Total Points</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 text-center">
            <Star className="text-pink-300 mx-auto mb-1" size={22} />
            <p className="text-white font-bold text-xl">12</p>
            <p className="text-indigo-100 text-xs">Badges</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="px-6 mt-6">
        <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-md mb-5">
          <div className="flex items-center gap-4 mb-4">
            <Calendar className="text-indigo-500" size={20} />
            <h3 className="text-foreground font-bold">This Week's Activity</h3>
          </div>
          <div className="flex items-end justify-between gap-1 h-24">
            {weeklyData.map((day) => {
              const heightPct = maxPoints > 0 ? (day.points / maxPoints) * 100 : 10;
              const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
              const isToday = day.day === today;
              return (
                <div key={day.day} className="flex flex-col items-center flex-1 gap-1">
                  <div className="w-full flex items-end justify-center" style={{ height: 80 }}>
                    <div
                      className={`w-full rounded-t-xl transition-all ${isToday ? 'bg-indigo-500' : 'bg-indigo-200 dark:bg-indigo-800'}`}
                      style={{ height: `${Math.max(heightPct, 8)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 text-xs text-muted-foreground">
            <span>27 quests this week</span>
            <span>425 points earned</span>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-6 shadow-md">
            <Target className="text-white mb-2" size={22} />
            <p className="text-white font-bold text-2xl">27</p>
            <p className="text-green-100 text-sm">Quests Done</p>
          </div>
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 shadow-md">
            <TrendingUp className="text-white mb-2" size={22} />
            <p className="text-white font-bold text-2xl">Lv. {averageLevel}</p>
            <p className="text-amber-100 text-sm">Avg. Level</p>
          </div>
          <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-3xl p-6 shadow-md">
            <Award className="text-white mb-2" size={22} />
            <p className="text-white font-bold text-2xl">{totalXP}</p>
            <p className="text-pink-100 text-sm">Total XP</p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl p-6 shadow-md">
            <Flame className="text-white mb-2" size={22} />
            <p className="text-white font-bold text-2xl">7</p>
            <p className="text-blue-100 text-sm">Best Streak</p>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-md mb-5">
          <h3 className="text-foreground font-bold mb-4">Skill Breakdown</h3>
          <div className="space-y-4">
            {skillLevels
              ? Object.entries(skillLevels).map(([category, skill]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-4">
                        <span className="text-lg">{CATEGORY_EMOJIS[category] || '⭐'}</span>
                        <span className="text-sm font-semibold text-foreground">{category}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Lv. {skill.level} — {skill.xp} XP</span>
                    </div>
                    <Progress value={Math.min((skill.xp % 100), 100)} className="h-2" />
                  </div>
                ))
              : ['Personal Care', 'Responsibility', 'Learning', 'Creativity', 'Social Skills'].map((cat) => (
                  <div key={cat}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-4">
                        <span className="text-lg">{CATEGORY_EMOJIS[cat]}</span>
                        <span className="text-sm font-semibold text-foreground">{cat}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Lv. 3</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-md">
          <h3 className="text-foreground font-bold mb-4">Recent Achievements</h3>
          <div className="space-y-3">
            {[
              { emoji: '🔥', title: '7-Day Streak!', desc: 'Completed quests 7 days in a row', date: 'Today' },
              { emoji: '🎓', title: 'Learning Champion', desc: 'Completed 10 learning quests', date: 'Yesterday' },
              { emoji: '💪', title: 'Fitness Starter', desc: 'First exercise quest done', date: '3 days ago' },
            ].map((a) => (
              <div key={a.title} className="flex items-center gap-5 p-5 bg-muted/50 rounded-2xl">
                <div className="text-3xl">{a.emoji}</div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{a.title}</p>
                  <p className="text-muted-foreground text-xs">{a.desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
