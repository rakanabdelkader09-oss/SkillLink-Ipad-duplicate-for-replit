import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { useTranslation, Language } from './translations';

interface LeaderboardScreenProps {
  language?: Language;
}

export function LeaderboardScreen({ language = 'en' }: LeaderboardScreenProps = {}) {
  const t = useTranslation(language);
  const players = [
    { rank: 1, name: 'Emma', avatar: '👧', points: 2150, streak: 14, badge: '👑' },
    { rank: 2, name: 'Noah', avatar: '👦', points: 1890, streak: 12, badge: '⭐' },
    { rank: 3, name: 'Olivia', avatar: '👧', points: 1765, streak: 10, badge: '🏆' },
    { rank: 4, name: 'Liam', avatar: '👦', points: 1520, streak: 8, badge: '🎖️' },
    { rank: 5, name: 'Ava', avatar: '👧', points: 1340, streak: 9, badge: '🌟' },
    { rank: 6, name: 'Alex (You)', avatar: '🧒', points: 1247, streak: 7, badge: '💫', isCurrentUser: true },
    { rank: 7, name: 'Sophia', avatar: '👧', points: 1105, streak: 6, badge: '✨' },
    { rank: 8, name: 'Mason', avatar: '👦', points: 980, streak: 5, badge: '🎯' },
  ];

  return (
    <div className="h-full bg-background pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white mb-2">{t.leaderboard}</h2>
            <p className="text-white/80">{t.topLearners} 🏆</p>
          </div>
          <Trophy className="text-white" size={40} />
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-6 mt-8">
        <div className="flex items-end justify-center gap-5 mb-8">
          {/* 2nd Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-slate-200 to-slate-300 border-4 border-slate-400 rounded-2xl p-5 mb-2">
              <div className="text-4xl mb-2">{players[1].avatar}</div>
              <div className="flex items-center justify-center gap-1 bg-slate-400 rounded-full px-2 py-1 mb-2">
                <Medal size={16} className="text-white" />
                <span className="text-white text-sm">2nd</span>
              </div>
              <p className="text-slate-700">{players[1].name}</p>
              <p className="text-slate-600">{players[1].points}</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex-1 text-center -mt-6">
            <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 border-4 border-yellow-500 rounded-2xl p-6 mb-2 shadow-xl">
              <div className="text-5xl mb-2 animate-bounce">{players[0].avatar}</div>
              <div className="flex items-center justify-center gap-1 bg-yellow-500 rounded-full px-3 py-1 mb-2">
                <Trophy size={18} className="text-white" fill="currentColor" />
                <span className="text-white">1st</span>
              </div>
              <p className="text-yellow-900">{players[0].name}</p>
              <p className="text-yellow-800">{players[0].points}</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex-1 text-center">
            <div className="bg-gradient-to-br from-orange-200 to-orange-300 border-4 border-orange-400 rounded-2xl p-5 mb-2">
              <div className="text-4xl mb-2">{players[2].avatar}</div>
              <div className="flex items-center justify-center gap-1 bg-orange-400 rounded-full px-2 py-1 mb-2">
                <Award size={16} className="text-white" />
                <span className="text-white text-sm">3rd</span>
              </div>
              <p className="text-orange-700">{players[2].name}</p>
              <p className="text-orange-600">{players[2].points}</p>
            </div>
          </div>
        </div>

        {/* Rest of Rankings */}
        <div className="space-y-3">
          {players.slice(3).map((player) => (
            <div
              key={player.rank}
              className={`rounded-2xl p-4 flex items-center gap-4 ${
                player.isCurrentUser
                  ? 'bg-primary text-primary-foreground shadow-lg border-2 border-primary'
                  : 'bg-card border-2 border-border shadow-md'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                player.isCurrentUser ? 'bg-white/20' : 'bg-muted'
              }`}>
                <span className={player.isCurrentUser ? 'text-primary-foreground' : 'text-primary'}>
                  #{player.rank}
                </span>
              </div>

              <div className="text-3xl">{player.avatar}</div>

              <div className="flex-1">
                <p className={player.isCurrentUser ? 'text-primary-foreground' : 'text-foreground'}>
                  {player.name}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className={`text-sm ${player.isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                    🔥 {player.streak} {t.dayStreak}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <Badge className={player.isCurrentUser ? 'bg-primary-foreground text-primary' : 'bg-primary'}>
                  {player.points}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="mt-6 mb-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-300 dark:border-green-700 rounded-3xl p-5 text-center">
          <TrendingUp className="text-green-600 dark:text-green-400 mx-auto mb-2" size={32} />
          <h3 className="text-green-700 dark:text-green-300 mb-1">{t.keepGoingMessage}</h3>
          <p className="text-green-600 dark:text-green-400">{language === 'en' ? "You're only 93" : language === 'es' ? 'Solo 93' : language === 'fr' ? 'Seulement 93' : language === 'de' ? 'Nur 93' : language === 'ja' ? 'あと93' : language === 'zh' ? '只差93' : "You're only 93"} {t.pointsAway} 🎯</p>
        </div>
      </div>
    </div>
  );
}
