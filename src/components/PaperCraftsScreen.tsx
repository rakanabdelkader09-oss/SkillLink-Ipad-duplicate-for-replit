import { useState, useRef } from 'react';
import { ArrowLeft, ChevronRight, CheckCircle, Star, Lock } from 'lucide-react';
import { Progress } from './ui/progress';

interface PaperCraftsScreenProps {
  onBack: () => void;
}

interface OrigamiStep {
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
}

interface OrigamiCourse {
  id: string;
  title: string;
  emoji: string;
  difficulty: 'easy' | 'intermediate' | 'advanced';
  steps: OrigamiStep[];
  points: number;
  locked?: boolean;
  completed?: boolean;
}

const COURSES: OrigamiCourse[] = [
  {
    id: 'paper-boat',
    title: 'Paper Boat',
    emoji: '⛵',
    difficulty: 'easy',
    points: 20,
    completed: false,
    steps: [
      { title: 'Fold in half', description: 'Take your paper and fold it in half horizontally.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
      { title: 'Fold corners down', description: 'Fold both top corners down to the center crease.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
      { title: 'Fold bottom strips up', description: 'Fold the bottom strip up on both sides.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
      { title: 'Open and shape', description: 'Open the bottom and press corners together to form the boat.', youtubeId: 'OBuP0DV7dGA', thumbnail: 'https://img.youtube.com/vi/OBuP0DV7dGA/mqdefault.jpg' },
    ],
  },
  {
    id: 'paper-airplane',
    title: 'Paper Airplane',
    emoji: '✈️',
    difficulty: 'easy',
    points: 20,
    completed: false,
    steps: [
      { title: 'Fold lengthwise', description: 'Fold the paper in half lengthwise and unfold.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Fold top corners', description: 'Fold both top corners to the center line.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Fold sides inward', description: 'Fold the slanted edges to the center again.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Form wings', description: 'Fold both sides down to create the wings.', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
      { title: 'Fly!', description: 'Open the wings and test your plane!', youtubeId: 'veyZNyurlwU', thumbnail: 'https://img.youtube.com/vi/veyZNyurlwU/mqdefault.jpg' },
    ],
  },
  {
    id: 'paper-cup',
    title: 'Paper Cup',
    emoji: '🥤',
    difficulty: 'easy',
    points: 20,
    steps: [
      { title: 'Fold diagonally', description: 'Fold the square paper diagonally to make a triangle.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Fold right corner', description: 'Fold the right corner to the left edge.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Fold left corner', description: 'Fold the left corner to the right edge.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Fold top flaps', description: 'Fold down the front flap, flip and fold the back flap.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
      { title: 'Open the cup', description: 'Push your fingers inside and open the cup shape.', youtubeId: 'kF-yGVRuuVk', thumbnail: 'https://img.youtube.com/vi/kF-yGVRuuVk/mqdefault.jpg' },
    ],
  },
  {
    id: 'origami-crane',
    title: 'Origami Crane',
    emoji: '🕊️',
    difficulty: 'intermediate',
    points: 35,
    steps: [
      { title: 'Start with square base', description: 'Fold your square paper into the preliminary base.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Petal fold', description: 'Perform the petal fold on the front and back.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Form the body', description: 'Fold the sides inward to narrow the body.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Shape the neck and tail', description: 'Fold one point up for the neck, the other for the tail.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Fold the head', description: 'Inside-reverse fold the top of the neck to make the head.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
      { title: 'Open the wings', description: 'Gently pull the wings apart and puff the body.', youtubeId: 'FxgQVDjXnU4', thumbnail: 'https://img.youtube.com/vi/FxgQVDjXnU4/mqdefault.jpg' },
    ],
  },
  {
    id: 'origami-frog',
    title: 'Jumping Frog',
    emoji: '🐸',
    difficulty: 'intermediate',
    points: 35,
    steps: [
      { title: 'Fold and crease', description: 'Create valley and mountain folds to form the base.', youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
      { title: 'Form the front legs', description: "Create the frog's two front legs from the top section.", youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
      { title: 'Form the back legs', description: 'Fold the bottom section to create the back legs.', youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
      { title: 'Make it jump!', description: 'Press the back and release — your frog jumps!', youtubeId: '2HLwnynrMFQ', thumbnail: 'https://img.youtube.com/vi/2HLwnynrMFQ/mqdefault.jpg' },
    ],
  },
  {
    id: 'origami-dragon',
    title: 'Origami Dragon',
    emoji: '🐉',
    difficulty: 'advanced',
    points: 50,
    locked: true,
    steps: [
      { title: 'Bird base', description: 'Start with an advanced bird base fold.', youtubeId: 'IGbCWXqcqik', thumbnail: 'https://img.youtube.com/vi/IGbCWXqcqik/mqdefault.jpg' },
      { title: 'Shape the body', description: 'Narrow and shape the body of the dragon.', youtubeId: 'IGbCWXqcqik', thumbnail: 'https://img.youtube.com/vi/IGbCWXqcqik/mqdefault.jpg' },
      { title: 'Form the wings', description: 'Open and shape both wings.', youtubeId: 'IGbCWXqcqik', thumbnail: 'https://img.youtube.com/vi/IGbCWXqcqik/mqdefault.jpg' },
      { title: 'Shape head and tail', description: 'Use reverse folds for the head and curved tail.', youtubeId: 'IGbCWXqcqik', thumbnail: 'https://img.youtube.com/vi/IGbCWXqcqik/mqdefault.jpg' },
      { title: 'Final details', description: 'Curl the wings and tail for final polish.', youtubeId: 'IGbCWXqcqik', thumbnail: 'https://img.youtube.com/vi/IGbCWXqcqik/mqdefault.jpg' },
    ],
  },
  {
    id: 'origami-rose',
    title: 'Origami Rose',
    emoji: '🌹',
    difficulty: 'advanced',
    points: 50,
    locked: true,
    steps: [
      { title: 'Waterbomb base', description: 'Fold a waterbomb base from your square sheet.', youtubeId: '1ByFjKWnzBY', thumbnail: 'https://img.youtube.com/vi/1ByFjKWnzBY/mqdefault.jpg' },
      { title: 'Twist method', description: 'Apply the twist fold technique.', youtubeId: '1ByFjKWnzBY', thumbnail: 'https://img.youtube.com/vi/1ByFjKWnzBY/mqdefault.jpg' },
      { title: 'Shape petals', description: 'Open and curve each petal outward.', youtubeId: '1ByFjKWnzBY', thumbnail: 'https://img.youtube.com/vi/1ByFjKWnzBY/mqdefault.jpg' },
      { title: 'Form the base', description: 'Fold and lock the stem/base section.', youtubeId: '1ByFjKWnzBY', thumbnail: 'https://img.youtube.com/vi/1ByFjKWnzBY/mqdefault.jpg' },
      { title: 'Final shaping', description: 'Gently open outer petals for a full bloom.', youtubeId: '1ByFjKWnzBY', thumbnail: 'https://img.youtube.com/vi/1ByFjKWnzBY/mqdefault.jpg' },
    ],
  },
];

const DIFFICULTY_CONFIG = {
  easy: { label: 'Easy', color: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-200 dark:border-green-800', gradient: 'from-green-400 to-emerald-500' },
  intermediate: { label: 'Intermediate', color: 'bg-yellow-500', textColor: 'text-yellow-700', bgColor: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-200 dark:border-yellow-800', gradient: 'from-yellow-400 to-orange-400' },
  advanced: { label: 'Advanced', color: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-200 dark:border-red-800', gradient: 'from-red-400 to-rose-500' },
};

function YouTubePlayer({ youtubeId }: { youtubeId: string }) {
  return (
    <div
      className="relative w-full h-44 bg-black"
      onClick={() =>
        window.open(`https://www.youtube.com/watch?v=${youtubeId}`, "_blank")
      }
    >
      <img
        src={`https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`}
        alt="Video thumbnail"
        className="w-full h-full object-cover opacity-80"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/320x180/1e1e1e/ffffff?text=Tap+to+Play";
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
        Tap to play
      </div>
    </div>
  );
}

  return (
    <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
      <iframe
        src={src}
        className="absolute inset-0 w-full h-full"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

function CourseStepsView({ course, onBack }: { course: OrigamiCourse; onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const progress = (completedSteps.size / course.steps.length) * 100;
  const step = course.steps[currentStep];
  const diff = DIFFICULTY_CONFIG[course.difficulty];

  return (
    <div className="h-full bg-background overflow-y-auto pb-6">
      <div className={`bg-gradient-to-br ${diff.gradient} px-6 pt-12 pb-6 rounded-b-[3rem] shadow-lg`}>
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4 active:opacity-70">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="text-center">
          <div className="text-6xl mb-2">{course.emoji}</div>
          <h2 className="text-white font-bold text-xl mb-1">{course.title}</h2>
          <span className={`inline-block ${diff.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {diff.label}
          </span>
        </div>
        <div className="mt-4 bg-white/20 rounded-2xl p-4">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>{completedSteps.size}/{course.steps.length} steps done</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-white/30" />
        </div>
      </div>

      <div className="px-6 mt-5">
        {/* Step pills */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-5 no-scrollbar">
          {course.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                completedSteps.has(i)
                  ? 'bg-green-500 border-green-500 text-white'
                  : i === currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-card border-border text-muted-foreground'
              }`}
            >
              {completedSteps.has(i) ? '✓' : i + 1}
            </button>
          ))}
        </div>

        {/* Video + step card */}
        <div className="bg-card border-2 border-border rounded-3xl overflow-hidden shadow-md mb-4">
          <YouTubePlayer youtubeId={step.youtubeId} key={step.youtubeId + currentStep} />
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full pointer-events-none">
            Step {currentStep + 1} of {course.steps.length}
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-5 mb-3">
              <div>
                <h3 className="text-foreground font-bold text-lg">Step {currentStep + 1}: {step.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{step.description}</p>
              </div>
              <button
                onClick={() => toggleStep(currentStep)}
                className={`flex-shrink-0 w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                  completedSteps.has(currentStep)
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {completedSteps.has(currentStep) ? <CheckCircle size={20} /> : <span className="text-lg">○</span>}
              </button>
            </div>

            <div className="flex gap-3">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(i => i - 1)}
                  className="flex-1 py-3 bg-muted rounded-2xl text-foreground font-semibold text-sm active:scale-95 transition-transform"
                >
                  ← Previous
                </button>
              )}
              {currentStep < course.steps.length - 1 ? (
                <button
                  onClick={() => { toggleStep(currentStep); setCurrentStep(i => i + 1); }}
                  className="flex-1 py-3 bg-primary rounded-2xl text-primary-foreground font-semibold text-sm active:scale-95 transition-transform"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={() => toggleStep(currentStep)}
                  className="flex-1 py-3 bg-green-500 rounded-2xl text-white font-semibold text-sm active:scale-95 transition-transform"
                >
                  {completedSteps.has(currentStep) ? '✅ Done!' : 'Mark Complete!'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* All steps list */}
        <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-md">
          <h3 className="text-foreground font-bold mb-3">All Steps</h3>
          <div className="space-y-2">
            {course.steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all ${
                  i === currentStep ? 'bg-primary/10 border border-primary' : 'bg-muted/50 hover:bg-muted'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  completedSteps.has(i) ? 'bg-green-500 text-white' : i === currentStep ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
                }`}>
                  {completedSteps.has(i) ? '✓' : i + 1}
                </div>
                <span className={`text-sm font-medium ${completedSteps.has(i) ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PaperCraftsScreen({ onBack }: PaperCraftsScreenProps) {
  const [selectedCourse, setSelectedCourse] = useState<OrigamiCourse | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (selectedCourse) {
    return <CourseStepsView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

  const easy = COURSES.filter(c => c.difficulty === 'easy');
  const intermediate = COURSES.filter(c => c.difficulty === 'intermediate');
  const advanced = COURSES.filter(c => c.difficulty === 'advanced');

  const renderSection = (title: string, emoji: string, courses: OrigamiCourse[], diff: keyof typeof DIFFICULTY_CONFIG) => {
    const config = DIFFICULTY_CONFIG[diff];
    return (
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xl">{emoji}</span>
          <h3 className="text-foreground font-bold">{title}</h3>
          <span className={`${config.color} text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1`}>{config.label}</span>
        </div>
        <div className="space-y-3">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => !course.locked && setSelectedCourse(course)}
              className={`w-full flex items-center gap-4 p-4 rounded-3xl border-2 ${config.bgColor} ${config.borderColor} shadow-sm transition-all ${course.locked ? 'opacity-60' : 'active:scale-[0.98] hover:shadow-md'}`}
            >
              <div className={`bg-gradient-to-br ${config.gradient} rounded-2xl p-3 text-3xl shadow-md`}>
                {course.emoji}
              </div>
              <div className="flex-1 text-left">
                <p className={`font-bold ${config.textColor}`}>{course.title}</p>
                <p className="text-muted-foreground text-xs">{course.steps.length} steps</p>
                <div className="mt-1 inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  <Star size={10} fill="currentColor" />
                  <span>+{course.points} SC coins</span>
                </div>
                {course.completed && <span className="block mt-1 text-xs text-green-600 font-semibold">✅ Completed</span>}
              </div>
              <div className="flex items-center gap-4">
                {course.locked ? (
                  <div className="flex flex-col items-center gap-1">
                    <Lock size={18} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Locked</span>
                  </div>
                ) : (
                  <>
                    <div className="flex">
                      {[...Array(diff === 'easy' ? 1 : diff === 'intermediate' ? 2 : 3)].map((_, i) => (
                        <Star key={i} size={14} className={config.textColor} fill="currentColor" />
                      ))}
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground" />
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full bg-background overflow-y-auto pb-6">
     <video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  webkit-playsinline="true"
  preload="auto"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/paper-crafts-header.mp4" type="video/mp4" />
</video>
        <button
          onClick={onBack}
          className="absolute top-12 left-4 z-10 bg-black/40 text-white rounded-full p-2 backdrop-blur-sm active:opacity-70"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-end pb-6 px-6 pointer-events-none">
          <div className="text-center">
            <p className="text-4xl mb-2">📜✂️</p>
            <h2 className="text-white font-bold text-2xl drop-shadow-lg">Paper Crafts</h2>
            <p className="text-white/90 text-sm">Learn origami step-by-step</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl p-5 mb-6 shadow-lg">
          <div className="flex items-center gap-5">
            <div className="text-4xl">🎁</div>
            <div>
              <h3 className="text-white font-bold">Start with Easy!</h3>
              <p className="text-amber-100 text-sm">Progress from Easy → Intermediate → Advanced</p>
            </div>
          </div>
        </div>
        {renderSection('Beginner', '🌱', easy, 'easy')}
        {renderSection('Intermediate', '⚡', intermediate, 'intermediate')}
        {renderSection('Master', '🏆', advanced, 'advanced')}
      </div>
    </div>
  );
}
