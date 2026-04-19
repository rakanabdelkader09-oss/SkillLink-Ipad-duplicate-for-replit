import { useState } from 'react';
import { ShoppingBag, Sparkles, Lock, ArrowLeft, Check, Crown, Zap } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SkillCoin, RobuxIcon, RobuxBadge } from './CurrencyIcons';

interface ShopScreenProps {
  currentPoints: number;
  onPurchase?: (item: any) => void;
  onBack?: () => void;
  language?: string;
}

interface BorderItem {
  id: string;
  name: string;
  price: number;
  borderStyle: string;
  gradientBorder?: boolean;
  description: string;
  featured?: boolean;
}

interface RobuxItem {
  id: string;
  robux: number;
  scCost: number;
  bonus?: string;
  popular?: boolean;
}

const BORDER_ITEMS: BorderItem[] = [
  { id: 'border-gold', name: 'Gold Champion', price: 200, borderStyle: 'border-4 border-yellow-400 shadow-[0_0_12px_#facc15]', description: 'Shine like a champion!', featured: true },
  { id: 'border-rainbow', name: 'Rainbow Burst', price: 350, borderStyle: '', gradientBorder: true, description: 'All the colors of the rainbow!', featured: true },
  { id: 'border-champion', name: 'Ultimate Champion', price: 500, borderStyle: 'border-[5px] border-yellow-500 shadow-[0_0_20px_#eab308,inset_0_0_8px_#fef08a]', description: 'The rarest border of all!', featured: true },
  { id: 'border-blue-glow', name: 'Blue Glow', price: 150, borderStyle: 'border-4 border-blue-400 shadow-[0_0_16px_#60a5fa]', description: 'Cool electric blue aura' },
  { id: 'border-purple-glow', name: 'Purple Glow', price: 150, borderStyle: 'border-4 border-purple-500 shadow-[0_0_16px_#a855f7]', description: 'Mysterious purple energy' },
  { id: 'border-fire', name: 'Fire Ring', price: 300, borderStyle: 'border-4 border-orange-500 shadow-[0_0_16px_#f97316]', description: 'Burning hot border!' },
  { id: 'border-ice', name: 'Ice Crystal', price: 280, borderStyle: 'border-4 border-cyan-300 shadow-[0_0_14px_#67e8f9]', description: 'Frosty and cool' },
  { id: 'border-emerald', name: 'Emerald Forest', price: 220, borderStyle: 'border-4 border-emerald-400 shadow-[0_0_14px_#34d399]', description: 'Lush green nature glow' },
  { id: 'border-rose', name: 'Rose Blossom', price: 180, borderStyle: 'border-4 border-rose-400 shadow-[0_0_14px_#fb7185]', description: 'Pretty and delicate' },
  { id: 'border-galaxy', name: 'Galaxy', price: 400, borderStyle: 'border-4 border-indigo-600 shadow-[0_0_18px_#4f46e5]', description: 'Out of this world!' },
  { id: 'border-neon-pink', name: 'Neon Pink', price: 250, borderStyle: 'border-4 border-pink-400 shadow-[0_0_18px_#f472b6]', description: 'Bright neon vibes' },
  { id: 'border-silver', name: 'Silver Star', price: 100, borderStyle: 'border-4 border-gray-400 shadow-[0_0_10px_#9ca3af]', description: 'Classic silver shine' },
];

const ROBUX_ITEMS: RobuxItem[] = [
  { id: 'rbx-80',   robux: 80,   scCost: 400,  },
  { id: 'rbx-160',  robux: 160,  scCost: 750,  bonus: '+10 bonus', popular: true },
  { id: 'rbx-400',  robux: 400,  scCost: 1800, bonus: '+25 bonus' },
  { id: 'rbx-800',  robux: 800,  scCost: 3400, bonus: '+60 bonus' },
  { id: 'rbx-1700', robux: 1700, scCost: 6500, bonus: '+170 bonus' },
  { id: 'rbx-4500', robux: 4500, scCost: 15000, bonus: '+550 bonus' },
];

function BorderPreview({ item, small = false }: { item: BorderItem; small?: boolean }) {
  const cls = small ? 'w-10 h-10 text-xl' : 'w-14 h-14 text-2xl';
  if (item.gradientBorder) {
    return (
      <div className="p-1 rounded-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 flex-shrink-0">
        <div className={`${cls} rounded-full bg-gray-100 flex items-center justify-center`}>😊</div>
      </div>
    );
  }
  return (
    <div className={`${cls} rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${item.borderStyle}`}>
      😊
    </div>
  );
}

