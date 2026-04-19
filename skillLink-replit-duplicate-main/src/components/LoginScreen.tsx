import { Button } from './ui/button';
import { Input } from './ui/input';
import { Baby, User } from 'lucide-react';
import { useState } from 'react';

interface LoginScreenProps {
  onLogin: (userType: 'kid' | 'parent') => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [selectedType, setSelectedType] = useState<'kid' | 'parent' | null>(null);

  if (!selectedType) {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <h2 className="text-center text-blue-600 mb-2">Welcome to</h2>
          <h1 className="text-center text-blue-600 mb-12">SkillLink</h1>
          
          <p className="text-center text-slate-600 mb-8">Who's logging in today?</p>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedType('kid')}
              className="w-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white p-6 rounded-3xl shadow-lg flex items-center justify-center gap-4 transform hover:scale-105 transition-all"
            >
              <div className="bg-white rounded-full p-3">
                <Baby className="text-[#2563eb]" size={32} />
              </div>
              <span className="text-2xl">I'm a Kid</span>
            </button>

            <button
              onClick={() => setSelectedType('parent')}
              className="w-full bg-white border-4 border-blue-200 hover:border-blue-300 text-blue-600 p-6 rounded-3xl shadow-md flex items-center justify-center gap-4 transform hover:scale-105 transition-all"
            >
              <div className="bg-blue-100 rounded-full p-3">
                <User className="text-blue-600" size={32} />
              </div>
              <span className="text-2xl">I'm a Parent</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
      <div className="max-w-sm w-full">
        <button
          onClick={() => setSelectedType(null)}
          className="text-blue-500 mb-6"
        >
          ← Back
        </button>

        <h2 className="text-center text-blue-600 mb-8">
          {selectedType === 'kid' ? '👋 Hey Kid!' : '👋 Welcome Parent!'}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="text-slate-700 mb-2 block">Username</label>
            <Input
              placeholder={selectedType === 'kid' ? 'Your cool username' : 'Email or username'}
              className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
            />
          </div>

          <div>
            <label className="text-slate-700 mb-2 block">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
            />
          </div>

          <Button
            onClick={() => onLogin(selectedType)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 rounded-2xl text-lg shadow-lg"
          >
            Login
          </Button>

          <p className="text-center text-slate-500">
            Don't have an account?{' '}
            <span className="text-blue-500 cursor-pointer">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}