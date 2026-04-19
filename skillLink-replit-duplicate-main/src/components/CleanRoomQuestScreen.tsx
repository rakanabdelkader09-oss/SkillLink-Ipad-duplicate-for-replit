import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Camera, CheckCircle, Play, Pause, RotateCcw, Zap, Upload, Star, Trophy } from 'lucide-react';
import { Progress } from './ui/progress';
import { SkillCoin } from './CurrencyIcons';

interface CleanRoomQuestScreenProps {
  onBack: () => void;
  onComplete?: (points: number) => void;
}

interface SubTask {
  id: string;
  title: string;
  description: string;
  emoji: string;
  points: number;
  completed: boolean;
}

const INITIAL_SUBTASKS: SubTask[] = [
  { id: 'floor', title: 'Clear the Floor', description: 'Pick up everything off the floor and put it away.', emoji: '🧹', points: 8, completed: false },
  { id: 'bed', title: 'Make the Bed', description: 'Straighten your sheets, blankets, and fluff your pillow.', emoji: '🛏️', points: 6, completed: false },
  { id: 'desk', title: 'Organize Desk', description: 'Clear your desk, put away books and supplies neatly.', emoji: '📚', points: 7, completed: false },
  { id: 'clothes', title: 'Sort Clothes', description: 'Put dirty clothes in the hamper and fold clean ones.', emoji: '👕', points: 6, completed: false },
  { id: 'shelves', title: 'Tidy Shelves', description: 'Arrange books, toys, and decorations on shelves.', emoji: '🗂️', points: 5, completed: false },
  { id: 'dust', title: 'Wipe Surfaces', description: 'Give surfaces a quick wipe to remove dust.', emoji: '✨', points: 5, completed: false },
  { id: 'photo', title: 'Take Proof Photo', description: 'Snap a photo to show how clean your room is!', emoji: '📸', points: 8, completed: false },
];

const TOTAL_POINTS = INITIAL_SUBTASKS.reduce((s, t) => s + t.points, 0);

