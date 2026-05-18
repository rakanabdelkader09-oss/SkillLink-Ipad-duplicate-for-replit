import { Button } from './ui/button';
import { Input } from './ui/input';
import { Baby, User, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { UserProfile } from './ProfileSetupScreen';
import { authSignup, authLogin, getOrCreateDeviceId } from '../lib/api';

interface AuthScreenProps {
  onAuth: (userType: 'kid' | 'parent' | 'creator', profile: UserProfile, isNewUser: boolean) => void;
}

type AuthMode = 'select' | 'signup' | 'login';

export function AuthScreen({ onAuth }: AuthScreenProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('select');
  const [selectedType, setSelectedType] = useState<'kid' | 'parent' | 'creator' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sign Up form state
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
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

  const handleSignUp = async () => {
    setError('');

    if (!signupName.trim()) { setError('Please enter your display name'); return; }
    if (!signupUsername.trim()) { setError('Please choose a username'); return; }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(signupUsername)) {
      setError('Username: 3–20 chars, letters/numbers/underscore only');
      return;
    }
    if (!signupAge || parseInt(signupAge) <= 0) { setError('Please enter a valid age'); return; }
    if (selectedType === 'kid' && (parseInt(signupAge) < 6 || parseInt(signupAge) > 12)) {
      setError('Kids must be between 6–12 years old'); return;
    }
    if (selectedType !== 'kid' && parseInt(signupAge) < 18) {
      setError('Must be 18 or older'); return;
    }
    if (!signupPassword || signupPassword.length < 4) { setError('Password must be at least 4 characters'); return; }
    if (signupPassword !== signupConfirmPassword) { setError('Passwords do not match'); return; }
    if (selectedType === 'parent') {
      if (!signupParentName.trim()) { setError('Please enter your full name'); return; }
      if (!signupChildCount || parseInt(signupChildCount) <= 0) { setError('Please enter number of children'); return; }
    }

    setIsLoading(true);
    try {
      const deviceId = getOrCreateDeviceId();
      const { user } = await authSignup({
        username_handle: signupUsername,
        password: signupPassword,
        display_name: signupName,
        age: parseInt(signupAge),
        user_type: selectedType!,
        avatar: selectedType === 'kid' ? '🦁' : selectedType === 'creator' ? '🦊' : '🐻',
        device_id: deviceId,
      });

      const profile: UserProfile & { dbUserId?: number; username_handle?: string } = {
        name: user.display_name || signupName,
        age: user.age || parseInt(signupAge),
        avatar: user.avatar || '🦁',
        dbUserId: user.id,
        username_handle: user.username_handle,
        ...(selectedType === 'parent' && { parentName: signupParentName, childCount: parseInt(signupChildCount) }),
      };
      onAuth(selectedType!, profile, true);
    } catch (err: any) {
      setError(err?.message || 'Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setError('');
    if (!loginUsername.trim()) { setError('Please enter your username'); return; }
    if (!loginPassword) { setError('Please enter your password'); return; }

    setIsLoading(true);
    try {
      const { user } = await authLogin({ username_handle: loginUsername, password: loginPassword, expected_user_type: selectedType || undefined });

      const profile: UserProfile & { dbUserId?: number; username_handle?: string } = {
        name: user.display_name || loginUsername,
        age: user.age || (selectedType === 'kid' ? 9 : 35),
        avatar: user.avatar || '🦁',
        dbUserId: user.id,
        username_handle: user.username_handle,
        ...(selectedType === 'parent' && { parentName: user.display_name, childCount: 1 }),
      };
      onAuth((user.user_type as 'kid' | 'parent' | 'creator') || selectedType!, profile, false);
    } catch (err: any) {
      setError(err?.message || 'Login failed. Check your username and password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (authMode === 'signup' || authMode === 'login') {
      setAuthMode('select');
      setSelectedType(null);
      setError('');
      // Clear form fields
      setSignupName('');
      setSignupUsername('');
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
        <div className="max-w-2xl w-full">
          <h2 className="text-center text-blue-600 mb-2">Welcome to</h2>
          <h1 className="text-center text-blue-600 mb-12">SkillLink</h1>
          
          <p className="text-center text-slate-600 mb-8">Who's joining us today?</p>

          <div className="space-y-4">
            {/* Kid */}
            <div className="rounded-3xl border-4 border-blue-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-400 to-blue-500 p-4 flex items-center gap-3">
                <div className="bg-white rounded-full p-3">
                  <Baby className="text-[#2563eb]" size={24} />
                </div>
                <span className="text-white text-xl font-bold">Kid Account</span>
              </div>
              <div className="bg-white flex divide-x divide-blue-100">
                <button
                  onClick={() => handleUserTypeSelect('kid', 'login')}
                  className="flex-1 py-4 text-[#2563eb] hover:bg-blue-50 font-semibold transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleUserTypeSelect('kid', 'signup')}
                  className="flex-1 py-4 text-slate-500 hover:bg-slate-50 font-semibold transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* Parent */}
            <div className="rounded-3xl border-4 border-green-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-4 flex items-center gap-3">
                <div className="bg-white rounded-full p-3">
                  <User className="text-green-600" size={24} />
                </div>
                <span className="text-white text-xl font-bold">Parent Account</span>
              </div>
              <div className="bg-white flex divide-x divide-green-100">
                <button
                  onClick={() => handleUserTypeSelect('parent', 'login')}
                  className="flex-1 py-4 text-green-700 hover:bg-green-50 font-semibold transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleUserTypeSelect('parent', 'signup')}
                  className="flex-1 py-4 text-slate-500 hover:bg-slate-50 font-semibold transition-colors"
                >
                  Create Account
                </button>
              </div>
            </div>

            {/* Creator */}
            <div className="rounded-3xl border-4 border-purple-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-4 flex items-center gap-3">
                <div className="bg-white rounded-full p-3">
                  <Sparkles className="text-purple-500" size={24} />
                </div>
                <span className="text-white text-xl font-bold">Creator Account</span>
              </div>
              <div className="bg-white flex divide-x divide-purple-100">
                <button
                  onClick={() => handleUserTypeSelect('creator', 'login')}
                  className="flex-1 py-4 text-purple-600 hover:bg-purple-50 font-semibold transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleUserTypeSelect('creator', 'signup')}
                  className="flex-1 py-4 text-slate-500 hover:bg-slate-50 font-semibold transition-colors"
                >
                  Create Account
                </button>
              </div>
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
          <div className="max-w-2xl w-full">
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
                <label className="text-slate-700 mb-2 block">Username <span className="text-slate-400 text-sm">(used to log in &amp; add friends)</span></label>
                <Input
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  placeholder="coolkid_123"
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
                disabled={isLoading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 rounded-2xl shadow-lg mt-6 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
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
        <div className="max-w-2xl w-full">
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
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-14 rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
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