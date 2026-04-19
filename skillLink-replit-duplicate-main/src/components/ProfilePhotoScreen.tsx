import { useState, useRef } from 'react';
import { ArrowLeft, Camera, Upload, User, Check } from 'lucide-react';
import { Button } from './ui/button';

interface ProfilePhotoScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
  language?: string;
}

const BORDER_DESIGNS = [
  { id: 'none', label: 'None', style: 'border-4 border-gray-200', preview: '' },
  { id: 'gold', label: 'Gold', style: 'border-4 border-yellow-400 shadow-[0_0_12px_#facc15]', preview: 'ring-yellow-400' },
  { id: 'rainbow', label: 'Rainbow', style: 'border-4 border-transparent', gradientBorder: 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400', preview: '' },
  { id: 'blue-glow', label: 'Blue Glow', style: 'border-4 border-blue-400 shadow-[0_0_16px_#60a5fa]', preview: '' },
  { id: 'purple-glow', label: 'Purple Glow', style: 'border-4 border-purple-500 shadow-[0_0_16px_#a855f7]', preview: '' },
  { id: 'fire', label: 'Fire', style: 'border-4 border-orange-500 shadow-[0_0_16px_#f97316]', preview: '' },
  { id: 'ice', label: 'Ice', style: 'border-4 border-cyan-300 shadow-[0_0_14px_#67e8f9]', preview: '' },
  { id: 'emerald', label: 'Emerald', style: 'border-4 border-emerald-400 shadow-[0_0_14px_#34d399]', preview: '' },
  { id: 'rose', label: 'Rose', style: 'border-4 border-rose-400 shadow-[0_0_14px_#fb7185]', preview: '' },
  { id: 'champion', label: 'Champion', style: 'border-[5px] border-yellow-500 shadow-[0_0_20px_#eab308,inset_0_0_8px_#fef08a]', preview: '' },
  { id: 'galaxy', label: 'Galaxy', style: 'border-4 border-indigo-600 shadow-[0_0_18px_#4f46e5]', preview: '' },
  { id: 'neon-pink', label: 'Neon Pink', style: 'border-4 border-pink-400 shadow-[0_0_18px_#f472b6]', preview: '' },
];

function getBorderGradient(id: string) {
  if (id === 'rainbow') return 'bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400 p-1 rounded-full';
  return '';
}

export function ProfilePhotoScreen({ onBack }: ProfilePhotoScreenProps) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [selectedBorder, setSelectedBorder] = useState('none');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentBorder = BORDER_DESIGNS.find(b => b.id === selectedBorder) || BORDER_DESIGNS[0];

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-xl">
        <button onClick={onBack} className="text-white/80 flex items-center gap-1 mb-4 text-sm">
          <ArrowLeft size={18} /> Back
        </button>
        <h1 className="text-white text-2xl font-black">Your Profile Photo</h1>
        <p className="text-purple-100 text-sm mt-1">Upload a photo and choose your border style</p>
      </div>

      {/* Avatar Preview */}
      <div className="flex flex-col items-center mt-8 px-6">
        <div className="relative mb-6">
          {/* Border wrapper */}
          <div className={`rounded-full ${selectedBorder === 'rainbow' ? 'p-1 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400' : ''}`}>
            <div
              className={`w-36 h-36 rounded-full flex items-center justify-center overflow-hidden bg-gray-100 ${selectedBorder !== 'rainbow' ? currentBorder.style : ''}`}
            >
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User className="text-gray-300" size={64} />
              )}
            </div>
          </div>

          {/* Camera button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-1 right-1 bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white"
          >
            <Camera size={18} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Upload button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 bg-white border-2 border-purple-300 text-purple-600 font-bold px-6 py-3 rounded-2xl shadow-sm mb-2 active:scale-95 transition-transform"
        >
          <Upload size={18} />
          {photo ? 'Change Photo' : 'Upload Photo'}
        </button>
        <p className="text-gray-400 text-xs">Tap the camera icon or the button above</p>
      </div>

      {/* Border Picker */}
      <div className="px-6 mt-8">
        <h2 className="text-gray-800 font-black text-lg mb-1">Profile Border</h2>
        <p className="text-gray-400 text-sm mb-4">Choose a border style for your avatar</p>

        <div className="grid grid-cols-3 gap-3">
          {BORDER_DESIGNS.map((border) => (
            <button
              key={border.id}
              onClick={() => setSelectedBorder(border.id)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                selectedBorder === border.id
                  ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02]'
                  : 'border-gray-100 bg-white'
              }`}
            >
              {/* Mini avatar preview */}
              <div className={`${border.id === 'rainbow' ? 'p-0.5 bg-gradient-to-r from-red-400 via-yellow-400 to-purple-400 rounded-full' : ''}`}>
                <div
                  className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ${border.id !== 'rainbow' ? border.style : ''}`}
                  style={{ fontSize: '22px' }}
                >
                  {photo ? (
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  ) : (
                    '😊'
                  )}
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-600">{border.label}</span>
              {selectedBorder === border.id && (
                <div className="absolute-ish">
                  <Check size={14} className="text-purple-500" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="px-6 mt-8">
        <Button
          onClick={handleSave}
          className="w-full py-5 rounded-2xl text-lg font-black bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-xl"
        >
          {saved ? (
            <span className="flex items-center gap-2"><Check size={20} /> Saved!</span>
          ) : (
            'Save Profile Photo'
          )}
        </Button>
      </div>
    </div>
  );
}
