import { ArrowLeft, Star, Clock, PlayCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface CourseListScreenProps {
  category: string;
  onBack: () => void;
  onCourseSelect: (courseId: string) => void;
}

export function CourseListScreen({ category, onBack, onCourseSelect }: CourseListScreenProps) {
  const categoryInfo: Record<string, { name: string; color: string; emoji: string }> = {
    'life-skills': { name: 'Life Skills', color: 'from-[#2563eb] to-[#1d4ed8]', emoji: '🎯' },
    'creativity': { name: 'Creativity', color: 'from-purple-400 to-purple-500', emoji: '🎨' },
    'healthy-habits': { name: 'Healthy Habits', color: 'from-green-400 to-green-500', emoji: '💪' },
    'social-skills': { name: 'Social Skills', color: 'from-pink-400 to-pink-500', emoji: '🤝' },
  };

  const coursesData: Record<string, Array<any>> = {
    'life-skills': [
      { id: 'ls-1', title: 'Tying Your Shoes', emoji: '👟', duration: '5 min', points: 25, lessons: 3, completed: 0 },
      { id: 'ls-2', title: 'Making Your Bed', emoji: '🛏️', duration: '4 min', points: 20, lessons: 2, completed: 2 },
      { id: 'ls-3', title: 'Organizing Your Room', emoji: '🧹', duration: '8 min', points: 35, lessons: 4, completed: 0 },
      { id: 'ls-4', title: 'Telling Time', emoji: '⏰', duration: '10 min', points: 40, lessons: 5, completed: 0 },
    ],
    'creativity': [
      { id: 'cr-1', title: 'Drawing Basics', emoji: '✏️', duration: '12 min', points: 45, lessons: 5, completed: 2 },
      { id: 'cr-2', title: 'Painting with Colors', emoji: '🎨', duration: '15 min', points: 50, lessons: 6, completed: 0 },
      { id: 'cr-3', title: 'Making Paper Crafts', emoji: '📄', duration: '10 min', points: 40, lessons: 4, completed: 0 },
      { id: 'cr-4', title: 'Story Writing', emoji: '📖', duration: '8 min', points: 35, lessons: 4, completed: 0 },
    ],
    'healthy-habits': [
      { id: 'hh-1', title: 'Brushing Your Teeth', emoji: '🪥', duration: '5 min', points: 20, lessons: 3, completed: 3 },
      { id: 'hh-2', title: 'Healthy Eating', emoji: '🥗', duration: '10 min', points: 40, lessons: 5, completed: 0 },
      { id: 'hh-3', title: 'Exercise & Movement', emoji: '🏃', duration: '12 min', points: 45, lessons: 6, completed: 0 },
      { id: 'hh-4', title: 'Getting Good Sleep', emoji: '😴', duration: '8 min', points: 30, lessons: 4, completed: 0 },
    ],
    'social-skills': [
      { id: 'ss-1', title: 'Being a Good Friend', emoji: '🤗', duration: '10 min', points: 40, lessons: 5, completed: 0 },
      { id: 'ss-2', title: 'Sharing & Caring', emoji: '❤️', duration: '8 min', points: 35, lessons: 4, completed: 0 },
      { id: 'ss-3', title: 'Saying Thank You', emoji: '🙏', duration: '5 min', points: 25, lessons: 3, completed: 0 },
      { id: 'ss-4', title: 'Listening Skills', emoji: '👂', duration: '7 min', points: 30, lessons: 3, completed: 0 },
    ],
  };

  const info = categoryInfo[category] || categoryInfo['life-skills'];
  const courses = coursesData[category] || coursesData['life-skills'];

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className={`bg-gradient-to-r ${info.color} px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg`}>
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4">
          <ArrowLeft size={20} />
          Back
        </button>
        <div className="flex items-center gap-5 mb-2">
          <h2 className="text-white">{info.name}</h2>
          <span className="text-4xl">{info.emoji}</span>
        </div>
        <p className="text-white/80">{courses.length} courses to explore</p>
      </div>

      {/* Course Cards */}
      <div className="px-6 mt-6 space-y-4">
        {courses.map((course) => {
          const progress = course.completed > 0 ? (course.completed / course.lessons) * 100 : 0;
          const isCompleted = course.completed === course.lessons;

          return (
            <button
              key={course.id}
              onClick={() => onCourseSelect(course.id)}
              className="w-full bg-white border-2 border-blue-100 rounded-3xl shadow-md hover:shadow-xl transition-all transform hover:scale-[1.02] overflow-hidden"
            >
              {/* Thumbnail Area */}
              <div className={`bg-gradient-to-br ${info.color} h-32 flex items-center justify-center relative`}>
                <div className="text-7xl">{course.emoji}</div>
                {isCompleted && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full px-3 py-1 flex items-center gap-1">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm">Done!</span>
                  </div>
                )}
                {!isCompleted && course.completed > 0 && (
                  <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-sm">
                    In Progress
                  </div>
                )}
              </div>

              {/* Course Info */}
              <div className="p-5">
                <h3 className="text-slate-700 mb-2 text-left">{course.title}</h3>
                
                <div className="flex items-center gap-4 mb-3 text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="text-sm">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle size={16} />
                    <span className="text-sm">{course.lessons} lessons</span>
                  </div>
                  <Badge className="bg-blue-500 text-sm">+{course.points} pts</Badge>
                </div>

                {/* Progress Bar */}
                {progress > 0 && (
                  <div>
                    <div className="flex justify-between text-sm text-slate-500 mb-1">
                      <span>{course.completed}/{course.lessons} complete</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-500 rounded-full h-2 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}