import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import logo from '../assets/skilllink-logo.png';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const slides = [
  {
    emoji: '🎯',
    title: 'Learn Real Skills',
    subtitle: 'Master life skills through fun daily quests and challenges',
    bg: 'from-[#2563eb] to-[#1d4ed8]',
  },
  {
    emoji: '🪙',
    title: 'Earn SkillCoins',
    subtitle: 'Complete quests to earn SC coins and climb the leaderboard',
    bg: 'from-purple-600 to-purple-800',
  },
  {
    emoji: '📚',
    title: 'Take Courses',
    subtitle: 'Learn drawing, cooking, coding and more with guided lessons',
    bg: 'from-emerald-500 to-emerald-700',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Family Together',
    subtitle: 'Parents track progress and cheer you on every step',
    bg: 'from-pink-500 to-rose-600',
  },
];

export function OnboardingScreen({ onGetStarted }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashPhase, setSplashPhase] = useState<'in' | 'visible' | 'out'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setSplashPhase('visible'), 300);
    const t2 = setTimeout(() => setSplashPhase('out'), 1800);
    const t3 = setTimeout(() => setShowSplash(false), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  useEffect(() => {
    if (showSplash) return;
    const interval = setInterval(() => goToNext(), 3500);
    return () => clearInterval(interval);
  }, [showSplash, currentSlide]);

  const goToNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
      setAnimating(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    if (animating || index === currentSlide) return;
    setAnimating(true);
    setTimeout(() => { setCurrentSlide(index); setAnimating(false); }, 300);
  };

  const slide = slides[currentSlide];

  if (showSplash) {
    return (
      <div className="h-full bg-[#2563eb] flex flex-col items-center justify-center">
        <div style={{
          opacity: splashPhase === 'in' ? 0 : splashPhase === 'out' ? 0 : 1,
          transform: splashPhase === 'in' ? 'scale(0.5) translateY(20px)' : splashPhase === 'out' ? 'scale(1.1)' : 'scale(1) translateY(0)',
          transition: splashPhase === 'out' ? 'all 0.5s ease-in' : 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} className="flex flex-col items-center gap-5">
          <img
            src={logo}
            alt="SkillLink Logo"
            width={140}
            height={140}
            style={{ borderRadius: 32 }}
          />
          <div className="text-center">
            <h1 style={{
              opacity: splashPhase === 'visible' ? 1 : 0,
              transition: 'opacity 0.4s ease 0.3s',
            }} className="text-5xl text-white font-black tracking-wide">SkillLink</h1>
            <p style={{
              opacity: splashPhase === 'visible' ? 1 : 0,
              transition: 'opacity 0.4s ease 0.5s',
            }} className="text-blue-200 text-base mt-2">Turn screen time into skill time</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full bg-gradient-to-b ${slide.bg} flex flex-col`} style={{ transition: 'background 0.5s ease' }}>
      <div className="flex justify-end px-6 pt-12">
        <button onClick={onGetStarted} className="text-white/70 text-sm px-4 py-2 rounded-full border border-white/30">
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8" style={{
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(20px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
      }}>
        <div className="text-9xl mb-8 animate-bounce" style={{ animationDuration: '2s' }}>
          {slide.emoji}
        </div>
        <h1 className="text-white text-4xl font-bold text-center mb-4 leading-tight">{slide.title}</h1>
        <p className="text-white/80 text-lg text-center leading-relaxed max-w-xs">{slide.subtitle}</p>
      </div>

      <div className="px-8 pb-12">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goToSlide(i)} className="rounded-full transition-all duration-300" style={{
              width: i === currentSlide ? 24 : 8, height: 8,
              background: i === currentSlide ? '#facc15' : 'rgba(255,255,255,0.4)',
            }} />
          ))}
        </div>

        {currentSlide === slides.length - 1 ? (
          <Button onClick={onGetStarted} className="w-full py-6 rounded-2xl text-xl font-bold shadow-2xl"
            style={{ background: '#facc15', color: '#1e3a8a' }}>
            Get Started 🚀
          </Button>
        ) : (
          <button onClick={goToNext} className="w-full py-5 rounded-2xl text-xl font-semibold flex items-center justify-center gap-2"
            style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid rgba(255,255,255,0.4)' }}>
            Next <ChevronRight size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
