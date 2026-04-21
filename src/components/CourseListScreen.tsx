import { ArrowLeft, Star, Clock, PlayCircle } from 'lucide-react';
import { Badge } from './ui/badge';

interface CourseListScreenProps {
  category: string;
  onBack: () => void;
  onCourseSelect: (courseId: string) => void;
}

export const COURSE_CATEGORY_INFO: Record<string, { name: string; color: string; emoji: string }> = {
  'life-skills':              { name: 'Life Skills',              color: 'from-[#2563eb] to-[#1d4ed8]',  emoji: '🎯' },
  'creativity':               { name: 'Creativity',               color: 'from-purple-400 to-purple-500', emoji: '🎨' },
  'healthy-habits':           { name: 'Healthy Habits',           color: 'from-green-400 to-green-500',   emoji: '💪' },
  'social-skills':            { name: 'Social Skills',            color: 'from-pink-400 to-pink-500',     emoji: '🤝' },
  'teamwork':                 { name: 'Teamwork',                 color: 'from-blue-400 to-cyan-500',     emoji: '🤝' },
  'daily-habits':             { name: 'Daily Habits',             color: 'from-green-400 to-emerald-500', emoji: '⭐' },
  'emotional-intelligence':   { name: 'Emotional Intelligence',   color: 'from-red-400 to-pink-500',      emoji: '❤️' },
  'problem-solving':          { name: 'Problem Solving',          color: 'from-purple-400 to-indigo-500', emoji: '🧩' },
  'communication':            { name: 'Communication',            color: 'from-yellow-400 to-orange-400', emoji: '💬' },
};

export interface CourseSummary {
  id: string;
  title: string;
  emoji: string;
  duration: string;
  points: number;
  lessons: number;
  completed: number;
  category: string;
}

