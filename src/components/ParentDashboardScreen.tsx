import { useState, useEffect } from 'react';
import {
  TrendingUp, Award, Flame, CheckCircle, User, Video, Calendar, Settings,
  Plus, Gift, TrendingDown, Star, Sparkles, X, Crown, ChevronRight, Shield,
  Zap, Clock, AlertCircle, ListChecks,
} from 'lucide-react';
import { RobuxIcon, SkillCoin } from './CurrencyIcons';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { UserProfile } from './ProfileSetupScreen';
import { SkillGrowthChart } from './SkillGrowthChart';
import { SkillLevels } from './SkillTreeScreen';
import { WeeklyEventBanner, WeeklyEvent } from './WeeklyEventBanner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useTranslation, Language } from './translations';
import { getCustomQuests, createCustomQuest, DBCustomQuest } from '../lib/api';

const AVATAR_EMOJI: Record<string, string> = {
  lion: '🦁', fox: '🦊', bear: '🐻', owl: '🦉', rabbit: '🐰',
  penguin: '🐧', tiger: '🐯', elephant: '🐘', unicorn: '🦄', dragon: '🐲',
};
function resolveAvatar(avatar: string | undefined, fallback = '👨‍💼'): string {
  if (!avatar) return fallback;
  return AVATAR_EMOJI[avatar] || avatar;
}

const MAX_SC_PER_QUEST = 15;
const MAX_QUESTS_PER_DAY = 1;

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

interface ParentDashboardScreenProps {
  onViewChildProfile?: () => void;
  onViewVideoReviews?: () => void;
  onNavigate?: (screen: string) => void;
  userProfile?: UserProfile | null;
  skillLevels?: SkillLevels;
  weeklyEvent?: WeeklyEvent;
  language?: Language;
  userId?: number | null;
}

interface CustomQuest {
  id: string;
  title: string;
  description: string;
  scReward: number;
  dueDate: string;
  status: 'pending' | 'completed' | 'approved';
  createdAt: string;
}

interface Reward {
  id: string;
  name: string;
  pointsCost: number;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  type: 'robux' | 'border' | 'other';
}