export function ShopScreen({ currentPoints, onPurchase, onBack }: ShopScreenProps) {
  const [purchasedBorders, setPurchasedBorders] = useState<string[]>([]);
  const [purchasedRobux, setPurchasedRobux] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('borders');
  const [purchaseConfirm, setPurchaseConfirm] = useState<string | null>(null);

  const handleBuyBorder = (item: BorderItem) => {
    if (currentPoints >= item.price && !purchasedBorders.includes(item.id)) {
      setPurchasedBorders(prev => [...prev, item.id]);
      onPurchase?.(item);
      setPurchaseConfirm(item.id);
      setTimeout(() => setPurchaseConfirm(null), 1800);
    }
  };

  const handleBuyRobux = (item: RobuxItem) => {
    if (currentPoints >= item.scCost && !purchasedRobux.includes(item.id)) {
      setPurchasedRobux(prev => [...prev, item.id]);
      onPurchase?.({ ...item, price: item.scCost });
      setPurchaseConfirm(item.id);
      setTimeout(() => setPurchaseConfirm(null), 1800);
    }
  };

  const featuredBorders = BORDER_ITEMS.filter(i => i.featured);
  const regularBorders = BORDER_ITEMS.filter(i => !i.featured);

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-pink-50 pb-24 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <button onClick={onBack} className="bg-white/20 backdrop-blur-sm p-2 rounded-xl active:scale-95">
              <ArrowLeft className="text-white" size={24} />
            </button>
          )}
          <ShoppingBag className="text-white" size={28} />
          <h2 className="text-white font-black text-2xl">SkillLink Shop</h2>
        </div>
        <p className="text-purple-100 text-sm mb-4">Spend your SkillCoins on borders and Robux! 🎁</p>

        {/* Balance card */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <SkillCoin size={44} />
              <div>
                <p className="text-white/70 text-xs font-medium">SkillCoin Balance</p>
                <p className="text-white text-3xl font-black">{currentPoints.toLocaleString()}</p>
                <p className="text-yellow-300 text-xs">SC coins</p>
              </div>
            </div>
            <Sparkles className="text-yellow-300" size={32} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full bg-white rounded-2xl p-1 shadow-md border border-gray-100">
            <TabsTrigger value="borders" className="rounded-xl text-sm font-bold data-[state=active]:bg-purple-500 data-[state=active]:text-white">
              🎨 Borders
            </TabsTrigger>
            <TabsTrigger value="robux" className="rounded-xl text-sm font-bold data-[state=active]:bg-gray-900 data-[state=active]:text-white">
              <RobuxBadge size={18} />
              <span className="ml-1.5">Buy Robux</span>
            </TabsTrigger>
          </TabsList>

          {/* ── BORDERS TAB ── */}
          <TabsContent value="borders" className="mt-5 space-y-5">
            {/* Featured */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="text-yellow-500" size={20} />
                <h3 className="text-gray-800 font-black text-lg">Featured</h3>
              </div>
              <div className="space-y-3">
                {featuredBorders.map(item => {
                  const canAfford = currentPoints >= item.price;
                  const owned = purchasedBorders.includes(item.id);
                  const justBought = purchaseConfirm === item.id;
                  return (
                    <div key={item.id} className={`bg-white border-2 rounded-3xl p-4 shadow-md transition-all ${owned ? 'border-green-300 bg-green-50' : canAfford ? 'border-purple-200' : 'border-gray-100 opacity-80'}`}>
                      <div className="flex items-center gap-4">
                        <BorderPreview item={item} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <p className="font-black text-gray-800 text-sm">{item.name}</p>
                            <Badge className="bg-yellow-400 text-yellow-900 text-[10px] px-2">⭐ Featured</Badge>
                          </div>
                          <p className="text-gray-400 text-xs mb-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <SkillCoin size={18} />
                              <span className="text-gray-700 text-sm font-bold">{item.price} SC</span>
                            </div>
                            {owned ? (
                              <Badge className={`text-xs ${justBought ? 'bg-green-600 animate-pulse' : 'bg-green-500'}`}>
                                {justBought ? '✓ Purchased!' : 'Owned ✓'}
                              </Badge>
                            ) : canAfford ? (
                              <Button onClick={() => handleBuyBorder(item)} className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-5 h-8 text-sm font-bold active:scale-95">
                                Buy
                              </Button>
                            ) : (
                              <span className="text-xs text-gray-400 flex items-center gap-1"><Lock size={11} /> Need more SC</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All borders grid */}
            <div>
              <h3 className="text-gray-800 font-black text-lg mb-3">All Borders</h3>
              <div className="grid grid-cols-2 gap-3">
                {regularBorders.map(item => {
                  const canAfford = currentPoints >= item.price;
                  const owned = purchasedBorders.includes(item.id);
                  const justBought = purchaseConfirm === item.id;
                  return (
                    <div key={item.id} className={`bg-white border-2 rounded-3xl p-4 shadow-sm flex flex-col items-center gap-2 transition-all ${owned ? 'border-green-300 bg-green-50' : canAfford ? 'border-purple-100' : 'border-gray-100 opacity-70'}`}>
                      <BorderPreview item={item} small />
                      <p className="font-bold text-gray-800 text-xs text-center leading-tight">{item.name}</p>
                      <p className="text-gray-400 text-[10px] text-center">{item.description}</p>
                      <div className="flex items-center gap-1">
                        <SkillCoin size={14} />
                        <span className="text-gray-700 text-xs font-bold">{item.price}</span>
                      </div>
                      {owned ? (
                        <Badge className={`text-[10px] ${justBought ? 'bg-green-600 animate-pulse' : 'bg-green-500'}`}>
                          {justBought ? '✓ Got it!' : 'Owned ✓'}
                        </Badge>
                      ) : canAfford ? (
                        <Button onClick={() => handleBuyBorder(item)} className="bg-purple-500 hover:bg-purple-600 text-white rounded-full h-7 text-xs font-bold w-full active:scale-95">
                          Buy
                        </Button>
                      ) : (
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5"><Lock size={9} /> Need SC</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earn tip */}
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-4">
              <div className="flex items-start gap-3">
                <Zap className="text-yellow-500 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-yellow-700 font-bold text-sm">💡 Earn more SC</p>
                  <p className="text-yellow-600 text-xs mt-1">Complete daily quests to earn SkillCoins. Visit your Profile to equip a border!</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── ROBUX TAB ── */}
          <TabsContent value="robux" className="mt-5">
            {/* Banner */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-5 mb-5 shadow-xl">
              <div className="flex items-center gap-4">
                <RobuxIcon size={56} />
                <div>
                  <p className="text-white font-black text-xl">Buy Robux</p>
                  <p className="text-gray-300 text-sm">Convert your SkillCoins into Robux!</p>
                  <p className="text-yellow-400 text-xs mt-1 font-semibold">Earn SC → Exchange for R$</p>
                </div>
              </div>
            </div>

            {/* Exchange rate info */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-3 mb-4 flex items-center gap-3 shadow-sm">
              <div className="flex items-center gap-1">
                <SkillCoin size={20} />
                <span className="text-gray-600 text-sm font-bold">5 SC</span>
              </div>
              <span className="text-gray-400 text-sm font-bold">≈</span>
              <div className="flex items-center gap-1">
                <RobuxBadge size={18} />
                <span className="text-gray-600 text-sm font-bold">1 R$</span>
              </div>
              <span className="text-gray-400 text-xs ml-auto">More = better rate</span>
            </div>

            {/* Robux packages */}
            <div className="space-y-3">
              {ROBUX_ITEMS.map(item => {
                const canAfford = currentPoints >= item.scCost;
                const owned = purchasedRobux.includes(item.id);
                const justBought = purchaseConfirm === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-white border-2 rounded-3xl p-4 shadow-md transition-all ${
                      owned ? 'border-green-300 bg-green-50' :
                      item.popular ? 'border-yellow-400' :
                      canAfford ? 'border-gray-200' : 'border-gray-100 opacity-70'
                    }`}
                  >
                    {item.popular && (
                      <div className="flex justify-end mb-1">
                        <Badge className="bg-yellow-400 text-yellow-900 text-[10px] px-2">🔥 Most Popular</Badge>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center gap-1 flex-shrink-0">
                        <RobuxIcon size={44} />
                        <p className="text-gray-800 font-black text-base">{item.robux.toLocaleString()}</p>
                        {item.bonus && <p className="text-green-600 text-[10px] font-bold">{item.bonus}</p>}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 font-bold text-sm mb-1">
                          {item.robux.toLocaleString()} Robux
                          {item.bonus && <span className="text-green-500 text-xs ml-1">({item.bonus})</span>}
                        </p>
                        <div className="flex items-center gap-1.5 mb-3">
                          <SkillCoin size={16} />
                          <span className="text-gray-600 text-sm font-bold">{item.scCost.toLocaleString()} SC</span>
                        </div>
                        {owned ? (
                          <Badge className={`text-xs ${justBought ? 'bg-green-600 animate-pulse' : 'bg-green-500'}`}>
                            {justBought ? '✓ Redeemed!' : 'Redeemed ✓'}
                          </Badge>
                        ) : canAfford ? (
                          <Button
                            onClick={() => handleBuyRobux(item)}
                            className="w-full bg-gray-900 hover:bg-black text-white rounded-2xl h-9 font-bold text-sm flex items-center justify-center gap-2 active:scale-95"
                          >
                            <RobuxBadge size={16} />
                            Get {item.robux.toLocaleString()} Robux
                          </Button>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Lock size={12} />
                            Need {(item.scCost - currentPoints).toLocaleString()} more SC
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tip */}
            <div className="bg-gray-900 rounded-3xl p-4 mt-5">
              <div className="flex items-start gap-3">
                <RobuxBadge size={24} />
                <div>
                  <p className="text-white font-bold text-sm">How it works</p>
                  <p className="text-gray-400 text-xs mt-1">Complete quests to earn SkillCoins, then exchange them here for Robux. The bigger the pack, the better the rate!</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
