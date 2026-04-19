import { Palette, Users, ChevronRight, Star, Heart, Lightbulb, MessageCircle, Scissors } from 'lucide-react';
import { useTranslation, Language } from './translations';
import { UserProfile } from './ProfileSetupScreen';

interface CoursesScreenProps {
  onCategorySelect: (category: string) => void;
  language?: Language;
  userProfile?: UserProfile | null;
}

function getAgeGroup(age: number): '6-7' | '8-10' | '11-12' {
  if (age <= 7) return '6-7';
  if (age <= 10) return '8-10';
  return '11-12';
}

const AGE_COURSES: Record<string, Record<string, { name: string; emoji: string; count: number }[]>> = {
  '6-7': {
    creativity: [
      { name: 'Drawing Basics', emoji: '✏️', count: 5 },
      { name: 'Simple Origami', emoji: '🗺️', count: 4 },
      { name: 'Easy Crafts', emoji: '✂️', count: 6 },
      { name: 'Helping at Home', emoji: '🏠', count: 4 },
    ],
  },
  '8-10': {
    creativity: [
      { name: 'DIY Projects', emoji: '🔨', count: 6 },
      { name: 'Story Creation', emoji: '📖', count: 5 },
      { name: 'Logic Challenges', emoji: '🧩', count: 7 },
      { name: 'Cooking Basics', emoji: '🍳', count: 5 },
    ],
  },
  '11-12': {
    creativity: [
      { name: 'Creative Projects', emoji: '🎭', count: 6 },
      { name: 'Communication Skills', emoji: '💬', count: 5 },
      { name: 'Real-Life Scenarios', emoji: '🌍', count: 7 },
      { name: 'Goal Setting', emoji: '🎯', count: 5 },
    ],
  },
};

export function CoursesScreen({ onCategorySelect, language = 'en', userProfile }: CoursesScreenProps) {
  const t = useTranslation(language);
  const age = userProfile?.age || 9;
  const ageGroup = getAgeGroup(age);

  const ageCourses = AGE_COURSES[ageGroup]?.creativity || AGE_COURSES['8-10'].creativity;

  const ageGroupLabel =
    ageGroup === '6-7' ? 'Ages 6–7' : ageGroup === '8-10' ? 'Ages 8–10' : 'Ages 11–12';

  const categories = [
    {
      id: 'paper-crafts',
      name: 'Paper Crafts',
      icon: Scissors,
      color: 'from-amber-400 to-orange-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      emoji: '✂️',
      count: 7,
      description: 'Origami & paper folding',
      featured: true,
    },
    {
      id: 'creativity',
      name: t.creativity,
      icon: Palette,
      color: 'from-pink-400 to-purple-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      emoji: '🎨',
      count: 12,
      description: 'Art, music, and imagination',
    },
    {
      id: 'teamwork',
      name: t.teamwork,
      icon: Users,
      color: 'from-blue-400 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      emoji: '🤝',
      count: 8,
      description: 'Working together skills',
    },
    {
      id: 'daily-habits',
      name: t.dailyHabits,
      icon: Star,
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      emoji: '⭐',
      count: 10,
      description: 'Build healthy routines',
    },
    {
      id: 'emotional-intelligence',
      name: t.emotions,
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      emoji: '❤️',
      count: 7,
      description: 'Understanding feelings',
    },
    {
      id: 'problem-solving',
      name: t.problemSolving,
      icon: Lightbulb,
      color: 'from-purple-400 to-indigo-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      emoji: '🧩',
      count: 9,
      description: 'Critical thinking skills',
    },
    {
      id: 'communication',
      name: t.communication,
      icon: MessageCircle,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      emoji: '💬',
      count: 6,
      description: 'Express yourself clearly',
    },
  ];

  return (
    <div className="h-full bg-background pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <h2 className="text-white font-bold text-2xl mb-2">{t.learningPaths}</h2>
        <p className="text-indigo-100 mb-4">{t.chooseJourney}</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3">
          <p className="text-white text-sm">✨ {t.selfDirectedCourses}</p>
        </div>
      </div>

      {/* Age-based recommended courses */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border-2 border-indigo-200 dark:border-indigo-700 rounded-3xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎯</span>
            <h3 className="text-indigo-700 dark:text-indigo-300 font-bold">Recommended for {ageGroupLabel}</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {ageCourses.map((course) => (
              <button
                key={course.name}
                onClick={() => onCategorySelect('creativity')}
                className="bg-white dark:bg-card rounded-2xl p-3 text-left shadow-sm border border-indigo-100 dark:border-indigo-800 active:scale-95 transition-transform"
              >
                <div className="text-2xl mb-1">{course.emoji}</div>
                <p className="text-foreground font-semibold text-xs">{course.name}</p>
                <p className="text-muted-foreground text-xs">{course.count} lessons</p>
              </button>
            ))}
          </div>
        </div>

        {/* Featured: Paper Crafts */}
        <button
          onClick={() => onCategorySelect('paper-crafts')}
          className="w-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-5 mb-5 shadow-lg active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 rounded-2xl p-3 text-4xl">✂️</div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-bold text-lg">Paper Crafts</p>
                <span className="bg-white/30 text-white text-xs font-bold px-2 py-0.5 rounded-full">NEW ✨</span>
              </div>
              <p className="text-amber-100 text-sm">Origami from Easy → Advanced</p>
              <p className="text-amber-100 text-xs mt-1">7 step-by-step tutorials with videos</p>
            </div>
            <ChevronRight className="text-white" size={24} />
          </div>
        </button>

        <h3 className="text-foreground font-bold mb-4">{t.chooseLearningPath}</h3>
        <div className="space-y-3">
          {categories.filter(c => c.id !== 'paper-crafts').map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="w-full bg-card border-2 border-border rounded-3xl p-5 shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-4 text-white shadow-lg`}>
                    <Icon size={28} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-foreground font-bold">{category.name}</h3>
                      <span className="text-xl">{category.emoji}</span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-1">{category.description}</p>
                    <p className="text-muted-foreground text-xs">{category.count} {t.coursesAvailable}</p>
                  </div>
                  <ChevronRight className="text-muted-foreground" size={22} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Learning */}
      <div className="px-6 mt-6 mb-6">
        <h3 className="text-foreground font-bold mb-4">{t.continueLearning}</h3>
        <div className="bg-card border-2 border-border rounded-3xl p-5 shadow-md">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-2xl p-3 text-3xl">🎨</div>
            <div className="flex-1">
              <p className="text-foreground font-semibold">Drawing Basics</p>
              <p className="text-muted-foreground text-sm">2 of 5 {t.lessonsComplete}</p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-purple-500 rounded-full h-2" style={{ width: '40%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