const RAW_COURSES: Record<string, Array<Omit<CourseSummary, 'category'>>> = {
  'life-skills': [
    { id: 'ls-1', title: 'Tying Your Shoes',     emoji: '👟', duration: '5 min',  points: 25, lessons: 3, completed: 0 },
    { id: 'ls-2', title: 'Making Your Bed',       emoji: '🛏️', duration: '4 min',  points: 20, lessons: 2, completed: 2 },
    { id: 'ls-3', title: 'Organizing Your Room',  emoji: '🧹', duration: '8 min',  points: 35, lessons: 4, completed: 0 },
    { id: 'ls-4', title: 'Telling Time',          emoji: '⏰', duration: '10 min', points: 40, lessons: 5, completed: 0 },
  ],
  'creativity': [
    { id: 'cr-1', title: 'Drawing Basics',        emoji: '✏️', duration: '12 min', points: 45, lessons: 5, completed: 2 },
    { id: 'cr-2', title: 'Painting with Colors',  emoji: '🎨', duration: '15 min', points: 50, lessons: 6, completed: 0 },
    { id: 'cr-3', title: 'Making Paper Crafts',   emoji: '📄', duration: '10 min', points: 40, lessons: 4, completed: 0 },
    { id: 'cr-4', title: 'Story Writing',         emoji: '📖', duration: '8 min',  points: 35, lessons: 4, completed: 0 },
  ],
  'healthy-habits': [
    { id: 'hh-1', title: 'Brushing Your Teeth',  emoji: '🪥', duration: '5 min',  points: 20, lessons: 3, completed: 3 },
    { id: 'hh-2', title: 'Healthy Eating',        emoji: '🥗', duration: '10 min', points: 40, lessons: 5, completed: 0 },
    { id: 'hh-3', title: 'Exercise & Movement',   emoji: '🏃', duration: '12 min', points: 45, lessons: 6, completed: 0 },
    { id: 'hh-4', title: 'Getting Good Sleep',    emoji: '😴', duration: '8 min',  points: 30, lessons: 4, completed: 0 },
  ],
  'social-skills': [
    { id: 'ss-1', title: 'Being a Good Friend',   emoji: '🤗', duration: '10 min', points: 40, lessons: 5, completed: 0 },
    { id: 'ss-2', title: 'Sharing & Caring',      emoji: '❤️', duration: '8 min',  points: 35, lessons: 4, completed: 0 },
    { id: 'ss-3', title: 'Saying Thank You',      emoji: '🙏', duration: '5 min',  points: 25, lessons: 3, completed: 0 },
    { id: 'ss-4', title: 'Listening Skills',      emoji: '👂', duration: '7 min',  points: 30, lessons: 3, completed: 0 },
  ],
  'teamwork': [
    { id: 'tw-1', title: 'Working as a Team',     emoji: '🤝', duration: '10 min', points: 35, lessons: 4, completed: 0 },
    { id: 'tw-2', title: 'Being a Good Leader',   emoji: '👑', duration: '12 min', points: 40, lessons: 5, completed: 0 },
    { id: 'tw-3', title: 'Helping Each Other',    emoji: '🙌', duration: '8 min',  points: 30, lessons: 4, completed: 0 },
    { id: 'tw-4', title: 'Solving Problems Together', emoji: '🧩', duration: '15 min', points: 45, lessons: 5, completed: 0 },
    { id: 'tw-5', title: 'Celebrating Success',   emoji: '🎉', duration: '6 min',  points: 25, lessons: 3, completed: 0 },
  ],
  'daily-habits': [
    { id: 'dh-1', title: 'Morning Routine',       emoji: '🌅', duration: '8 min',  points: 30, lessons: 4, completed: 0 },
    { id: 'dh-2', title: 'Staying Organized',     emoji: '📋', duration: '10 min', points: 35, lessons: 5, completed: 0 },
    { id: 'dh-3', title: 'Healthy Snack Habits',  emoji: '🍎', duration: '6 min',  points: 25, lessons: 3, completed: 0 },
    { id: 'dh-4', title: 'Screen Time Balance',   emoji: '📱', duration: '8 min',  points: 30, lessons: 4, completed: 0 },
    { id: 'dh-5', title: 'Bedtime Routine',       emoji: '🌙', duration: '7 min',  points: 28, lessons: 3, completed: 0 },
  ],
  'emotional-intelligence': [
    { id: 'ei-1', title: 'Naming Your Feelings',  emoji: '😊', duration: '8 min',  points: 30, lessons: 4, completed: 0 },
    { id: 'ei-2', title: 'Managing Anger',        emoji: '😤', duration: '10 min', points: 35, lessons: 5, completed: 0 },
    { id: 'ei-3', title: 'Showing Empathy',       emoji: '🫶', duration: '9 min',  points: 32, lessons: 4, completed: 0 },
    { id: 'ei-4', title: 'Handling Disappointment', emoji: '😔', duration: '8 min', points: 30, lessons: 4, completed: 0 },
    { id: 'ei-5', title: 'Feeling Confident',     emoji: '💪', duration: '10 min', points: 38, lessons: 5, completed: 0 },
  ],
  'problem-solving': [
    { id: 'ps-1', title: 'Think Before You Act',  emoji: '🤔', duration: '8 min',  points: 32, lessons: 4, completed: 0 },
    { id: 'ps-2', title: 'Finding Solutions',     emoji: '💡', duration: '10 min', points: 38, lessons: 5, completed: 0 },
    { id: 'ps-3', title: 'Creative Thinking',     emoji: '🎨', duration: '12 min', points: 42, lessons: 5, completed: 0 },
    { id: 'ps-4', title: 'Making Good Choices',   emoji: '✅', duration: '9 min',  points: 35, lessons: 4, completed: 0 },
    { id: 'ps-5', title: 'Learning from Mistakes', emoji: '📚', duration: '8 min', points: 30, lessons: 4, completed: 0 },
  ],
  'communication': [
    { id: 'co-1', title: 'Speaking Clearly',      emoji: '🗣️', duration: '8 min',  points: 28, lessons: 3, completed: 0 },
    { id: 'co-2', title: 'Active Listening',      emoji: '👂', duration: '10 min', points: 35, lessons: 4, completed: 0 },
    { id: 'co-3', title: 'Asking Good Questions', emoji: '❓', duration: '7 min',  points: 25, lessons: 3, completed: 0 },
    { id: 'co-4', title: 'Body Language',         emoji: '🤸', duration: '9 min',  points: 30, lessons: 4, completed: 0 },
    { id: 'co-5', title: 'Saying Sorry & Forgiving', emoji: '🕊️', duration: '8 min', points: 32, lessons: 4, completed: 0 },
  ],
};

export const COURSES_BY_CATEGORY: Record<string, CourseSummary[]> = Object.fromEntries(
  Object.entries(RAW_COURSES).map(([cat, list]) => [
    cat,
    list.map(c => ({ ...c, category: cat })),
  ]),
);

const ALL_COURSES: CourseSummary[] = Object.values(COURSES_BY_CATEGORY).flat();

export function getCourseById(courseId: string): CourseSummary | undefined {
  return ALL_COURSES.find(c => c.id === courseId);
}

export function CourseListScreen({ category, onBack, onCourseSelect }: CourseListScreenProps) {
  const info = COURSE_CATEGORY_INFO[category] || COURSE_CATEGORY_INFO['life-skills'];
  const courses = COURSES_BY_CATEGORY[category] || COURSES_BY_CATEGORY['life-skills'];

  return (
    <div className="h-full bg-gradient-to-b from-blue-50 to-white pb-20 overflow-y-auto">
      <div className={`bg-gradient-to-r ${info.color} px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg`}>
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-4">
          <ArrowLeft size={20} />
          Back
        </button>
        <div clas
