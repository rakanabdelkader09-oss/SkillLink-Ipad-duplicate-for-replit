import { Button } from './ui/button';
import { Input } from './ui/input';
import { Baby, User, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from './ProfileSetupScreen';

interface AuthScreenProps {
  onAuth: (userType: 'kid' | 'parent' | 'creator', profile: UserProfile, isNewUser: boolean) => void;
}

type AuthMode = 'select' | 'signup' | 'login';

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('select');
  const [selectedType, setSelectedType] = useState<'kid' | 'parent' | 'creator' | null>(null);
  
  // Sign Up form state
  const [signupName, setSignupName] = useState('');
  const [signupAge, setSignupAge] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupParentName, setSignupParentName] = useState('');
  const [signupChildCount, setSignupChildCount] = useState('');
  
  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Error states
  const [error, setError] = useState('');

  const handleUserTypeSelect = (type: 'kid' | 'parent' | 'creator', mode: 'signup' | 'login') => {
    setSelectedType(type);
    setAuthMode(mode);
    setError('');
  };

  const handleSignUp = () => {
    setError('');

    // Validation
    if (!signupName.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!signupAge || parseInt(signupAge) <= 0) {
      setError('Please enter a valid age');
      return;
    }

    if (selectedType === 'kid' && (parseInt(signupAge) < 6 || parseInt(signupAge) > 12)) {
      setError('Kids must be between 6-12 years old');
      return;
    }

    if (selectedType === 'parent' && parseInt(signupAge) < 18) {
      setError('Parents must be 18 or older');
      return;
    }

    if (selectedType === 'creator' && parseInt(signupAge) < 18) {
      setError('Creators must be 18 or older');
      return;
    }

    if (!signupPassword || signupPassword.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (selectedType === 'parent') {
      if (!signupParentName.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (!signupChildCount || parseInt(signupChildCount) <= 0) {
        setError('Please enter number of children');
        return;
      }
    }

    // Create user profile
    const profile: UserProfile = {
      name: signupName,
      age: parseInt(signupAge),
      avatar: selectedType === 'kid' ? '👦' : selectedType === 'creator' ? '✨' : '👨',
      ...(selectedType === 'parent' && {
        parentName: signupParentName,
        childCount: parseInt(signupChildCount)
      })
    };

    // In a real app, this would save to database
    // For now, we'll just call onAuth with the profile
    onAuth(selectedType!, profile, true);
  };

  const handleLogin = () => {
    setError('');

    if (!loginUsername.trim()) {
      setError('Please enter your username or email');
      return;
    }

    if (!loginPassword) {
      setError('Please enter your password');
      return;
    }

    // Mock authentication - in a real app, this would verify credentials
    // For demo purposes, we'll create a mock profile
    const mockProfile: UserProfile = {
      name: loginUsername,
      age: selectedType === 'kid' ? 9 : 35,
      avatar: selectedType === 'kid' ? '👦' : selectedType === 'creator' ? '✨' : '👨',
      ...(selectedType === 'parent' && {
        parentName: loginUsername,
        childCount: 2
      })
    };

    onAuth(selectedType!, mockProfile, false);
  };

  const handleBack = () => {
    if (authMode === 'signup' || authMode === 'login') {
      setAuthMode('select');
      setSelectedType(null);
      setError('');
      // Clear form fields
      setSignupName('');
      setSignupAge('');
      setSignupPassword('');
      setSignupConfirmPassword('');
      setSignupParentName('');
      setSignupChildCount('');
      setLoginUsername('');
      setLoginPassword('');
    }
  };

  // User Type Selection Screen
  if (authMode === 'select') {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <h2 className="text-center text-blue-600 mb-2">Welcome to</h2>
          <h1 className="text-center text-blue-600 mb-12">SkillLink</h1>
          
          <p className="text-center text-slate-600 mb-8">Who's joining us today?</p>

          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelect('kid', 'signup')}
              className="w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white p-6 rounded-3xl shadow-lg flex items-center justify-center gap-4 transform hover:scale-105 transition-all"
            >
              <div className="bg-white rounded-full p-3">
                <Baby className="text-[#2563eb]" size={32} />
              </div>
              <span className="text-2xl">I'm a Kid</span>
            </button>

            <button
              onClick={() => handleUserTypeSelect('parent', 'signup')}
              className="w-full bg-white border-4 border-blue-200 hover:border-blue-300 text-[#2563eb] p-6 rounded-3xl shadow-md flex items-center justify-center gap-4 transform hover:scale-105 transition-all"
            >
              <div className="bg-blue-100 rounded-full p-3">
                <User className="text-[#2563eb]" size={32} />
              </div>
              <span className="text-2xl">I'm a Parent</span>
            </button>

            <button
              onClick={() => handleUserTypeSelect('creator', 'signup')}
              className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white p-6 rounded-3xl shadow-lg flex items-center justify-center gap-4 transform hover:scale-105 transition-all"
            >
              <div className="bg-white rounded-full p-3">
                <Sparkles className="text-purple-500" size={32} />
              </div>
              <span className="text-2xl">I'm a Creator</span>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-500 mb-2">Already have an account?</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <button
                onClick={() => handleUserTypeSelect('kid', 'login')}
                className="text-[#2563eb] hover:text-[#1d4ed8] underline"
              >
                Kid Login
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => handleUserTypeSelect('parent', 'login')}
                className="text-[#2563eb] hover:text-[#1d4ed8] underline"
              >
                Parent Login
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => handleUserTypeSelect('creator', 'login')}
                className="text-purple-500 hover:text-purple-600 underline"
              >
                Creator Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Form
  if (authMode === 'signup') {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50 to-white overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-center px-6 py-8">
          <div className="max-w-sm w-full">
            <button
              onClick={handleBack}
              className="text-blue-500 mb-6 hover:text-blue-600"
            >
              ← Back
            </button>

            <h2 className="text-center text-blue-600 mb-2">
              {selectedType === 'kid' ? '🎉 Create Kid Account' : selectedType === 'creator' ? '✨ Create Creator Account' : '👨‍👩‍👧 Create Parent Account'}
            </h2>
            <p className="text-center text-slate-500 mb-8">
              {selectedType === 'kid' 
                ? 'Get ready for an awesome learning adventure!' 
                : selectedType === 'creator'
                ? 'Share your knowledge and earn!'
                : 'Help your child learn and grow!'}
            </p>

            {error && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-slate-700 mb-2 block">
                  {selectedType === 'kid' ? 'Your Name' : selectedType === 'creator' ? 'Your Name' : 'Child\'s Name'}
                </label>
                <Input
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder={selectedType === 'kid' ? 'Enter your name' : selectedType === 'creator' ? 'Enter your name' : 'Enter child\'s name'}
                  className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
                />
              </div>

              <div>
                <label className="text-slate-700 mb-2 block">Age</label>
                <Input
                  type="number"
                  value={signupAge}
                  onChange={(e) => setSignupAge(e.target.value)}
                  placeholder={selectedType === 'kid' ? '6-12 years' : '18+'}
                  className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
                />
              </div>

              {selectedType === 'parent' && (
                <>
                  <div>
                    <label className="text-slate-700 mb-2 block">Your Full Name</label>
                    <Input
                      value={signupParentName}
                      onChange={(e) => setSignupParentName(e.target.value)}
                      placeholder="Enter your full name"
                      className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 mb-2 block">Number of Children</label>
                    <Input
                      type="number"
                      value={signupChildCount}
                      onChange={(e) => setSignupChildCount(e.target.value)}
                      placeholder="How many kids?"
                      className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-slate-700 mb-2 block">Password</label>
                <Input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create a password"
                  className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
                />
              </div>

              <div>
                <label className="text-slate-700 mb-2 block">Confirm Password</label>
                <Input
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
                />
              </div>

              <Button
                onClick={handleSignUp}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 rounded-2xl shadow-lg mt-6"
              >
                Create Account
              </Button>

              <p className="text-center text-slate-500 mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login Form
  if (authMode === 'login') {
    return (
      <div className="h-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <button
            onClick={handleBack}
            className="text-blue-500 mb-6 hover:text-blue-600"
          >
            ← Back
          </button>

          <h2 className="text-center text-blue-600 mb-2">
            {selectedType === 'kid' ? '👋 Welcome Back!' : '👋 Welcome Parent!'}
          </h2>
          <p className="text-center text-slate-500 mb-8">
            {selectedType === 'kid' 
              ? 'Ready to continue your adventure?' 
              : 'Check on your child\'s progress'}
          </p>

          {error && (
            <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl mb-4">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-slate-700 mb-2 block">Username or Email</label>
              <Input
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder={selectedType === 'kid' ? 'Your username' : 'Email or username'}
                className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
              />
            </div>

            <div>
              <label className="text-slate-700 mb-2 block">Password</label>
              <Input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                className="h-14 rounded-2xl bg-white border-2 border-blue-200 focus:border-blue-400 px-4"
              />
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 rounded-2xl shadow-lg"
            >
              Login
            </Button>

            <p className="text-center text-slate-500">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('signup')}
                className="text-blue-500 hover:text-blue-600"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}