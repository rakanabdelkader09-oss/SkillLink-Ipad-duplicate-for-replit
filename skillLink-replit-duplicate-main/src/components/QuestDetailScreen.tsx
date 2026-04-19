import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, Sparkles, Users, Upload, Camera, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { SkillCoin } from './CurrencyIcons';

interface QuestDetailScreenProps {
  questId: number;
  onBack: () => void;
  onStartChallenge?: (questId: number) => void;
  onSoloSubmit?: (questId: number, videoFile: File | null) => void;
  questData?: any;
  language?: string;
}


// Dynamic Timer Component — click to start/stop, hold to reset
function DynamicTimer({ defaultSeconds = 120 }: { defaultSeconds?: number }) {
  const [seconds, setSeconds] = useState(defaultSeconds);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<'countdown' | 'countup'>('countdown');
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => {
          if (mode === 'countdown') {
            if (prev <= 1) { setRunning(false); return 0; }
            return prev - 1;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const toggle = () => setRunning(r => !r);
  const reset = () => { setRunning(false); setSeconds(defaultSeconds); };
  const toggleMode = () => {
    setRunning(false);
    setMode(m => m === 'countdown' ? 'countup' : 'countdown');
    setSeconds(mode === 'countdown' ? 0 : defaultSeconds);
  };

  const mins = Math.floor(Math.abs(seconds) / 60);
  const secs = Math.abs(seconds) % 60;
  const display = `${mins}:${secs.toString().padStart(2, '0')}`;
  const isFinished = mode === 'countdown' && seconds === 0;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-5 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-blue-700 font-bold">⏱️ Timer</h3>
        <button
          onClick={toggleMode}
          className="text-xs text-blue-500 border border-blue-300 rounded-full px-3 py-1"
        >
          {mode === 'countdown' ? '↓ Countdown' : '↑ Count Up'}
        </button>
      </div>

      {/* Big clickable timer display */}
      <button
        onClick={toggle}
        className={`w-full rounded-2xl py-6 mb-3 flex flex-col items-center justify-center transition-all active:scale-95 shadow-inner ${
          isFinished ? 'bg-green-100 border-2 border-green-300' :
          running ? 'bg-blue-500' : 'bg-white border-2 border-blue-300'
        }`}
      >
        <span className={`text-5xl font-bold font-mono ${
          isFinished ? 'text-green-600' : running ? 'text-white' : 'text-blue-600'
        }`}>
          {isFinished ? '✅ Done!' : display}
        </span>
        <span className={`text-sm mt-1 ${running ? 'text-blue-100' : 'text-blue-400'}`}>
          {isFinished ? 'Great job!' : running ? 'Tap to pause' : 'Tap to start'}
        </span>
      </button>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={toggle}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
            running ? 'bg-orange-100 text-orange-600 border-2 border-orange-200' : 'bg-blue-500 text-white'
          }`}
        >
          {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}
        </button>
        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-gray-600 border-2 border-gray-200"
        >
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}

export function QuestDetailScreen({ questId, onBack, onStartChallenge, onSoloSubmit, questData: propQuestData }: QuestDetailScreenProps) {
  const [completionMode, setCompletionMode] = useState<'select' | 'solo' | 'challenge' | 'complete'>('select');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const defaultQuestData: Record<number, any> = {
    1: { title: 'Brush your teeth', icon: '🪥', points: 10, instructions: ['Get your toothbrush and toothpaste', 'Put a pea-sized amount on the brush', 'Brush for 2 minutes (all teeth!)', 'Rinse your mouth with water', 'Put everything away neatly'], tips: 'Brush twice a day - morning and night!', color: 'from-[#2563eb] to-[#1d4ed8]', timerSeconds: 120 },
    3: { title: 'Draw your favorite animal', icon: '🎨', points: 25, instructions: ['Get paper and drawing tools', 'Think about your favorite animal', 'Start with simple shapes', 'Add details like eyes, ears, tail', 'Color it in if you want!', 'Show it to someone you love'], tips: "Don't worry about making it perfect!", color: 'from-purple-400 to-purple-500', timerSeconds: 600 },
    6: { title: 'Do 10 jumping jacks', icon: '🤸', points: 10, instructions: ['Stand up straight with feet together', 'Jump and spread your feet, raise arms', 'Jump again, bring feet together arms down', 'Do this 10 times!', 'Take a deep breath when done'], tips: 'Count out loud to make it fun!', color: 'from-green-400 to-green-500', timerSeconds: 60 },
  };

  const quest = propQuestData || defaultQuestData[questId] || defaultQuestData[1];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSoloSubmit = () => {
    if (onSoloSubmit) onSoloSubmit(questId, selectedFile);
    setCompletionMode('complete');
  };

  const handleChallengeMode = () => {
    if (onStartChallenge) onStartChallenge(questId);
  };

  // Solo upload screen
  if (completionMode === 'solo') {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50 to-white pb-20 overflow-y-auto">
        <div className={`bg-gradient-to-r ${quest.color} px-6 pt-12 pb-6 rounded-b-[3rem] shadow-lg`}>
          <button onClick={() => setCompletionMode('select')} className="text-white mb-3 flex items-center gap-2">
            <ArrowLeft size={20} /> Back
          </button>
          <div className="text-center">
            <div className="text-6xl mb-2">{quest.icon}</div>
            <h2 className="text-white font-bold">{quest.title}</h2>
          </div>
        </div>

        <div className="px-6 mt-6">
          {/* Timer */}
          <DynamicTimer defaultSeconds={quest.timerSeconds || 120} />

          {/* Upload */}
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 mb-4 shadow-md">
            <h3 className="text-blue-600 font-bold mb-4">📸 Upload Your Proof</h3>
            <label className="block cursor-pointer">
              <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${selectedFile ? 'border-green-400 bg-green-50' : 'border-blue-300 bg-blue-50'}`}>
                {selectedFile ? (
                  <>
                    <CheckCircle className="text-green-500 mx-auto mb-2" size={40} />
                    <p className="text-green-700 font-semibold">{selectedFile.name}</p>
                    <p className="text-green-500 text-sm mt-1">Tap to change</p>
                  </>
                ) : (
                  <>
                    <Camera className="text-blue-400 mx-auto mb-2" size={40} />
                    <p className="text-blue-600 font-semibold">Tap to upload photo/video</p>
                    <p className="text-blue-400 text-sm mt-1">Show you completed the quest</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
            </label>
          </div>

          <Button
            onClick={handleSoloSubmit}
            disabled={!selectedFile}
            className={`w-full h-16 rounded-2xl text-lg font-bold ${selectedFile ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            <Upload className="mr-2" size={24} /> Submit for Review
          </Button>
          <p className="text-center text-gray-400 text-sm mt-3">Your parent will review and approve</p>
        </div>
      </div>
    );
  }

  // Completion screen
  if (completionMode === 'complete') {
    return (
      <div className="h-full bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center">
          <div className="mb-6 animate-bounce">
            <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-full p-8 inline-block shadow-2xl">
              <CheckCircle className="text-white" size={80} />
            </div>
          </div>
          <h2 className="text-green-600 font-bold text-3xl mb-4">Quest Submitted! 🎉</h2>
          <div className="bg-white border-4 border-green-300 rounded-3xl p-8 mb-6 shadow-xl">
            <div className="text-6xl mb-4">{quest.icon}</div>
            <h3 className="text-gray-700 font-bold text-xl mb-6">{quest.title}</h3>
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-6">
              <div className="flex items-center justify-center gap-2 mb-1">
                <SkillCoin size={32} />
                <span className="text-white text-3xl font-bold">+{quest.points}</span>
              </div>
              <p className="text-yellow-100 text-sm">SC Coins (pending approval)</p>
            </div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-5 mb-6">
            <p className="text-yellow-700 font-semibold">⏳ Waiting for parent approval</p>
            <p className="text-yellow-600 text-sm mt-1">You'll get your coins once approved!</p>
          </div>
          <Button onClick={onBack} className="bg-blue-500 text-white px-12 py-4 rounded-full shadow-lg text-lg">
            Back to Quests
          </Button>
        </div>
      </div>
    );
  }

  // Main quest detail
  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-white pb-20 overflow-y-auto">
      <div className={`bg-gradient-to-r ${quest.color} px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg`}>
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-2">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="text-center">
          <div className="text-7xl mb-4">{quest.icon}</div>
          <h2 className="text-white font-bold text-2xl mb-3">{quest.title}</h2>
          {quest.difficulty && (
            <div className="mb-3">
              <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-semibold ${quest.difficulty === 'easy' ? 'bg-green-500' : quest.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-orange-500'}`}>
                {quest.difficulty === 'easy' && '⭐ Easy'}
                {quest.difficulty === 'medium' && '⭐⭐ Medium'}
                {quest.difficulty === 'hard' && '⭐⭐⭐ Hard'}
              </span>
            </div>
          )}
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-flex items-center gap-2">
            <SkillCoin size={22} />
            <span className="text-white font-semibold">Worth {quest.points} SC coins</span>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        {/* Timer */}
        <DynamicTimer defaultSeconds={quest.timerSeconds || 120} />

        {/* Instructions */}
        <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 shadow-md mb-4">
          <h3 className="text-blue-600 font-bold mb-4">How to complete this quest:</h3>
          <div className="space-y-3">
            {quest.instructions.map((instruction: string, index: number) => (
              <div key={index} className="flex gap-3">
                <div className="bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-600 flex-1">{instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-3xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-purple-600" size={20} />
            <h3 className="text-purple-700 font-bold">Pro Tip!</h3>
          </div>
          <p className="text-purple-600">{quest.tips}</p>
        </div>

        {/* Mode selection */}
        <h3 className="text-gray-700 font-bold mb-4">How do you want to complete this?</h3>

        <button
          onClick={() => setCompletionMode('solo')}
          className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-3xl p-6 mb-4 shadow-lg active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3"><Camera className="text-blue-500" size={32} /></div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-1">Do It Solo</h3>
              <p className="text-blue-100 text-sm">Complete on your own and upload proof</p>
            </div>
          </div>
        </button>

        <button
          onClick={handleChallengeMode}
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-3xl p-6 shadow-lg mb-6 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white rounded-full p-3"><Users className="text-orange-500" size={32} /></div>
            <div className="text-left">
              <h3 className="text-xl font-bold mb-1">Challenge Mode</h3>
              <p className="text-orange-100 text-sm">Do it with friends or parents 🎮</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
