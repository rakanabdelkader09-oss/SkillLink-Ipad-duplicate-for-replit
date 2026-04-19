import { useState } from 'react';
import { ArrowLeft, Users, Upload, CheckCircle, Video } from 'lucide-react';
import { Button } from './ui/button';

interface ChallengeModeScreenProps {
  questId: number;
  questData: any;
  onBack: () => void;
  onSubmitVideo: (questId: number, videoFile: File | null, challengeWith: string[]) => void;
}

export function ChallengeModeScreen({ questId, questData, onBack, onSubmitVideo }: ChallengeModeScreenProps) {
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock friends/family list
  const availablePeople = [
    { id: 'mom', name: 'Mom', emoji: '👩', type: 'parent' },
    { id: 'dad', name: 'Dad', emoji: '👨', type: 'parent' },
    { id: 'sibling1', name: 'Emma', emoji: '👧', type: 'friend' },
    { id: 'friend1', name: 'Jake', emoji: '👦', type: 'friend' },
    { id: 'friend2', name: 'Mia', emoji: '👧', type: 'friend' },
    { id: 'friend3', name: 'Liam', emoji: '👦', type: 'friend' },
  ];

  const togglePerson = (personId: string) => {
    if (selectedPeople.includes(personId)) {
      setSelectedPeople(selectedPeople.filter(id => id !== personId));
    } else {
      setSelectedPeople([...selectedPeople, personId]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
    }
  };

  const handleSubmit = () => {
    onSubmitVideo(questId, videoFile, selectedPeople);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="h-full bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center">
          <div className="mb-6 animate-bounce">
            <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-full p-8 inline-block shadow-2xl">
              <CheckCircle className="text-white" size={80} />
            </div>
          </div>

          <h2 className="text-purple-600 mb-4">Challenge Submitted! 🎉</h2>
          
          <div className="bg-white border-4 border-purple-300 rounded-3xl p-8 mb-6 shadow-xl">
            <div className="text-6xl mb-4">{questData.icon}</div>
            <h3 className="text-slate-700 mb-4">{questData.title}</h3>
            
            <div className="bg-purple-100 rounded-2xl p-6 mb-4">
              <p className="text-purple-700">
                {selectedPeople.length > 0 
                  ? `Challenged with ${selectedPeople.length} ${selectedPeople.length === 1 ? 'person' : 'people'}!`
                  : 'Challenge submitted!'}
              </p>
            </div>

            <p className="text-slate-600">
              Waiting for parent approval... ⏳
            </p>
          </div>

          <Button
            onClick={onBack}
            className="bg-purple-500 hover:bg-purple-600 text-white px-12 py-6 rounded-full shadow-lg"
          >
            Back to Quests
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4">
          <ArrowLeft size={20} />
          Back
        </button>
        
        <div className="text-center">
          <div className="text-7xl mb-4">{questData.icon}</div>
          <h2 className="text-white mb-3">{questData.title}</h2>
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 inline-flex items-center gap-4">
            <Users size={20} className="text-white" />
            <span className="text-white">Challenge Mode</span>
          </div>
        </div>
      </div>

      {/* Who to challenge */}
      <div className="px-6 mt-6">
        <div className="bg-white border-2 border-purple-200 rounded-3xl p-6 shadow-md">
          <h3 className="text-purple-600 mb-4">👥 Who do you want to do this with?</h3>
          <p className="text-slate-500 text-sm mb-4">Select friends or family members to challenge!</p>
          
          <div className="grid grid-cols-2 gap-5">
            {availablePeople.map((person) => (
              <button
                key={person.id}
                type="button"
                onClick={() => togglePerson(person.id)}
                className={`p-4 rounded-2xl border-2 transition-all ${
                  selectedPeople.includes(person.id)
                    ? 'border-purple-500 bg-purple-100 shadow-md'
                    : 'border-slate-200 bg-white hover:border-purple-300'
                }`}
              >
                <div className="text-3xl mb-2">{person.emoji}</div>
                <p className="text-slate-700">{person.name}</p>
                <p className="text-slate-400 text-xs capitalize">{person.type}</p>
              </button>
            ))}
          </div>

          {selectedPeople.length > 0 && (
            <div className="mt-4 bg-purple-50 rounded-2xl p-5 text-center">
              <p className="text-purple-700">
                ✨ {selectedPeople.length} {selectedPeople.length === 1 ? 'person' : 'people'} selected
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Video Upload */}
      <div className="px-6 mt-6">
        <div className="bg-white border-2 border-pink-200 rounded-3xl p-6 shadow-md">
          <h3 className="text-pink-600 mb-4">📹 Prove you did it!</h3>
          <p className="text-slate-500 text-sm mb-4">Upload a video showing you completed the quest</p>
          
          {!videoFile ? (
            <label className="block">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-pink-300 rounded-2xl p-8 text-center cursor-pointer hover:border-pink-500 hover:bg-pink-50 transition-all">
                <Video className="text-pink-500 mx-auto mb-3" size={48} />
                <p className="text-pink-600 mb-2">Tap to upload video</p>
                <p className="text-slate-400 text-sm">Take a video with your device camera</p>
              </div>
            </label>
          ) : (
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-300 rounded-2xl p-6 flex items-center gap-5">
                <CheckCircle className="text-green-600" size={24} />
                <div className="flex-1">
                  <p className="text-green-700">Video uploaded!</p>
                  <p className="text-green-600 text-sm">{videoFile.name}</p>
                </div>
              </div>
              
              <label className="block">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  <Upload size={18} className="mr-2" />
                  Upload Different Video
                </Button>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Instructions Reminder */}
      <div className="px-6 mt-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5">
          <h3 className="text-blue-700 mb-3">📝 Quest Steps:</h3>
          <div className="space-y-2">
            {questData.instructions.slice(0, 3).map((instruction: string, index: number) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">
                  {index + 1}
                </div>
                <p className="text-blue-600 text-sm flex-1">{instruction}</p>
              </div>
            ))}
            {questData.instructions.length > 3 && (
              <p className="text-blue-400 text-sm ml-8">...and more!</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-6 mt-8 mb-6">
        <Button
          onClick={handleSubmit}
          disabled={!videoFile}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-16 rounded-2xl shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle className="mr-2" size={24} />
          Submit Challenge
        </Button>

        {!videoFile && (
          <p className="text-center text-slate-400 text-sm mt-3">
            Please upload a video to submit
          </p>
        )}
      </div>
    </div>
  );
}