function SpeedCleanTimer({ onFinish }: { onFinish: () => void }) {
  const [seconds, setSeconds] = useState(10 * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (running && seconds > 0) {
      ref.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setRunning(false);
            setFinished(true);
            clearInterval(ref.current);
            onFinish();
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = ((10 * 60 - seconds) / (10 * 60)) * 100;

  return (
    <div className={`rounded-3xl p-5 mb-5 border-2 transition-all ${finished ? 'bg-green-50 border-green-300 dark:bg-green-950/20 dark:border-green-700' : running ? 'bg-blue-50 border-blue-300 dark:bg-blue-950/20 dark:border-blue-700' : 'bg-card border-border'}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap size={20} className={running ? 'text-blue-500' : 'text-muted-foreground'} />
          <h3 className="font-bold text-foreground">Speed Clean Timer</h3>
        </div>
        {!running && !finished && (
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Optional</span>
        )}
      </div>

      {/* Timer display */}
      <div className={`w-full rounded-2xl py-5 flex flex-col items-center justify-center mb-3 transition-all ${finished ? 'bg-green-100 dark:bg-green-900/30' : running ? 'bg-blue-500' : 'bg-muted'}`}>
        <span className={`text-5xl font-bold font-mono ${finished ? 'text-green-600' : running ? 'text-white' : 'text-foreground'}`}>
          {finished ? '🏆 Done!' : `${mins}:${secs.toString().padStart(2, '0')}`}
        </span>
        <span className={`text-sm mt-1 ${running ? 'text-blue-100' : 'text-muted-foreground'}`}>
          {finished ? 'Speed clean complete!' : running ? 'Racing the clock!' : 'Tap to race the clock ⚡'}
        </span>
      </div>

      {running && (
        <Progress value={pct} className="h-2 mb-3" />
      )}

      <div className="flex gap-2">
        {!finished && (
          <button
            onClick={() => setRunning(r => !r)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${running ? 'bg-orange-100 text-orange-600 border-2 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400' : 'bg-blue-500 text-white'}`}
          >
            {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> {seconds < 10 * 60 ? 'Resume' : 'Start Race!'}</>}
          </button>
        )}
        <button
          onClick={() => { setRunning(false); setSeconds(10 * 60); setFinished(false); }}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-muted text-muted-foreground border-2 border-border"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}

export function CleanRoomQuestScreen({ onBack, onComplete }: CleanRoomQuestScreenProps) {
  const [subtasks, setSubtasks] = useState<SubTask[]>(INITIAL_SUBTASKS);
  const [proofPhoto, setProofPhoto] = useState<File | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [speedBonus, setSpeedBonus] = useState(false);

  const completedCount = subtasks.filter(t => t.completed).length;
  const earnedPoints = subtasks.filter(t => t.completed).reduce((s, t) => s + t.points, 0);
  const progress = (completedCount / subtasks.length) * 100;
  const allDone = completedCount === subtasks.length;

  const cleanlinessLabel = progress === 0 ? 'Disaster Zone 🌪️' :
    progress < 30 ? 'Getting Started 🧹' :
    progress < 60 ? 'Making Progress! 👍' :
    progress < 85 ? 'Almost There! ✨' :
    progress < 100 ? 'Nearly Spotless! 💫' : 'Spotless! 🏆';

  const toggleTask = (id: string) => {
    setSubtasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setProofPhoto(e.target.files[0]);
      setSubtasks(prev => prev.map(t => t.id === 'photo' ? { ...t, completed: true } : t));
    }
  };

  const handleComplete = () => {
    setShowCelebration(true);
    onComplete?.(earnedPoints + (speedBonus ? 15 : 0));
  };

  if (showCelebration) {
    return (
      <div className="h-full bg-gradient-to-b from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 flex flex-col items-center justify-center px-6 pb-20 overflow-y-auto">
        <div className="text-center">
          <div className="mb-6 animate-bounce">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-8 inline-block shadow-2xl">
              <Trophy className="text-white" size={80} />
            </div>
          </div>
          <h2 className="text-green-600 font-bold text-3xl mb-2">Room Conquered! 🎉</h2>
          <p className="text-muted-foreground mb-6">You're a cleaning champion!</p>

          <div className="bg-white dark:bg-card border-4 border-yellow-300 rounded-3xl p-6 mb-5 shadow-xl">
            <div className="text-6xl mb-3">🏠✨</div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 mb-3">
              <div className="flex items-center justify-center gap-2">
                <SkillCoin size={32} />
                <span className="text-white text-3xl font-bold">+{earnedPoints + (speedBonus ? 15 : 0)}</span>
              </div>
              <p className="text-yellow-100 text-sm text-center">SC Coins Earned!</p>
            </div>
            {speedBonus && (
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3 mb-3 border border-blue-200">
                <p className="text-blue-700 dark:text-blue-300 font-bold text-center">⚡ Speed Clean Bonus: +15 pts!</p>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-2 text-center">
                  <Star size={20} className="text-yellow-500 mx-auto" fill="currentColor" />
                  <p className="text-xs text-muted-foreground mt-1">Star {i + 1}</p>
                </div>
              ))}
            </div>
          </div>

          <button onClick={onBack} className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform">
            Back to Quests 🎮
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-400 to-amber-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-2 active:opacity-70">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="text-center">
          <div className="text-7xl mb-3">🏠</div>
          <h2 className="text-white font-bold text-2xl mb-1">Clean Your Room</h2>
          <span className="inline-block bg-orange-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            ⭐⭐⭐ Hard — Hero Quest
          </span>
          <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-5 py-2">
            <SkillCoin size={22} />
            <span className="text-white font-semibold">Worth up to {TOTAL_POINTS} SC coins</span>
          </div>
        </div>
      </div>

      <div className="px-6 mt-5">
        {/* Cleanliness Meter */}
        <div className="bg-card border-2 border-border rounded-3xl p-5 mb-5 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-foreground">Cleanliness Meter</h3>
            <span className="text-sm font-bold text-primary">{cleanlinessLabel}</span>
          </div>
          <div className="relative h-6 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: progress < 30 ? '#ef4444' : progress < 60 ? '#f59e0b' : progress < 85 ? '#3b82f6' : '#10b981',
              }}
            />
            {progress > 5 && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
                {Math.round(progress)}%
              </span>
            )}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>🌪️ Messy</span>
            <span>{completedCount}/{subtasks.length} tasks</span>
            <span>✨ Spotless</span>
          </div>
        </div>

        {/* Points earned */}
        <div className="bg-gradient-to-r from-yellow-400 to-amber-400 rounded-3xl p-4 mb-5 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SkillCoin size={28} />
              <div>
                <p className="text-white font-bold text-lg">{earnedPoints} pts earned</p>
                <p className="text-yellow-100 text-xs">{TOTAL_POINTS - earnedPoints} more available</p>
              </div>
            </div>
            <div className="bg-white/20 rounded-2xl px-3 py-2">
              <p className="text-white font-bold">{completedCount}/{subtasks.length}</p>
              <p className="text-yellow-100 text-xs">tasks</p>
            </div>
          </div>
        </div>

        {/* Speed Clean Timer */}
        <SpeedCleanTimer onFinish={() => setSpeedBonus(true)} />

        {/* Sub-tasks */}
        <h3 className="font-bold text-foreground mb-3">Your Cleaning Checklist</h3>
        <div className="space-y-3 mb-5">
          {subtasks.map((task) => (
            <div
              key={task.id}
              className={`rounded-3xl border-2 p-4 transition-all shadow-sm ${
                task.completed
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-300 dark:border-green-700'
                  : 'bg-card border-border'
              }`}
            >
              {task.id === 'photo' ? (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${task.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-muted'}`}>
                      {task.emoji}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                      <p className="text-muted-foreground text-xs">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${task.completed ? 'text-green-600' : 'text-primary'}`}>+{task.points} pts</span>
                      {task.completed && <CheckCircle className="text-green-500" size={22} />}
                    </div>
                  </div>
                  {!task.completed && (
                    <label className="block cursor-pointer">
                      <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-2xl p-4 text-center bg-blue-50 dark:bg-blue-950/20 active:bg-blue-100 transition-colors">
                        {proofPhoto ? (
                          <><CheckCircle className="text-green-500 mx-auto mb-1" size={28} /><p className="text-green-700 font-semibold text-sm">{proofPhoto.name}</p></>
                        ) : (
                          <><Camera className="text-blue-400 mx-auto mb-1" size={28} /><p className="text-blue-600 font-semibold text-sm">Tap to upload proof photo</p></>
                        )}
                      </div>
                      <input type="file" accept="image/*,video/*" capture="environment" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                  )}
                </div>
              ) : (
                <button
                  className="w-full flex items-center gap-3 text-left"
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-all ${task.completed ? 'bg-green-100 dark:bg-green-900/30' : 'bg-muted'}`}>
                    {task.completed ? '✅' : task.emoji}
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold transition-all ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                    <p className="text-muted-foreground text-xs">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-xs font-bold ${task.completed ? 'text-green-600' : 'text-primary'}`}>+{task.points} pts</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-green-500 border-green-500' : 'border-border'}`}>
                      {task.completed && <CheckCircle size={14} className="text-white" />}
                    </div>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Complete button */}
        {allDone ? (
          <button
            onClick={handleComplete}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-3xl font-bold text-xl shadow-xl animate-pulse active:scale-95 transition-transform"
          >
            🏆 Complete Quest! (+{earnedPoints + (speedBonus ? 15 : 0)} pts)
          </button>
        ) : (
          <div className="bg-card border-2 border-border rounded-3xl p-4 text-center">
            <p className="text-muted-foreground text-sm">Complete {subtasks.length - completedCount} more task{subtasks.length - completedCount !== 1 ? 's' : ''} to finish!</p>
            <Progress value={progress} className="h-2 mt-3" />
          </div>
        )}
      </div>
    </div>
  );
}
