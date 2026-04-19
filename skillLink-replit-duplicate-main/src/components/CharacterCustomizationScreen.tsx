import { useState, useEffect } from 'react';
import { Settings, ShoppingBag, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation, Language } from './translations';

interface CharacterCustomizationScreenProps {
  onNavigate?: (screen: string) => void;
  language?: Language;
}

// Avatar data with vector-style options
const CATEGORIES = ['Face', 'Hair', 'Body', 'Accessories', 'Background'];

const FACE_OPTIONS = [
  { id: 'f1', label: 'Happy', base: '😊' },
  { id: 'f2', label: 'Cool', base: '😎' },
  { id: 'f3', label: 'Excited', base: '🤩' },
  { id: 'f4', label: 'Silly', base: '😜' },
  { id: 'f5', label: 'Calm', base: '😌' },
  { id: 'f6', label: 'Brave', base: '😤' },
];

const HAIR_OPTIONS = [
  { id: 'h1', label: 'Short', emoji: '👦', color: '#8B4513' },
  { id: 'h2', label: 'Long', emoji: '👧', color: '#DAA520' },
  { id: 'h3', label: 'Curly', emoji: '🧑‍🦱', color: '#4B0082' },
  { id: 'h4', label: 'Blonde', emoji: '👱', color: '#FFD700' },
  { id: 'h5', label: 'Silver', emoji: '🧑‍🦳', color: '#C0C0C0' },
  { id: 'h6', label: 'Bald', emoji: '🧑‍🦲', color: '#FFA07A' },
];

const BODY_OPTIONS = [
  { id: 'b1', label: 'Casual', emoji: '👕', bg: '#3b82f6' },
  { id: 'b2', label: 'Formal', emoji: '👔', bg: '#1e3a8a' },
  { id: 'b3', label: 'Sport', emoji: '🎽', bg: '#ef4444' },
  { id: 'b4', label: 'Dress', emoji: '👗', bg: '#ec4899' },
  { id: 'b5', label: 'Hoodie', emoji: '🧥', bg: '#6b7280' },
  { id: 'b6', label: 'Hero', emoji: '🦸', bg: '#f59e0b' },
];

const ACCESSORY_OPTIONS = [
  { id: 'a1', label: 'None', emoji: '✖️' },
  { id: 'a2', label: 'Crown', emoji: '👑' },
  { id: 'a3', label: 'Hat', emoji: '🎩' },
  { id: 'a4', label: 'Glasses', emoji: '🕶️' },
  { id: 'a5', label: 'Bow', emoji: '🎀' },
  { id: 'a6', label: 'Wizard', emoji: '🧙' },
];

const BG_OPTIONS = [
  { id: 'bg1', label: 'Blue', color: 'from-blue-400 to-blue-600' },
  { id: 'bg2', label: 'Purple', color: 'from-purple-400 to-purple-600' },
  { id: 'bg3', label: 'Green', color: 'from-green-400 to-emerald-600' },
  { id: 'bg4', label: 'Sunset', color: 'from-orange-400 to-pink-500' },
  { id: 'bg5', label: 'Night', color: 'from-indigo-800 to-purple-900' },
  { id: 'bg6', label: 'Gold', color: 'from-yellow-400 to-orange-500' },
];

const SKIN_TONES = ['🟤', '🟠', '🟡', '⚪', '🔵'];
const SKIN_COLORS = ['#8B4513', '#D2691E', '#F4C2A1', '#FAEBD7', '#CD853F'];