export function ParentDashboardScreen({
  onViewChildProfile, onViewVideoReviews, onNavigate, userProfile, skillLevels, weeklyEvent, language = 'en', userId,
}: ParentDashboardScreenProps) {
  const t = useTranslation(language);
  const pendingReviews = 2;

  const [showCustomQuestDialog, setShowCustomQuestDialog] = useState(false);
  const [showRewardsDialog, setShowRewardsDialog] = useState(false);

  const [questTitle, setQuestTitle] = useState('');
  const [questDescription, setQuestDescription] = useState('');
  const [questScReward, setQuestScReward] = useState('5');
  const [questDueDate, setQuestDueDate] = useState('');
  const [questError, setQuestError] = useState('');

  const [canCreateQuest, setCanCreateQuest] = useState(true);
  const [customQuests, setCustomQuests] = useState<CustomQuest[]>([]);

  // Fetch custom quests from DB whenever the logged-in parent changes
  useEffect(() => {
    if (userId == null) { setCustomQuests([]); return; }
    getCustomQuests(userId)
      .then(({ quests }) => {
        setCustomQuests(quests.map((q: DBCustomQuest) => ({
          id: String(q.id),
          title: q.title,
          description: q.description ?? '',
          scReward: q.sc_reward,
          dueDate: q.due_date ?? '',
          status: q.status,
          createdAt: new Date(q.created_at).toLocaleString(),
        })));
        // Disable creation if parent already created one today
        const today = getTodayKey();
        const createdToday = quests.filter(
          (q: DBCustomQuest) => q.created_at.startsWith(new Date().toISOString().slice(0, 10))
        );
        setCanCreateQuest(createdToday.length < MAX_QUESTS_PER_DAY);
      })
      .catch(() => setCustomQuests([]));
  }, [userId]);

  const [rewardRequests, setRewardRequests] = useState<Reward[]>([
    { id: '1', name: '160 Robux', pointsCost: 750, requestedAt: 'Today, 2:45 PM', status: 'pending', type: 'robux' },
    { id: '2', name: 'Gold Champion Border', pointsCost: 200, requestedAt: 'Yesterday', status: 'pending', type: 'border' },
  ]);

  const getWeeklySummary = () => {
    if (!skillLevels) return null;
    const skills = Object.entries(skillLevels);
    const highestSkill = skills.reduce((max, curr) => curr[1].xp > max[1].xp ? curr : max);
    return {
      highestSkill: highestSkill[0],
      questsCompleted: 24, lastWeekQuests: 18,
      teamChallenges: 5, pointsEarned: 540, lastWeekPoints: 420, currentStreak: 7,
    };
  };

  const weeklySummary = getWeeklySummary();
  const questGrowth = weeklySummary ? Math.round(((weeklySummary.questsCompleted - weeklySummary.lastWeekQuests) / weeklySummary.lastWeekQuests) * 100) : 0;
  const pointsGrowth = weeklySummary ? Math.round(((weeklySummary.pointsEarned - weeklySummary.lastWeekPoints) / weeklySummary.lastWeekPoints) * 100) : 0;

  const weeklyTips = [
    "Encourage your child to try a new skill this week! 🌟",
    "Family challenges build stronger bonds — try one together! 👨‍👩‍👧",
    "Celebrate small wins to keep motivation high! 🎉",
    "Consistency is key — help maintain that daily streak! 🔥",
    "Mix creative and learning quests for balanced growth! 📚🎨",
  ];
  const currentTip = weeklyTips[new Date().getDay() % weeklyTips.length];

  const recentQuests = [
    { name: 'Brush teeth', completed: true, date: 'Today, 8:30 AM' },
    { name: 'Read for 15 min', completed: true, date: 'Today, 3:45 PM' },
    { name: 'Draw favorite animal', completed: false, date: 'Today' },
    { name: 'Math practice', completed: false, date: 'Today' },
  ];

  const weeklyData = [
    { day: 'Mon', points: 85, lastWeek: 70 },
    { day: 'Tue', points: 120, lastWeek: 95 },
    { day: 'Wed', points: 95, lastWeek: 85 },
    { day: 'Thu', points: 110, lastWeek: 100 },
    { day: 'Fri', points: 130, lastWeek: 110 },
    { day: 'Sat', points: 90, lastWeek: 80 },
    { day: 'Sun', points: 140, lastWeek: 120 },
  ];
  const maxPoints = Math.max(...weeklyData.map(d => d.points), ...weeklyData.map(d => d.lastWeek));

  const weekHighlight = weeklySummary && weeklySummary.teamChallenges >= 3
    ? `Completed ${weeklySummary.teamChallenges} teamwork quests!`
    : weeklySummary && questGrowth > 20
    ? `${questGrowth}% more quests than last week!`
    : weeklySummary && weeklySummary.currentStreak >= 7
    ? `Maintained a ${weeklySummary.currentStreak}-day streak!`
    : 'Great progress this week!';

  const handleCreateCustomQuest = async () => {
    setQuestError('');
    if (!questTitle.trim()) { setQuestError('Please enter a quest title'); return; }
    const sc = parseInt(questScReward);
    if (isNaN(sc) || sc < 1 || sc > MAX_SC_PER_QUEST) {
      setQuestError(`SC reward must be between 1 and ${MAX_SC_PER_QUEST}`);
      return;
    }
    if (!canCreateQuest) {
      setQuestError(`You can only create ${MAX_QUESTS_PER_DAY} custom quest per day`);
      return;
    }
    if (!userId) { setQuestError('You must be logged in to create quests'); return; }

    try {
      const { quest } = await createCustomQuest({
        parent_id: userId,
        title: questTitle.trim(),
        description: questDescription.trim() || undefined,
        sc_reward: sc,
        due_date: questDueDate || undefined,
      });
      const newQuest: CustomQuest = {
        id: String(quest.id),
        title: quest.title,
        description: quest.description ?? '',
        scReward: quest.sc_reward,
        dueDate: quest.due_date ?? '',
        status: quest.status,
        createdAt: new Date(quest.created_at).toLocaleString(),
      };
      setCustomQuests(prev => [newQuest, ...prev]);
      setCanCreateQuest(false);
      setQuestTitle('');
      setQuestDescription('');
      setQuestScReward('5');
      setQuestDueDate('');
      setShowCustomQuestDialog(false);
    } catch (err: any) {
      setQuestError(err.message || 'Failed to create quest. Please try again.');
    }
  };

  const handleApproveReward = (rewardId: string) => {
    setRewardRequests(rewardRequests.map(r => r.id === rewardId ? { ...r, status: 'approved' } : r));
  };
  const handleRejectReward = (rewardId: string) => {
    setRewardRequests(rewardRequests.map(r => r.id === rewardId ? { ...r, status: 'rejected' } : r));
  };

  return (
    <div className="h-full bg-gradient-to-b from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-5">
            <span className="text-4xl">{resolveAvatar(userProfile?.avatar, '👨‍💼')}</span>
            <div>
              <h2 className="text-white">Welcome, {userProfile?.name || 'Parent'}!</h2>
              <p className="text-indigo-100 text-sm">Manage your child's learning journey</p>
            </div>
          </div>
          {onNavigate && (
            <button onClick={() => onNavigate('settings')} className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl hover:bg-white/30 transition-all">
              <Settings className="text-white" size={24} />
            </button>
          )}
        </div>

        <div className="flex gap-5 mt-6 mb-4">
          <button onClick={onViewChildProfile} className="flex-1 flex items-center justify-center gap-4 text-indigo-100 hover:text-white transition-colors bg-white/10 rounded-2xl py-3 backdrop-blur-sm">
            <User size={18} />
            <span className="text-sm">Child Profile</span>
          </button>
          <button onClick={onViewVideoReviews} className="flex-1 flex items-center justify-center gap-4 text-indigo-100 hover:text-white transition-colors bg-white/10 rounded-2xl py-3 backdrop-blur-sm relative">
            <Video size={18} />
            <span className="text-sm">Video Reviews</span>
            {pendingReviews > 0 && (
              <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-white text-xs">{pendingReviews}</span>
              </div>
            )}
          </button>
        </div>

        {/* Key Stats — most prominent element */}
        <div className="grid grid-cols-3 gap-5">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <TrendingUp className="text-white mx-auto mb-2" size={24} />
            <p className="text-white text-2xl font-bold">1,247</p>
            <p className="text-indigo-100 text-sm">Total Points</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Flame className="text-orange-300 mx-auto mb-2" size={24} />
            <p className="text-white text-2xl font-bold">7 Days</p>
            <p className="text-indigo-100 text-sm">Streak</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
            <Award className="text-yellow-300 mx-auto mb-2" size={24} />
            <p className="text-white text-2xl font-bold">12</p>
            <p className="text-indigo-100 text-sm">Badges</p>
          </div>
        </div>
      </div>

      {/* ── CUSTOM QUESTS ─────────────────────────────────────────────────────── */}
      <div className="px-6 mt-6">
        <div className="bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-800 rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center">
                <ListChecks className="text-white" size={22} />
              </div>
              <div>
                <h3 className="text-slate-800 dark:text-slate-100 font-bold text-base">Custom Quests</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">Assign personalised tasks to your child</p>
              </div>
            </div>
            <Button
              onClick={() => { setQuestError(''); setShowCustomQuestDialog(true); }}
              disabled={!canCreateQuest}
              className={`rounded-2xl flex items-center gap-2 text-sm px-4 ${canCreateQuest ? 'bg-blue-500 hover:bg-blue-600' : 'bg-slate-300 dark:bg-slate-600 cursor-not-allowed'}`}
            >
              <Plus size={16} /> Create Quest
            </Button>
          </div>

          {/* Daily limit indicator */}
          <div className={`rounded-2xl px-4 py-2 mb-4 text-sm flex items-center gap-3 ${canCreateQuest ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'}`}>
            <Clock size={14} />
            {canCreateQuest
              ? `You can create 1 quest today`
              : `Daily limit reached — ${MAX_QUESTS_PER_DAY}/${MAX_QUESTS_PER_DAY} quest used today`
            }
          </div>

          {/* Custom quest list */}
          {customQuests.length === 0 ? (
            <div className="text-center py-6 text-slate-400 dark:text-slate-500">
              <p className="text-3xl mb-2">📋</p>
              <p className="text-sm">No custom quests yet.<br />Tap <strong>Create Quest</strong> to add one!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {customQuests.map(q => (
                <div key={q.id} className={`rounded-2xl p-4 border-2 ${
                  q.status === 'completed' ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800' :
                  q.status === 'approved'  ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' :
                                            'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      q.status === 'completed' ? 'bg-green-500' : q.status === 'approved' ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}>
                      {q.status === 'completed' ? <CheckCircle className="text-white" size={16} /> : <span className="text-white text-sm">?</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{q.title}</p>
                      {q.description && <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5 truncate">{q.description}</p>}
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-400">
                          <SkillCoin size={12} /> {q.scReward} SC
                        </span>
                        {q.dueDate && <span className="text-xs text-slate-400">Due {q.dueDate}</span>}
                        <span className="text-xs text-slate-400">{q.createdAt}</span>
                      </div>
                    </div>
                    <Badge className={
                      q.status === 'completed' ? 'bg-green-500' :
                      q.status === 'approved'  ? 'bg-blue-500' :
                      'bg-slate-400'
                    }>
                      {q.status === 'completed' ? '✓ Done' : q.status === 'approved' ? 'Active' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Highlight of the Week */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-6 shadow-lg">
          <div className="flex items-center gap-5 mb-2">
            <Star className="text-white" size={28} fill="currentColor" />
            <h3 className="text-white">Highlight of the Week</h3>
          </div>
          <p className="text-white text-lg">⭐ {weekHighlight}</p>
        </div>
      </div>

      {/* Weekly Event Banner */}
      {weeklyEvent && <div className="px-6 mt-4"><WeeklyEventBanner event={weeklyEvent} /></div>}

      {/* Weekly Insights */}
      {weeklySummary && (
        <div className="px-6 mt-6">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-3xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-green-700 dark:text-green-300 flex items-center gap-4">
                <Calendar size={20} /> Weekly Insights
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Quests Completed</p>
                <p className="text-green-700 dark:text-green-300 text-xl font-bold">{weeklySummary.questsCompleted}</p>
                <p className="text-green-600 dark:text-green-400 text-xs mt-1">↑ {weeklySummary.lastWeekQuests} last week</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Team Challenges</p>
                <p className="text-green-700 dark:text-green-300 text-xl font-bold">{weeklySummary.teamChallenges}</p>
                <p className="text-green-600 dark:text-green-400 text-xs mt-1">Family bonding! 👨‍👩‍👧</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Points Earned</p>
                <p className="text-green-700 dark:text-green-300 text-xl font-bold">{weeklySummary.pointsEarned}</p>
                <p className="text-green-600 dark:text-green-400 text-xs mt-1">↑ {weeklySummary.lastWeekPoints} last week</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-5">
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Current Streak</p>
                <p className="text-green-700 dark:text-green-300 text-xl font-bold">{weeklySummary.currentStreak} days</p>
                <p className="text-green-600 dark:text-green-400 text-xs mt-1">🔥 On fire!</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-4 mb-2">
                <Sparkles className="text-purple-600 dark:text-purple-300" size={18} />
                <h4 className="text-purple-700 dark:text-purple-300 font-semibold">Weekly Tip</h4>
              </div>
              <p className="text-purple-600 dark:text-purple-200 text-sm">{currentTip}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress Comparison */}
      <div className="px-6 mt-6">
        <Card className="p-5 border-2 border-blue-100 dark:border-blue-900">
          <h3 className="text-slate-700 dark:text-slate-300 mb-4 font-bold">Progress Comparison</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`rounded-2xl p-4 ${questGrowth >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              <div className="flex items-center gap-4 mb-2">
                {questGrowth >= 0 ? <TrendingUp className="text-green-600" size={20} /> : <TrendingDown className="text-red-600" size={20} />}
                <p className={questGrowth >= 0 ? 'text-green-700 dark:text-green-300 font-bold' : 'text-red-700 dark:text-red-300 font-bold'}>
                  {questGrowth > 0 ? '+' : ''}{questGrowth}%
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">More quests completed</p>
            </div>
            <div className={`rounded-2xl p-4 ${pointsGrowth >= 0 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
              <div className="flex items-center gap-4 mb-2">
                {pointsGrowth >= 0 ? <TrendingUp className="text-green-600" size={20} /> : <TrendingDown className="text-red-600" size={20} />}
                <p className={pointsGrowth >= 0 ? 'text-green-700 dark:text-green-300 font-bold' : 'text-red-700 dark:text-red-300 font-bold'}>
                  {pointsGrowth > 0 ? '+' : ''}{pointsGrowth}%
                </p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">More points earned</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Parent Tools */}
      <div className="px-6 mt-6">
        <h3 className="text-slate-700 dark:text-slate-300 mb-4 font-bold">Parent Tools</h3>
        <div className="grid grid-cols-2 gap-5">
          <button
            onClick={() => setShowRewardsDialog(true)}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all relative"
          >
            <Gift className="mx-auto mb-2" size={28} />
            <p className="text-sm font-semibold">Reward Requests</p>
            {rewardRequests.filter(r => r.status === 'pending').length > 0 && (
              <div className="absolute -top-2 -right-2 bg-orange-500 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-white text-xs">{rewardRequests.filter(r => r.status === 'pending').length}</span>
              </div>
            )}
          </button>
          <button
            onClick={() => onNavigate?.('child-profile')}
            className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <User className="mx-auto mb-2" size={28} />
            <p className="text-sm font-semibold">Child Profile</p>
          </button>
        </div>
      </div>

      {/* Subscription Banner */}
      <div className="px-6 mt-6">
        <button
          onClick={() => onNavigate?.('subscription')}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-5 shadow-xl text-left hover:shadow-2xl active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Crown size={26} className="text-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-0.5">
                  <p className="text-white font-black text-base">Upgrade Your Plan</p>
                  <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full">BEST VALUE</span>
                </div>
                <p className="text-purple-100 text-xs">Family Plan — 2 kids · family challenges · 2× SC</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-white/70 flex-shrink-0" />
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-1.5 text-purple-100 text-xs"><Shield size={13} /> Secure</div>
            <div className="flex items-center gap-1.5 text-purple-100 text-xs"><Zap size={13} /> Instant</div>
            <div className="flex items-center gap-1.5 text-purple-100 text-xs"><Star size={13} /> Cancel anytime</div>
          </div>
        </button>
      </div>

      {/* Skill Growth Chart */}
      {skillLevels && <div className="px-6 mt-6"><SkillGrowthChart skillLevels={skillLevels} /></div>}

      {/* Weekly Activity Chart */}
      <div className="px-6 mt-6">
        <Card className="p-5 border-2 border-indigo-100 dark:border-indigo-900">
          <h3 className="text-slate-700 dark:text-slate-300 mb-4 font-bold">This Week vs Last Week</h3>
          <div className="flex items-end justify-between gap-4 h-40 mb-4">
            {weeklyData.map((day, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-4">
                <div className="flex-1 flex items-end w-full gap-1">
                  <div className="w-1/2 bg-gradient-to-t from-indigo-300 to-indigo-200 dark:from-indigo-700 dark:to-indigo-600 rounded-t-lg opacity-60" style={{ height: `${(day.lastWeek / maxPoints) * 100}%` }} />
                  <div className="w-1/2 bg-gradient-to-t from-indigo-500 to-indigo-400 dark:from-indigo-500 dark:to-indigo-400 rounded-t-lg" style={{ height: `${(day.points / maxPoints) * 100}%` }} />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs">{day.day}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-indigo-300 dark:bg-indigo-700 rounded opacity-60" /><p className="text-slate-600 dark:text-slate-400 text-xs">Last Week</p></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-indigo-500 dark:bg-indigo-400 rounded" /><p className="text-slate-600 dark:text-slate-400 text-xs">This Week</p></div>
          </div>
        </Card>
      </div>

      {/* Today's Progress */}
      <div className="px-6 mt-6">
        <Card className="p-5 border-2 border-blue-100 dark:border-blue-900">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-slate-700 dark:text-slate-300 font-bold">Today's Progress</h3>
            <Badge className="bg-blue-500">2/5 Done</Badge>
          </div>
          <Progress value={40} className="h-3 bg-blue-100 dark:bg-blue-900 mb-2" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">2 quests completed, 3 remaining</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-6 mt-6 mb-6">
        <h3 className="text-slate-700 dark:text-slate-300 mb-4 font-bold">Recent Quests</h3>
        <div className="space-y-3">
          {recentQuests.map((quest, idx) => (
            <div key={idx} className={`rounded-2xl p-4 flex items-center gap-3 ${
              quest.completed
                ? 'bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-700'
                : 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${quest.completed ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                {quest.completed ? <CheckCircle className="text-white" size={20} /> : <div className="w-5 h-5 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1">
                <p className={quest.completed ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'}>
                  {quest.name}
                </p>
                <p className="text-slate-400 dark:text-slate-500 text-sm">{quest.date}</p>
              </div>
              {quest.completed && <Badge className="bg-green-500">✓ Done</Badge>}
            </div>
          ))}
        </div>
      </div>

      {/* Custom Quest Creator Dialog */}
      <Dialog open={showCustomQuestDialog} onOpenChange={setShowCustomQuestDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Custom Quest</DialogTitle>
            <DialogDescription>
              Design a personalised quest for your child. Max <strong>{MAX_SC_PER_QUEST} SC</strong> reward · <strong>1 quest per day</strong> limit.
            </DialogDescription>
          </DialogHeader>

          {questError && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-3 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle size={16} /> {questError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="quest-title">Quest Title *</Label>
              <Input id="quest-title" placeholder="e.g., Practice piano for 20 minutes" value={questTitle} onChange={e => setQuestTitle(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="quest-desc">Description (Optional)</Label>
              <Textarea id="quest-desc" placeholder="Add detailed instructions for your child..." value={questDescription} onChange={e => setQuestDescription(e.target.value)} rows={3} />
            </div>
            <div>
              <Label htmlFor="quest-sc">SC Reward * (1–{MAX_SC_PER_QUEST})</Label>
              <Input
                id="quest-sc"
                type="number"
                min={1}
                max={MAX_SC_PER_QUEST}
                value={questScReward}
                onChange={e => {
                  const v = Math.min(MAX_SC_PER_QUEST, Math.max(1, parseInt(e.target.value) || 1));
                  setQuestScReward(String(v));
                }}
              />
              <p className="text-xs text-slate-400 mt-1">Maximum {MAX_SC_PER_QUEST} SC per quest</p>
            </div>
            <div>
              <Label htmlFor="quest-due">Due Date (Optional)</Label>
              <Input id="quest-due" type="date" value={questDueDate} onChange={e => setQuestDueDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCustomQuestDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateCustomQuest} disabled={!canCreateQuest} className="bg-blue-500 hover:bg-blue-600">
              Create Quest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reward Control Center Dialog */}
      <Dialog open={showRewardsDialog} onOpenChange={setShowRewardsDialog}>
        <DialogContent className="max-w-2xl w-[92vw] max-h-[82vh] flex flex-col overflow-hidden p-5">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Reward Control Center</DialogTitle>
            <DialogDescription>Review and approve reward redemptions from your child</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {rewardRequests.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Gift className="mx-auto mb-2 opacity-50" size={48} />
                <p>No reward requests yet</p>
              </div>
            ) : (
              rewardRequests.map(reward => (
                <div key={reward.id} className={`rounded-2xl p-4 border-2 ${
                  reward.status === 'pending'  ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700' :
                  reward.status === 'approved' ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700' :
                                                 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700'
                }`}>
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10">
                      {reward.type === 'robux' ? <RobuxIcon size={40} /> :
                       reward.type === 'border' ? <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-4 border-yellow-400 shadow-[0_0_10px_#facc15] text-xl flex-shrink-0">😊</div> :
                       <span className="text-3xl">🎁</span>}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-slate-700 dark:text-slate-300 font-semibold">{reward.name}</h4>
                      <div className="flex items-center gap-1 mt-0.5">
                        <SkillCoin size={14} />
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-bold">{reward.pointsCost.toLocaleString()} SC</span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs">• {reward.requestedAt}</span>
                      </div>
                      <div className="mt-2">
                        {reward.status === 'pending' && (
                          <div className="flex gap-4">
                            <Button size="sm" onClick={() => handleApproveReward(reward.id)} className="bg-green-500 hover:bg-green-600 flex-1">✓ Approve</Button>
                            <Button size="sm" variant="outline" onClick={() => handleRejectReward(reward.id)} className="border-red-300 text-red-600 hover:bg-red-50 flex-1"><X size={16} className="mr-1" /> Reject</Button>
                          </div>
                        )}
                        {reward.status === 'approved' && <Badge className="bg-green-500">Approved ✓</Badge>}
                        {reward.status === 'rejected' && <Badge variant="outline" className="border-red-300 text-red-600">Rejected</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <DialogFooter className="flex-shrink-0 pt-2">
            <Button variant="outline" onClick={() => setShowRewardsDialog(false)} className="w-full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
