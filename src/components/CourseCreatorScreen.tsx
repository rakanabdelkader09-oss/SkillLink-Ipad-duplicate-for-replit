import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTranslation, Language } from './translations';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
}

interface CourseCreatorScreenProps {
  onBack: () => void;
  onSave: (courseData: CourseData) => void;
  language: string;
  existingCourse?: CourseData;
}

export interface CourseData {
  id?: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  lessons: Lesson[];
  status: 'draft' | 'published';
}

const categoryOptions = [
  { value: 'creativity', label: 'Creativity', icon: '🎨' },
  { value: 'teamwork', label: 'Teamwork', icon: '🤝' },
  { value: 'daily-habits', label: 'Daily Habits', icon: '📅' },
  { value: 'emotions', label: 'Emotions', icon: '❤️' },
  { value: 'problem-solving', label: 'Problem Solving', icon: '🧩' },
  { value: 'communication', label: 'Communication', icon: '💬' },
  { value: 'math', label: 'Math', icon: '🔢' },
  { value: 'reading', label: 'Reading', icon: '📚' },
  { value: 'science', label: 'Science', icon: '🔬' },
  { value: 'art', label: 'Art', icon: '🖼️' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'coding', label: 'Coding', icon: '💻' },
];

export function CourseCreatorScreen({
  onBack,
  onSave,
  language,
  existingCourse,
}: CourseCreatorScreenProps) {
  const t = useTranslation(language as Language);
  const [title, setTitle] = useState(existingCourse?.title || '');
  const [description, setDescription] = useState(existingCourse?.description || '');
  const [category, setCategory] = useState(existingCourse?.category || '');
  const [icon, setIcon] = useState(existingCourse?.icon || '📚');
  const [lessons, setLessons] = useState<Lesson[]>(existingCourse?.lessons || []);
  const [error, setError] = useState('');

  const selectedCategory = categoryOptions.find(c => c.value === category);

  const handleAddLesson = () => {
    const newLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      title: '',
      duration: '10 min',
      videoUrl: '',
    };
    setLessons([...lessons, newLesson]);
  };

  const handleRemoveLesson = (id: string) => {
    setLessons(lessons.filter(l => l.id !== id));
  };

  const handleLessonChange = (id: string, field: keyof Lesson, value: string) => {
    setLessons(lessons.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleSaveAsDraft = () => {
    if (!title.trim()) {
      setError('Please enter a course title');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a course description');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }
    if (lessons.length === 0) {
      setError('Please add at least one lesson');
      return;
    }

    const courseData: CourseData = {
      ...(existingCourse?.id && { id: existingCourse.id }),
      title,
      description,
      category,
      icon: selectedCategory?.icon || icon,
      lessons,
      status: 'draft',
    };

    onSave(courseData);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      setError('Please enter a course title');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a course description');
      return;
    }
    if (!category) {
      setError('Please select a category');
      return;
    }
    if (lessons.length === 0) {
      setError('Please add at least one lesson');
      return;
    }

    // Check if all lessons have titles
    const incompleteLessons = lessons.filter(l => !l.title.trim());
    if (incompleteLessons.length > 0) {
      setError('All lessons must have titles before publishing');
      return;
    }

    const courseData: CourseData = {
      ...(existingCourse?.id && { id: existingCourse.id }),
      title,
      description,
      category,
      icon: selectedCategory?.icon || icon,
      lessons,
      status: 'published',
    };

    onSave(courseData);
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">
            {existingCourse ? t.editCourse : t.createNewCourse}
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {error && (
          <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl">
            {error}
          </div>
        )}

        {/* Course Title */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <Label htmlFor="title" className="text-card-foreground mb-2 block">
            {t.courseTitle}
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className="h-12 rounded-xl"
          />
        </div>

        {/* Course Description */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <Label htmlFor="description" className="text-card-foreground mb-2 block">
            {t.courseDescription}
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what students will learn"
            className="min-h-24 rounded-xl"
          />
        </div>

        {/* Category Selection */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <Label className="text-card-foreground mb-2 block">
            {t.courseCategory}
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lessons Section */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-card-foreground">Lessons ({lessons.length})</h3>
            <Button
              onClick={handleAddLesson}
              size="sm"
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.addLesson}
            </Button>
          </div>

          {lessons.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No lessons added yet.</p>
              <p>Click "Add Lesson" to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="border-2 border-border rounded-xl p-6 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-card-foreground">Lesson {index + 1}</p>
                    <button
                      onClick={() => handleRemoveLesson(lesson.id)}
                      className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      {t.lessonTitle}
                    </Label>
                    <Input
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(lesson.id, 'title', e.target.value)}
                      placeholder="e.g., Introduction to Colors"
                      className="h-10 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Duration
                    </Label>
                    <Input
                      value={lesson.duration}
                      onChange={(e) => handleLessonChange(lesson.id, 'duration', e.target.value)}
                      placeholder="e.g., 10 min"
                      className="h-10 rounded-lg"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground mb-1 block">
                      Video URL (Optional)
                    </Label>
                    <Input
                      value={lesson.videoUrl || ''}
                      onChange={(e) => handleLessonChange(lesson.id, 'videoUrl', e.target.value)}
                      placeholder="https://..."
                      className="h-10 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue Info */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-5 shadow-md border-2 border-green-200 dark:border-green-800">
          <h3 className="text-card-foreground mb-2">💰 {t.revenuePerStudent}</h3>
          <p className="text-muted-foreground mb-3">
            Earn $2.00 per student who enrolls in your course. Students are charged when they start your course.
          </p>
          <div className="bg-white dark:bg-card rounded-xl p-5">
            <p className="text-muted-foreground">Potential Earnings:</p>
            <div className="flex items-baseline gap-4 mt-1">
              <span className="text-card-foreground">$2.00</span>
              <span className="text-muted-foreground">per student</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 sticky bottom-6">
          <Button
            onClick={handleSaveAsDraft}
            variant="outline"
            className="flex-1 h-14 rounded-2xl border-2"
          >
            <Save className="w-5 h-5 mr-2" />
            {t.save} as {t.draft}
          </Button>
          <Button
            onClick={handlePublish}
            className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
          >
            {t.publish}
          </Button>
        </div>
      </div>
    </div>
  );
}
