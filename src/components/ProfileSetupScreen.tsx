import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Sparkles, User, Calendar, Users, ChevronRight } from 'lucide-react';

interface ProfileSetupScreenProps {
  userType: 'kid' | 'parent';
  onComplete: (profile: UserProfile) => void;
}

export interface UserProfile {
  name: string;
  age: number;
  avatar: string;
  parentName?: string;
  childCount?: number;
}

const KID_EMOJIS = [
  '😊', '😄', '🤩', '😎', '🥳', '🦸', '🧙', '🧒', '👦', '👧',
  '🐶', '🐱', '🦊', '🐸', '🐧', '🦁', '🐼', '🦄', '🐉', '🦋',
  '⚽', '🏀', '🎸', '🎨', '🚀', '🌟', '⚡', '🍕', '🍭', '🌈',
];

const PARENT_EMOJIS = [
  '👨‍💼', '👩‍💼', '👨‍🏫', '👩‍🏫', '👨‍🍳', '👩‍🍳', '👨‍⚕️', '👩‍⚕️', '🧑‍💻', '👩‍💻',
  '😊', '🙂', '😎', '🤗', '💪', '🌟', '❤️', '🏆', '🎯', '🌱',
];

function EmojiPicker({ emojis, selected, onSelect }: { emojis: string[]; selected: string; onSelect: (e: string) => void }) {
  return (
    <div className="grid grid-cols-6 gap-4">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelect(emoji)}
          className={`text-2xl rounded-2xl p-2 flex items-center justify-center transition-all active:scale-90 ${
            selected === emoji
              ? 'bg-blue-100 border-2 border-blue-500 shadow-md scale-110'
              : 'bg-muted border-2 border-transparent hover:border-blue-200'
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}

export function ProfileSetupScreen({ userType, onComplete }: ProfileSetupScreenProps) {
  const [step, setStep] = useState<'info' | 'avatar'>('info');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [childCount, setChildCount] = useState('1');
  const [selectedEmoji, setSelectedEmoji] = useState(userType === 'kid' ? '😊' : '👨‍💼');

  const emojis = userType === 'kid' ? KID_EMOJIS : PARENT_EMOJIS;

  const isInfoValid = name.trim() !== '' && age !== '' && parseInt(age) > 0;

  const handleInfoNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInfoValid) setStep('avatar');
  };

  const handleComplete = () => {
    const profile: UserProfile = {
      name,
      age: parseInt(age),
      avatar: selectedEmoji,
      ...(userType === 'parent' && { childCount: parseInt(childCount) }),
    };
    onComplete(profile);
  };

  if (step === 'avatar') {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 overflow-y-auto pb-6">
        <div className="px-6 pt-12">
          <div className="text-center mb-6">
            <div className="text-7xl mb-3 animate-bounce">{selectedEmoji}</div>
            <h2 className="text-slate-700 dark:text-slate-200 font-bold mb-1">Pick Your Avatar!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Choose an emoji that feels like you 🎉</p>
          </div>

          <div className="bg-white dark:bg-card rounded-3xl p-5 shadow-md border-2 border-blue-100 dark:border-blue-900 mb-6">
            <Label className="text-slate-700 dark:text-slate-200 mb-4 block font-semibold">
              {userType === 'kid' ? '👇 Pick your emoji avatar:' : '👇 Choose your profile emoji:'}
            </Label>
            <EmojiPicker emojis={emojis} selected={selectedEmoji} onSelect={setSelectedEmoji} />
          </div>

          <div className="flex gap-5">
            <Button
              type="button"
              onClick={() => setStep('info')}
              variant="outline"
              className="h-14 rounded-3xl flex-1 border-2"
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleComplete}
              className="h-14 bg-gradient-to-r from-[#2563eb] to-purple-500 hover:from-[#1d4ed8] hover:to-purple-600 text-white rounded-3xl flex-1 shadow-lg font-bold"
            >
              <Sparkles className="mr-2" size={18} />
              {userType === 'kid' ? 'Start Learning! 🚀' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 overflow-y-auto pb-6">
      <div className="px-6 pt-12">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-[#2563eb] to-purple-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Sparkles className="text-white" size={40} />
          </div>
          <h2 className="text-slate-700 dark:text-slate-200 font-bold mb-2">
            {userType === 'kid' ? 'Tell us about you!' : 'Parent Profile Setup'}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {userType === 'kid' ? "Let's create your awesome profile! 🎉" : 'Help us personalize your experience'}
          </p>
        </div>

        <form onSubmit={handleInfoNext} className="space-y-5">
          <div className="bg-white dark:bg-card rounded-3xl p-6 shadow-md border-2 border-blue-100 dark:border-blue-900">
            <Label htmlFor="name" className="text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-4 font-semibold">
              <User size={18} className="text-blue-500" />
              {userType === 'kid' ? "What's your name?" : 'Your Name'}
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={userType === 'kid' ? 'Enter your first name' : 'Enter your full name'}
              className="h-12 rounded-2xl border-2 border-blue-200 dark:border-blue-800 focus:border-blue-500"
            />
          </div>

          <div className="bg-white dark:bg-card rounded-3xl p-6 shadow-md border-2 border-blue-100 dark:border-blue-900">
            <Label htmlFor="age" className="text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-4 font-semibold">
              <Calendar size={18} className="text-purple-500" />
              {userType === 'kid' ? 'How old are you?' : 'Your Age'}
            </Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              min={userType === 'kid' ? '6' : '18'}
              max={userType === 'kid' ? '12' : '100'}
              className="h-12 rounded-2xl border-2 border-blue-200 dark:border-blue-800 focus:border-blue-500"
            />
          </div>

          {userType === 'parent' && (
            <div className="bg-white dark:bg-card rounded-3xl p-6 shadow-md border-2 border-blue-100 dark:border-blue-900">
              <Label htmlFor="childCount" className="text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-4 font-semibold">
                <Users size={18} className="text-green-500" />
                How many children do you have?
              </Label>
              <select
                id="childCount"
                value={childCount}
                onChange={(e) => setChildCount(e.target.value)}
                className="w-full h-12 rounded-2xl border-2 border-blue-200 dark:border-blue-800 focus:border-blue-500 px-4 bg-background"
              >
                <option value="1">1 child</option>
                <option value="2">2 children</option>
                <option value="3">3 children</option>
                <option value="4">4+ children</option>
              </select>
            </div>
          )}

          <Button
            type="submit"
            disabled={!isInfoValid}
            className="w-full h-14 bg-gradient-to-r from-[#2563eb] to-purple-500 hover:from-[#1d4ed8] hover:to-purple-600 text-white rounded-3xl shadow-lg disabled:opacity-50 font-bold flex items-center justify-center gap-4"
          >
            Pick Your Avatar
            <ChevronRight size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
