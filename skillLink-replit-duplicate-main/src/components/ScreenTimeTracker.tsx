import { useState, useEffect } from 'react';
import { Clock, Trophy, Zap } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface ScreenTimeTrackerProps {
  onNavigate?: (screen: string) => void;
}

export function ScreenTimeTracker({ onNavigate }: ScreenTimeTrackerProps) {
  // Mock data - in real app would track actual screen time
  const [hoursOff, setHoursOff] = useState(4);
  const [minutesOff, setMinutesOff] = useState(32);
  const [streak, setStreak] = useState(3);
  const [pointsEarned, setPointsEarned] = useState(40);

  const totalMinutes = hoursOff * 60 + minutesOff;
  const progressToNextReward = ((totalMinutes % 180) / 180) * 100; // Progress to 3-hour mark
  
  const getStatus = () => {
    if (hoursOff >= 6) return { color: 'from-green-400 to-emerald-500', status: 'Amazing!', emoji: '🌟' };
    if (hoursOff >= 3) return { color: 'from-blue-400 to-cyan-500', status: 'Great!', emoji: '💪' };
    if (hoursOff >= 1) return { color: 'from-yellow-400 to-orange-400', status: 'Good Start', emoji: '👍' };
    return { color: 'from-orange-400 to-red-400', status: 'Keep Going', emoji: '🎯' };
  };

  const status = getStatus();

  const getNextReward = () => {
    if (hoursOff >= 6) return { hours: 24, points: 150 };
    if (hoursOff >= 3) return { hours: 6, points: 60 };
    if (hoursOff >= 1) return { hours: 3, points: 30 };
    return { hours: 1, points: 10 };
  };

  const nextReward = getNextReward();

  return (
    <div className={`bg-gradient-to-r ${status.color} rounded-3xl p-5 shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <div className="bg-white/30 backdrop-blur-sm rounded-full p-2">
            <Clock className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-white">Focus Time</h3>
            <p className="text-white/90 text-sm">Off Brainrot Content {status.emoji}</p>
          </div>
        </div>
        <Badge className="bg-white/30 text-white backdrop-blur-sm">
          {streak} day streak 🔥
        </Badge>
      </div>

      {/* Main Timer */}
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-3">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center gap-4">
            <span className="text-white text-5xl">{hoursOff}</span>
            <span className="text-white/80 text-2xl">h</span>
            <span className="text-white text-5xl">{minutesOff}</span>
            <span className="text-white/80 text-2xl">m</span>
          </div>
          <p className="text-white/90 mt-2">{status.status}</p>
        </div>

        {/* Progress to Next Reward */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Next reward at {nextReward.hours}h</span>
            <span className="text-white text-sm">+{nextReward.points} pts</span>
          </div>
          <Progress value={progressToNextReward} className="h-2 bg-white/30" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 text-center">
          <Trophy className="text-yellow-300 mx-auto mb-1" size={20} />
          <p className="text-white text-sm">Points Earned</p>
          <p className="text-white">+{pointsEarned}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 text-center">
          <Zap className="text-yellow-300 mx-auto mb-1" size={20} />
          <p className="text-white text-sm">Daily Goal</p>
          <p className="text-white">{Math.min(100, Math.floor((totalMinutes / 360) * 100))}%</p>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="mt-3 text-center">
        <p className="text-white/80 text-sm">
          {hoursOff >= 6 ? "You're a Focus Champion! 🏆" :
           hoursOff >= 3 ? "Keep it up! You're doing great! 💪" :
           hoursOff >= 1 ? "Good start! Stay focused! 🎯" :
           "Every minute counts! You got this! 🌟"}
        </p>
      </div>
    </div>
  );
}
