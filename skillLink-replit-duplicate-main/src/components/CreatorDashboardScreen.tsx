import { useState } from 'react';
import { ArrowLeft, Plus, TrendingUp, Users, BookOpen, DollarSign, Eye, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { useTranslation, Language } from './translations';

export interface CreatorCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  lessonsCount: number;
  studentsEnrolled: number;
  totalViews: number;
  status: 'draft' | 'published';
  createdAt: string;
  earnings: number;
}

interface CreatorDashboardScreenProps {
  onBack: () => void;
  onCreateCourse: () => void;
  onEditCourse: (courseId: string) => void;
  onViewAnalytics: (courseId: string) => void;
  creatorName: string;
  courses: CreatorCourse[];
  language: string;
}

export function CreatorDashboardScreen({
  onBack,
  onCreateCourse,
  onEditCourse,
  onViewAnalytics,
  creatorName,
  courses,
  language,
}: CreatorDashboardScreenProps) {
  const t = useTranslation(language as Language);
  const [selectedTab, setSelectedTab] = useState<'all' | 'published' | 'draft'>('all');

  // Calculate stats
  const totalEarnings = courses.reduce((sum, course) => sum + course.earnings, 0);
  const totalStudents = courses.reduce((sum, course) => sum + course.studentsEnrolled, 0);
  const publishedCourses = courses.filter(c => c.status === 'published').length;
  const totalViews = courses.reduce((sum, course) => sum + course.totalViews, 0);

  // Filter courses
  const filteredCourses = selectedTab === 'all' 
    ? courses 
    : courses.filter(c => c.status === selectedTab);

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-background overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-white">✨ {t.creatorDashboard}</h1>
        </div>
        <p className="text-white/90">Welcome back, {creatorName}!</p>
      </div>

      {/* Stats Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-5 mb-2">
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-xl">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-muted-foreground">{t.totalEarnings}</p>
          </div>
          <p className="text-card-foreground">${totalEarnings.toFixed(2)}</p>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-5 mb-2">
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-xl">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-muted-foreground">{t.studentsEnrolled}</p>
          </div>
          <p className="text-card-foreground">{totalStudents}</p>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-5 mb-2">
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-xl">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-muted-foreground">{t.publishedCourses}</p>
          </div>
          <p className="text-card-foreground">{publishedCourses}</p>
        </div>

        <div className="bg-white dark:bg-card rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-5 mb-2">
            <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-xl">
              <Eye className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-muted-foreground">Total Views</p>
          </div>
          <p className="text-card-foreground">{totalViews}</p>
        </div>
      </div>

      {/* Create Course Button */}
      <div className="px-6 mb-6">
        <Button
          onClick={onCreateCourse}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-14 rounded-2xl shadow-lg flex items-center justify-center gap-4"
        >
          <Plus className="w-5 h-5" />
          {t.createNewCourse}
        </Button>
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="bg-white dark:bg-card rounded-2xl p-2 shadow-md flex gap-4">
          <button
            onClick={() => setSelectedTab('all')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              selectedTab === 'all'
                ? 'bg-purple-500 text-white'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setSelectedTab('published')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              selectedTab === 'published'
                ? 'bg-purple-500 text-white'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setSelectedTab('draft')}
            className={`flex-1 py-3 rounded-xl transition-colors ${
              selectedTab === 'draft'
                ? 'bg-purple-500 text-white'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Drafts
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="px-6 space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="bg-white dark:bg-card rounded-2xl p-8 text-center shadow-md">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-card-foreground mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first course and start earning!
            </p>
            <Button
              onClick={onCreateCourse}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t.createCourse}
            </Button>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-card rounded-2xl p-5 shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-5">
                  <div className="text-3xl">{course.icon}</div>
                  <div>
                    <h3 className="text-card-foreground">{course.title}</h3>
                    <p className="text-muted-foreground">{course.description}</p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    course.status === 'published'
                      ? 'bg-green-500'
                      : 'bg-gray-400'
                  }`}
                >
                  {course.status === 'published' ? t.publish : t.draft}
                </span>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-5 mb-4">
                <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-5">
                  <p className="text-muted-foreground mb-1">Students</p>
                  <p className="text-card-foreground">{course.studentsEnrolled}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 rounded-xl p-5">
                  <p className="text-muted-foreground mb-1">Earnings</p>
                  <p className="text-card-foreground">${course.earnings.toFixed(2)}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-5">
                  <p className="text-muted-foreground mb-1">Lessons</p>
                  <p className="text-card-foreground">{course.lessonsCount}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={() => onEditCourse(course.id)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  {t.editCourse}
                </Button>
                <Button
                  onClick={() => onViewAnalytics(course.id)}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-xl"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
