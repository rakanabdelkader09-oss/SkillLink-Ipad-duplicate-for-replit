import { useState } from 'react';
import { ArrowLeft, Check, Crown, Users, Zap, Shield, Star, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface SubscriptionScreenProps {
  onBack: () => void;
  currentPlan?: 'none' | 'base' | 'family';
  onSubscribe?: (plan: 'base' | 'family') => void;
}

export function SubscriptionScreen({ onBack, currentPlan = 'none', onSubscribe }: SubscriptionScreenProps) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [selected, setSelected] = useState<'base' | 'family'>('family');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const plans = {
    base: {
      name: 'Base Plan',
      emoji: '⭐',
      monthlyPrice: 6.99,
      yearlyPrice: 4.99,
      color: 'from-blue-500 to-blue-600',
      lightColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-600',
      features: [
        { icon: '👨‍👩‍👧', text: 'Unlimited Parent/Guardian accounts' },
        { icon: '👶', text: '1 Child account' },
        { icon: '🎯', text: 'Unlimited daily quests' },
        { icon: '📚', text: 'Access to all courses' },
        { icon: '🏆', text: 'Full leaderboard access' },
        { icon: '📊', text: 'Parent progress dashboard' },
        { icon: '🎨', text: 'All avatar customizations' },
      ],
      notIncluded: [
        'Multiple child accounts',
        'Family challenges',
      ],
    },
    family: {
      name: 'Family Plan',
      emoji: '👨‍👩‍👧‍👦',
      monthlyPrice: 12.99,
      yearlyPrice: 9.99,
      color: 'from-purple-500 to-pink-500',
      lightColor: 'bg-purple-50',
      borderColor: 'border-purple-400',
      textColor: 'text-purple-600',
      features: [
        { icon: '👨‍👩‍👧', text: 'Unlimited Parent/Guardian accounts' },
        { icon: '👶👶', text: '2 Child accounts' },
        { icon: '🎯', text: 'Unlimited daily quests' },
        { icon: '📚', text: 'Access to all courses' },
        { icon: '🏆', text: 'Full leaderboard access' },
        { icon: '📊', text: 'Parent progress dashboard' },
        { icon: '🎨', text: 'All avatar customizations' },
        { icon: '👨‍👩‍👧‍👦', text: 'Family challenge mode' },
        { icon: '💰', text: '2x SkillCoin bonus on quests' },
      ],
      notIncluded: [],
      badge: 'BEST VALUE',
    },
  };

  const getPrice = (plan: 'base' | 'family') => {
    const p = plans[plan];
    return billing === 'monthly' ? p.monthlyPrice : p.yearlyPrice;
  };

  const handleSubscribe = () => {
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      onSubscribe?.(selected);
    }, 1500);
  };

  if (subscribed) {
    return (
      <div className="h-full bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center justify-center px-8">
        <div className="text-center text-white">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-3xl font-black mb-3">You're in!</h1>
          <p className="text-purple-100 text-lg mb-2">Welcome to SkillLink {selected === 'family' ? 'Family' : 'Base'}</p>
          <p className="text-purple-200 text-sm mb-8">All premium features are now unlocked</p>
          <Button onClick={onBack} className="bg-white text-purple-600 font-bold px-10 py-4 rounded-2xl text-lg">
            Start Learning 🚀
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl">
        <button onClick={onBack} className="text-white/80 flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 mb-3">
            <Crown size={16} className="text-yellow-300" />
            <span className="text-white text-sm font-semibold">Premium Plans</span>
          </div>
          <h1 className="text-white text-3xl font-black mb-2">Unlock Everything</h1>
          <p className="text-purple-100 text-sm">Choose the plan that fits your family</p>
        </div>
      </div>

      {/* Billing toggle */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl p-1 flex shadow-md border border-gray-100">
          <button
            onClick={() => setBilling('monthly')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
              billing === 'monthly' ? 'bg-purple-500 text-white shadow-md' : 'text-gray-500'}`}>
            Monthly
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              billing === 'yearly' ? 'bg-purple-500 text-white shadow-md' : 'text-gray-500'}`}>
            Yearly
            <span className={`text-xs px-2 py-0.5 rounded-full font-black ${
              billing === 'yearly' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-100 text-green-600'}`}>
              -29%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="px-6 mt-4 space-y-4">
        {(['base', 'family'] as const).map(planKey => {
          const plan = plans[planKey];
          const isSelected = selected === planKey;
          const isCurrent = currentPlan === planKey;

          return (
            <button
              key={planKey}
              onClick={() => setSelected(planKey)}
              className={`w-full text-left rounded-3xl border-2 overflow-hidden transition-all shadow-md ${
                isSelected ? plan.borderColor + ' shadow-lg scale-[1.01]' : 'border-gray-200 bg-white'}`}>

              {/* Card header */}
              <div className={`bg-gradient-to-r ${plan.color} px-5 py-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{plan.emoji}</span>
                  <div>
                    <p className="text-white font-black text-lg">{plan.name}</p>
                    {(plan as any).badge && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-2 py-0.5 rounded-full">
                        {(plan as any).badge}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-3xl font-black">€{getPrice(planKey)}</p>
                  <p className="text-white/70 text-xs">/month</p>
                </div>
              </div>

              {/* Features */}
              <div className={`px-5 py-4 ${isSelected ? plan.lightColor : 'bg-white'}`}>
                <div className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-green-500' : 'bg-green-100'}`}>
                        <Check size={12} className={isSelected ? 'text-white' : 'text-green-500'} />
                      </div>
                      <span className="text-gray-700 text-sm">{feature.icon} {feature.text}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 opacity-40">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200">
                        <span className="text-gray-400 text-xs">✕</span>
                      </div>
                      <span className="text-gray-400 text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selected indicator */}
                <div className={`mt-3 flex items-center justify-between ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                  <span className={`text-sm font-bold ${plan.textColor}`}>Selected ✓</span>
                  {isCurrent && <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-3 py-1">Current plan</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Compare summary */}
      <div className="px-6 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-xs font-bold uppercase mb-3">Plan Comparison</p>
          <div className="flex">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-2">Feature</p>
              {['Parent accounts', 'Child accounts', 'Family challenges', 'Bonus SC coins'].map(f => (
                <p key={f} className="text-xs text-gray-600 py-1 border-b border-gray-50">{f}</p>
              ))}
            </div>
            <div className="w-16 text-center">
              <p className="text-xs text-blue-500 font-bold mb-2">Base</p>
              {['Unlimited', '1', '✕', '—'].map((v, i) => (
                <p key={i} className={`text-xs py-1 border-b border-gray-50 ${v === '✕' ? 'text-gray-300' : 'text-blue-600 font-semibold'}`}>{v}</p>
              ))}
            </div>
            <div className="w-16 text-center">
              <p className="text-xs text-purple-500 font-bold mb-2">Family</p>
              {['Unlimited', '2', '✓', '2x'].map((v, i) => (
                <p key={i} className={`text-xs py-1 border-b border-gray-50 ${v === '✓' || v === '2x' ? 'text-green-500 font-bold' : 'text-purple-600 font-semibold'}`}>{v}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe button */}
      <div className="px-6 mt-6">
        <Button
          onClick={handleSubscribe}
          disabled={subscribing}
          className={`w-full py-5 rounded-2xl text-lg font-black shadow-xl bg-gradient-to-r ${plans[selected].color} text-white`}>
          {subscribing ? (
            <span className="flex items-center gap-2"><span className="animate-spin">⏳</span> Processing...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Crown size={20} />
              Subscribe to {plans[selected].name} — €{getPrice(selected)}/mo
              <ChevronRight size={20} />
            </span>
          )}
        </Button>
        <p className="text-center text-gray-400 text-xs mt-3">Cancel anytime · Secure payment · No hidden fees</p>
      </div>

      {/* Trust badges */}
      <div className="px-6 mt-4">
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Shield size={14} /> Secure
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Zap size={14} /> Instant
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Star size={14} /> Cancel anytime
          </div>
        </div>
      </div>
    </div>
  );
}