export function CharacterCustomizationScreen({ onNavigate, language = 'en' }: CharacterCustomizationScreenProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selections, setSelections] = useState({
    face: 'f1',
    hair: 'h1',
    body: 'b1',
    accessory: 'a1',
    bg: 'bg1',
    skin: 0,
  });
  const [saved, setSaved] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('skilllink-avatar');
      if (saved) setSelections(JSON.parse(saved));
    } catch {}
  }, []);

  const handleSelect = (key: string, value: string | number) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem('skilllink-avatar', JSON.stringify(selections));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const getFace = () => FACE_OPTIONS.find(f => f.id === selections.face) || FACE_OPTIONS[0];
  const getHair = () => HAIR_OPTIONS.find(h => h.id === selections.hair) || HAIR_OPTIONS[0];
  const getBody = () => BODY_OPTIONS.find(b => b.id === selections.body) || BODY_OPTIONS[0];
  const getAccessory = () => ACCESSORY_OPTIONS.find(a => a.id === selections.accessory) || ACCESSORY_OPTIONS[0];
  const getBg = () => BG_OPTIONS.find(b => b.id === selections.bg) || BG_OPTIONS[0];

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 0: // Face
        return (
          <div>
            {/* Skin tone row */}
            <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">Skin Tone</p>
            <div className="flex gap-4 mb-5">
              {SKIN_COLORS.map((color, i) => (
                <button key={i} onClick={() => handleSelect('skin', i)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${selections.skin === i ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                  style={{ background: color }} />
              ))}
            </div>
            <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">Expression</p>
            <div className="grid grid-cols-3 gap-5">
              {FACE_OPTIONS.map(face => (
                <button key={face.id} onClick={() => handleSelect('face', face.id)}
                  className={`rounded-2xl p-4 flex flex-col items-center gap-1 border-2 transition-all active:scale-95 ${
                    selections.face === face.id ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 bg-white'}`}>
                  <span className="text-4xl">{face.base}</span>
                  <span className="text-xs text-gray-500">{face.label}</span>
                  {selections.face === face.id && <Check size={12} className="text-blue-500" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 1: // Hair
        return (
          <div className="grid grid-cols-3 gap-5">
            {HAIR_OPTIONS.map(hair => (
              <button key={hair.id} onClick={() => handleSelect('hair', hair.id)}
                className={`rounded-2xl p-4 flex flex-col items-center gap-1 border-2 transition-all active:scale-95 ${
                  selections.hair === hair.id ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 bg-white'}`}>
                <span className="text-4xl">{hair.emoji}</span>
                <span className="text-xs text-gray-500">{hair.label}</span>
                {selections.hair === hair.id && <Check size={12} className="text-purple-500" />}
              </button>
            ))}
          </div>
        );
      case 2: // Body
        return (
          <div className="grid grid-cols-3 gap-5">
            {BODY_OPTIONS.map(body => (
              <button key={body.id} onClick={() => handleSelect('body', body.id)}
                className={`rounded-2xl p-4 flex flex-col items-center gap-2 border-2 transition-all active:scale-95 ${
                  selections.body === body.id ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 bg-white'}`}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: body.bg + '33' }}>
                  <span>{body.emoji}</span>
                </div>
                <span className="text-xs text-gray-500">{body.label}</span>
                {selections.body === body.id && <Check size={12} className="text-green-500" />}
              </button>
            ))}
          </div>
        );
      case 3: // Accessories
        return (
          <div className="grid grid-cols-3 gap-5">
            {ACCESSORY_OPTIONS.map(acc => (
              <button key={acc.id} onClick={() => handleSelect('accessory', acc.id)}
                className={`rounded-2xl p-4 flex flex-col items-center gap-1 border-2 transition-all active:scale-95 ${
                  selections.accessory === acc.id ? 'border-pink-500 bg-pink-50 shadow-md' : 'border-gray-200 bg-white'}`}>
                <span className="text-4xl">{acc.emoji}</span>
                <span className="text-xs text-gray-500">{acc.label}</span>
                {selections.accessory === acc.id && <Check size={12} className="text-pink-500" />}
              </button>
            ))}
          </div>
        );
      case 4: // Background
        return (
          <div className="grid grid-cols-3 gap-5">
            {BG_OPTIONS.map(bg => (
              <button key={bg.id} onClick={() => handleSelect('bg', bg.id)}
                className={`rounded-2xl overflow-hidden border-4 transition-all active:scale-95 aspect-square ${
                  selections.bg === bg.id ? 'border-yellow-400 shadow-lg scale-105' : 'border-transparent'}`}>
                <div className={`w-full h-full bg-gradient-to-br ${bg.color} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{bg.label}</span>
                  {selections.bg === bg.id && <Check size={16} className="text-white ml-1" />}
                </div>
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const face = getFace();
  const body = getBody();
  const accessory = getAccessory();
  const bg = getBg();

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-4 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-xl">My Avatar</h2>
          <div className="flex gap-4">
            {onNavigate && <>
              <button onClick={() => onNavigate('settings')} className="bg-white/20 p-2 rounded-xl">
                <Settings className="text-white" size={20} />
              </button>
              <button onClick={() => onNavigate('shop')} className="bg-white/20 p-2 rounded-xl">
                <ShoppingBag className="text-white" size={20} />
              </button>
            </>}
          </div>
        </div>
      </div>

      {/* Avatar Preview */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className={`bg-gradient-to-br ${bg.color} rounded-3xl p-6 flex items-center justify-center shadow-xl`} style={{ height: 180 }}>
          <div className="relative">
            {/* Body */}
            <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/40"
              style={{ background: SKIN_COLORS[selections.skin as number] }}>
              <span className="text-6xl">{face.base}</span>
            </div>
            {/* Accessory top */}
            {accessory.id !== 'a1' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">
                {accessory.emoji}
              </div>
            )}
            {/* Body clothes badge */}
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-xl">
              {body.emoji}
            </div>
          </div>
        </div>
      </div>

      {/* Category tabs - horizontal scroll */}
      <div className="px-4 flex-shrink-0">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat, i) => (
            <button key={i} onClick={() => setActiveCategory(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === i
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'bg-white text-gray-500 border border-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Options grid - scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {renderCategoryContent()}
      </div>

      {/* Save button */}
      <div className="px-6 pb-6 pt-2 flex-shrink-0 bg-gray-50">
        <Button
          onClick={handleSave}
          className={`w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'}`}>
          {saved ? '✅ Saved!' : 'Save Avatar'}
        </Button>
      </div>
    </div>
  );
}
