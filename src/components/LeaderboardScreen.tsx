import { useState, useEffect, useCallback } from 'react';
import { Trophy, Medal, Award, TrendingUp, UserPlus, Swords, X, Loader2, Search, CheckCircle, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { useTranslation, Language } from './translations';
import { getFriends, sendFriendRequest, respondToFriendRequest, removeFriend, FriendRow } from '../lib/api';
import { QUEST_POOL } from './DailyQuestAssigner';

const AVATAR_EMOJI: Record<string, string> = {
  lion: '🦁', fox: '🦊', bear: '🐻', owl: '🦉', rabbit: '🐰',
  penguin: '🐧', tiger: '🐯', elephant: '🐘', unicorn: '🦄', dragon: '🐲',
};
function resolveAvatar(avatar: string | undefined): string {
  if (!avatar) return '👤';
  return AVATAR_EMOJI[avatar] || avatar;
}

interface Duel {
  id: string;
  opponentName: string;
  opponentAvatar: string;
  questTitle: string;
  questIcon: string;
  status: 'pending' | 'active' | 'won' | 'lost';
  createdAt: string;
}

interface LeaderboardScreenProps {
  language?: Language;
  userId?: number | null;
  userHandle?: string | null;
  userProfile?: { name?: string; age?: number; avatar?: string } | null;
}

export function LeaderboardScreen({ language = 'en', userId, userHandle, userProfile }: LeaderboardScreenProps) {
  const t = useTranslation(language);

  const players = [
    { rank: 1, name: 'Emma',       avatar: '👧', points: 2150, streak: 14, isCurrentUser: false },
    { rank: 2, name: 'Noah',       avatar: '👦', points: 1890, streak: 12, isCurrentUser: false },
    { rank: 3, name: 'Olivia',     avatar: '👧', points: 1765, streak: 10, isCurrentUser: false },
    { rank: 4, name: 'Liam',       avatar: '👦', points: 1520, streak: 8,  isCurrentUser: false },
    { rank: 5, name: 'Ava',        avatar: '👧', points: 1340, streak: 9,  isCurrentUser: false },
    { rank: 6, name: userProfile?.name || 'You', avatar: userProfile?.avatar ? resolveAvatar(userProfile.avatar) : '🧒', points: 1247, streak: 7, isCurrentUser: true },
    { rank: 7, name: 'Sophia',     avatar: '👧', points: 1105, streak: 6,  isCurrentUser: false },
    { rank: 8, name: 'Mason',      avatar: '👦', points: 980,  streak: 5,  isCurrentUser: false },
  ];

  // ── Friends state ────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'duels'>('leaderboard');
  const [friends, setFriends] = useState<FriendRow[]>([]);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false);
  const [friendUsername, setFriendUsername] = useState('');
  const [friendRequestMsg, setFriendRequestMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [friendSearchLoading, setFriendSearchLoading] = useState(false);

  // ── Duels state ──────────────────────────────────────────────────────────
  const [duels, setDuels] = useState<Duel[]>([
    { id: '1', opponentName: 'Emma', opponentAvatar: '👧', questTitle: 'Read for 15 minutes', questIcon: '📖', status: 'pending', createdAt: 'Today' },
    { id: '2', opponentName: 'Noah', opponentAvatar: '👦', questTitle: 'Make your bed', questIcon: '🛏️', status: 'won', createdAt: 'Yesterday' },
  ]);
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState<FriendRow | null>(null);
  const [selectedQuestId, setSelectedQuestId] = useState<number | null>(null);

  const loadFriends = useCallback(async () => {
    if (!userId) return;
    setFriendsLoading(true);
    try {
      const { friends: rows } = await getFriends(userId);
      setFriends(rows);
    } catch {}
    finally { setFriendsLoading(false); }
  }, [userId]);

  useEffect(() => {
    if (userId) loadFriends();
  }, [userId, loadFriends]);

  // ── Real-time SSE subscription ────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;
    const es = new EventSource(`/api/events/${userId}`);
    es.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data);
        if (['friend_request', 'friend_update'].includes(event.type)) {
          loadFriends();
        }
        if (['duel_challenge', 'duel_update'].includes(event.type)) {
          loadFriends(); // reload friends so duel-tab counts reflect too
        }
      } catch {}
    };
    es.onerror = () => es.close();
    return () => es.close();
  }, [userId, loadFriends]);

  const handleAddFriend = async () => {
    if (!userId || !friendUsername.trim()) return;
    setFriendSearchLoading(true);
    setFriendRequestMsg(null);
    try {
      await sendFriendRequest(userId, friendUsername.trim());
      setFriendRequestMsg({ type: 'ok', text: `Friend request sent to @${friendUsername}!` });
      setFriendUsername('');
      loadFriends();
    } catch (e: any) {
      setFriendRequestMsg({ type: 'err', text: e?.message || 'Could not send request.' });
    } finally {
      setFriendSearchLoading(false);
    }
  };

  const handleRespondToRequest = async (id: number, status: 'accepted' | 'declined') => {
    try {
      await respondToFriendRequest(id, status);
      loadFriends();
    } catch {}
  };

  const handleRemoveFriend = async (id: number) => {
    try {
      await removeFriend(id);
      loadFriends();
    } catch {}
  };

  const handleChallengeFriend = (friend: FriendRow) => {
    setChallengeTarget(friend);
    setSelectedQuestId(null);
    setShowChallengeDialog(true);
  };

  const handleSendChallenge = () => {
    if (!challengeTarget || !selectedQuestId) return;
    const quest = QUEST_POOL.find(q => q.id === selectedQuestId);
    if (!quest) return;
    const newDuel: Duel = {
      id: Date.now().toString(),
      opponentName: challengeTarget.display_name,
      opponentAvatar: resolveAvatar(challengeTarget.avatar),
      questTitle: quest.title,
      questIcon: quest.icon,
      status: 'pending',
      createdAt: 'Just now',
    };
    setDuels(prev => [newDuel, ...prev]);
    setShowChallengeDialog(false);
    setActiveTab('duels');
  };

  const acceptedFriends = friends.filter(f => f.status === 'accepted');
  const pendingReceived = friends.filter(f => f.status === 'pending' && f.direction === 'received');
  const pendingSent     = friends.filter(f => f.status === 'pending' && f.direction === 'sent');

  const ageAppropriateQuests = userProfile?.age
    ? QUEST_POOL.filter(q => (userProfile.age || 9) >= q.minAge && (userProfile.age || 9) <= q.maxAge)
    : QUEST_POOL.slice(0, 20);

  return (
    <div className="h-full bg-background pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 pt-12 pb-6 rounded-b-[3rem] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-white font-bold mb-1">{t.leaderboard}</h2>
            <p className="text-white/80 text-sm">{t.topLearners} 🏆</p>
          </div>
          <Trophy className="text-white" size={40} />
        </div>

        {/* Tab bar */}
        <div className="flex bg-white/20 backdrop-blur-sm rounded-2xl p-1 gap-1">
          {[
            { key: 'leaderboard', label: '🏆 Rankings' },
            { key: 'friends',     label: `👥 Friends${pendingReceived.length > 0 ? ` (${pendingReceived.length})` : ''}` },
            { key: 'duels',       label: `⚔️ Duels` },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.key ? 'bg-white text-orange-600 shadow' : 'text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── LEADERBOARD TAB ─────────────────────────────────────────────────── */}
      {activeTab === 'leaderboard' && (
        <div className="px-6 mt-6">
          {/* Top 3 Podium */}
          <div className="flex items-end justify-center gap-5 mb-8">
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-br from-slate-200 to-slate-300 border-4 border-slate-400 rounded-2xl p-5 mb-2">
                <div className="text-4xl mb-2">{players[1].avatar}</div>
                <div className="flex items-center justify-center gap-1 bg-slate-400 rounded-full px-2 py-1 mb-2">
                  <Medal size={16} className="text-white" />
                  <span className="text-white text-sm">2nd</span>
                </div>
                <p className="text-slate-700 font-semibold text-sm">{players[1].name}</p>
                <p className="text-slate-600 text-sm">{players[1].points}</p>
              </div>
            </div>
            <div className="flex-1 text-center -mt-6">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 border-4 border-yellow-500 rounded-2xl p-6 mb-2 shadow-xl">
                <div className="text-5xl mb-2 animate-bounce">{players[0].avatar}</div>
                <div className="flex items-center justify-center gap-1 bg-yellow-500 rounded-full px-3 py-1 mb-2">
                  <Trophy size={18} className="text-white" fill="currentColor" />
                  <span className="text-white font-bold">1st</span>
                </div>
                <p className="text-yellow-900 font-bold text-sm">{players[0].name}</p>
                <p className="text-yellow-800 text-sm">{players[0].points}</p>
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-br from-orange-200 to-orange-300 border-4 border-orange-400 rounded-2xl p-5 mb-2">
                <div className="text-4xl mb-2">{players[2].avatar}</div>
                <div className="flex items-center justify-center gap-1 bg-orange-400 rounded-full px-2 py-1 mb-2">
                  <Award size={16} className="text-white" />
                  <span className="text-white text-sm">3rd</span>
                </div>
                <p className="text-orange-700 font-semibold text-sm">{players[2].name}</p>
                <p className="text-orange-600 text-sm">{players[2].points}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {players.slice(3).map(player => (
              <div key={player.rank} className={`rounded-2xl p-4 flex items-center gap-4 ${
                player.isCurrentUser
                  ? 'bg-primary text-primary-foreground shadow-lg border-2 border-primary'
                  : 'bg-card border-2 border-border shadow-md'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${player.isCurrentUser ? 'bg-white/20' : 'bg-muted'}`}>
                  <span className={`font-bold ${player.isCurrentUser ? 'text-primary-foreground' : 'text-primary'}`}>#{player.rank}</span>
                </div>
                <div className="text-3xl">{player.avatar}</div>
                <div className="flex-1">
                  <p className={`font-semibold ${player.isCurrentUser ? 'text-primary-foreground' : 'text-foreground'}`}>{player.name}</p>
                  <p className={`text-sm ${player.isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>🔥 {player.streak} {t.dayStreak}</p>
                </div>
                <Badge className={player.isCurrentUser ? 'bg-primary-foreground text-primary' : 'bg-primary'}>{player.points}</Badge>
              </div>
            ))}
          </div>

          <div className="mt-6 mb-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-3xl p-5 text-center">
            <TrendingUp className="text-green-600 dark:text-green-400 mx-auto mb-2" size={32} />
            <h3 className="text-green-700 dark:text-green-300 font-bold mb-1">{t.keepGoingMessage}</h3>
            <p className="text-green-600 dark:text-green-400 text-sm">You're only 93 {t.pointsAway} 🎯</p>
          </div>
        </div>
      )}

      {/* ── FRIENDS TAB ─────────────────────────────────────────────────────── */}
      {activeTab === 'friends' && (
        <div className="px-6 mt-6">
          {/* Add friend button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground font-bold text-lg">👥 Friends</h3>
            <Button
              onClick={() => { setShowAddFriendDialog(true); setFriendRequestMsg(null); setFriendUsername(''); }}
              className="bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center gap-2"
              size="sm"
            >
              <UserPlus size={16} /> Add Friend
            </Button>
          </div>

          {userHandle && (
            <div className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-2xl px-4 py-3 mb-4 text-sm">
              <p className="text-blue-600 dark:text-blue-300">Your username: <span className="font-bold text-blue-800 dark:text-blue-100">@{userHandle}</span></p>
              <p className="text-blue-500 dark:text-blue-400 text-xs mt-0.5">Share this with friends so they can add you!</p>
            </div>
          )}

          {friendsLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" size={28} /></div>
          ) : (
            <>
              {/* Pending received */}
              {pendingReceived.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-2">⏳ Friend Requests ({pendingReceived.length})</p>
                  <div className="space-y-2">
                    {pendingReceived.map(f => (
                      <div key={f.id} className="flex items-center gap-3 bg-orange-50 dark:bg-orange-950/30 border-2 border-orange-200 dark:border-orange-700 rounded-2xl p-3">
                        <span className="text-3xl">{resolveAvatar(f.avatar)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-foreground truncate">{f.display_name}</p>
                          <p className="text-muted-foreground text-xs">@{f.username_handle}</p>
                        </div>
                        <button onClick={() => handleRespondToRequest(f.id, 'accepted')} className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-xl font-bold">Accept</button>
                        <button onClick={() => handleRespondToRequest(f.id, 'declined')} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-xl font-bold">Decline</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sent pending */}
              {pendingSent.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-bold text-blue-500 mb-2">📨 Sent Requests</p>
                  <div className="space-y-2">
                    {pendingSent.map(f => (
                      <div key={f.id} className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-100 dark:border-blue-800 rounded-2xl p-3">
                        <span className="text-3xl">{resolveAvatar(f.avatar)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-foreground truncate">{f.display_name}</p>
                          <p className="text-muted-foreground text-xs">@{f.username_handle} · Pending…</p>
                        </div>
                        <button onClick={() => handleRemoveFriend(f.id)} className="text-slate-400 hover:text-red-400 transition-colors"><X size={16} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accepted friends */}
              {acceptedFriends.length > 0 ? (
                <div>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400 mb-2">✅ Friends ({acceptedFriends.length})</p>
                  <div className="space-y-2">
                    {acceptedFriends.map(f => (
                      <div key={f.id} className="flex items-center gap-3 bg-card border-2 border-green-100 dark:border-green-800 rounded-2xl p-3 shadow-sm">
                        <span className="text-3xl">{resolveAvatar(f.avatar)}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-foreground truncate">{f.display_name}</p>
                          <p className="text-muted-foreground text-xs">Lvl {f.level ?? 1} · {f.sc_coins ?? 0} 🪙</p>
                        </div>
                        <button
                          onClick={() => handleChallengeFriend(f)}
                          className="flex items-center gap-1.5 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                        >
                          <Swords size={12} /> Duel!
                        </button>
                        <button onClick={() => handleRemoveFriend(f.id)} className="text-slate-300 dark:text-slate-600 hover:text-red-400 transition-colors ml-1"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                friends.filter(f => f.status === 'pending').length === 0 && (
                  <div className="text-center py-10 text-muted-foreground">
                    <p className="text-4xl mb-3">🤝</p>
                    <p className="font-semibold">No friends yet!</p>
                    <p className="text-sm mt-1">Tap <strong>Add Friend</strong> to connect with someone.</p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      )}

      {/* ── DUELS TAB ───────────────────────────────────────────────────────── */}
      {activeTab === 'duels' && (
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground font-bold text-lg">⚔️ Quest Duels</h3>
          </div>

          {/* How duels work */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 mb-5">
            <p className="text-orange-700 dark:text-orange-300 font-bold text-sm mb-1">How Quest Duels work:</p>
            <p className="text-orange-600 dark:text-orange-400 text-xs">Challenge a friend to the same quest. Whoever completes it first wins! 🏆</p>
          </div>

          {/* Challenge a friend CTA */}
          {acceptedFriends.length > 0 && (
            <div className="mb-5">
              <p className="text-sm font-bold text-foreground mb-2">Challenge a friend:</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {acceptedFriends.map(f => (
                  <button
                    key={f.id}
                    onClick={() => handleChallengeFriend(f)}
                    className="flex flex-col items-center gap-1.5 bg-card border-2 border-border rounded-2xl p-3 min-w-[80px] shadow-sm hover:border-orange-400 transition-colors"
                  >
                    <span className="text-3xl">{resolveAvatar(f.avatar)}</span>
                    <span className="text-xs font-semibold text-foreground truncate max-w-[70px]">{f.display_name}</span>
                    <span className="flex items-center gap-1 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                      <Swords size={10} /> Duel
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {acceptedFriends.length === 0 && (
            <div className="bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-5 text-center text-sm text-slate-500">
              Add friends first to challenge them to a duel!
            </div>
          )}

          {/* Duel list */}
          {duels.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Swords className="mx-auto mb-3 opacity-30" size={48} />
              <p className="font-semibold">No duels yet!</p>
              <p className="text-sm mt-1">Challenge a friend to start your first duel.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {duels.map(duel => (
                <div key={duel.id} className={`rounded-2xl p-4 border-2 ${
                  duel.status === 'won'     ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700' :
                  duel.status === 'lost'    ? 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-700' :
                  duel.status === 'active'  ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700' :
                                             'bg-orange-50 dark:bg-orange-950/30 border-orange-300 dark:border-orange-700'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{duel.questIcon}</div>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-foreground">{duel.questTitle}</p>
                      <p className="text-muted-foreground text-xs">vs {duel.opponentAvatar} {duel.opponentName} · {duel.createdAt}</p>
                    </div>
                    <div>
                      {duel.status === 'pending' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded-full">
                          <Clock size={10} /> Waiting
                        </span>
                      )}
                      {duel.status === 'active' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
                          ⚔️ Active
                        </span>
                      )}
                      {duel.status === 'won' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
                          🏆 You Won!
                        </span>
                      )}
                      {duel.status === 'lost' && (
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
                          Try again
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── ADD FRIEND DIALOG ───────────────────────────────────────────────── */}
      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>➕ Add a Friend</DialogTitle>
            <DialogDescription>Enter a friend's username to send them a friend request.</DialogDescription>
          </DialogHeader>

          {friendRequestMsg && (
            <div className={`rounded-xl p-3 text-sm ${
              friendRequestMsg.type === 'ok' ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
            }`}>
              {friendRequestMsg.text}
            </div>
          )}

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="username (e.g. coolkid_123)"
                value={friendUsername}
                onChange={e => setFriendUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddFriend()}
              />
            </div>
            <Button onClick={handleAddFriend} disabled={friendSearchLoading || !friendUsername.trim()} className="bg-green-500 hover:bg-green-600">
              {friendSearchLoading ? <Loader2 size={16} className="animate-spin" /> : 'Send'}
            </Button>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFriendDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── CHALLENGE DIALOG ────────────────────────────────────────────────── */}
      <Dialog open={showChallengeDialog} onOpenChange={setShowChallengeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>⚔️ Challenge {challengeTarget?.display_name}!</DialogTitle>
            <DialogDescription>Pick a quest. Whoever completes it first wins the duel! 🏆</DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {ageAppropriateQuests.slice(0, 15).map(q => (
              <button
                key={q.id}
                onClick={() => setSelectedQuestId(q.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                  selectedQuestId === q.id
                    ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30'
                    : 'border-border hover:border-orange-300'
                }`}
              >
                <span className="text-2xl">{q.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{q.title}</p>
                  <p className="text-xs text-muted-foreground capitalize">{q.difficulty} · {q.points} SC</p>
                </div>
                {selectedQuestId === q.id && <CheckCircle className="text-orange-500 flex-shrink-0" size={18} />}
              </button>
            ))}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowChallengeDialog(false)}>Cancel</Button>
            <Button
              onClick={handleSendChallenge}
              disabled={!selectedQuestId}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Send Challenge! ⚔️
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
