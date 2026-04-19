import { ArrowLeft, Users, Eye, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { CreatorCourse } from './CreatorDashboardScreen';
import { useTranslation, Language } from './translations';

interface CourseAnalyticsScreenProps {
  onBack: () => void;
  course: CreatorCourse;
  language: string;
}

export function CourseAnalyticsScreen({
  onBack,
  course,
  language,
}: CourseAnalyticsScreenProps) {
  const t = useTranslation(language as Language);

  // Mock analytics data
  const completionRate = course.studentsEnrolled > 0 
    ? Math.floor((course.studentsEnrolled * 0.7)) 
    : 0;
  const avgTimeSpent = '45 min';
  const revenuePerStudent = 2.00;
  const growthRate = '+24%';

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
          <h1 className="text-white">{t.courseAnalytics}</h1>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="text-3xl">{course.icon}</div>
          <div>
            <h2 className="text-white">{course.title}</h2>
            <p className="text-white/80">{course.category}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <h3 className="text-card-foreground mb-4">📊 Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-muted-foreground">Students</p>
              </div>
              <p className="text-card-foreground">{course.studentsEnrolled}</p>
              <p className="text-green-600">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                {growthRate}
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-950 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-muted-foreground">Earnings</p>
              </div>
              <p className="text-card-foreground">${course.earnings.toFixed(2)}</p>
              <p className="text-muted-foreground">
                ${revenuePerStudent}/student
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <p className="text-muted-foreground">Total Views</p>
              </div>
              <p className="text-card-foreground">{course.totalViews}</p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-950 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                <p className="text-muted-foreground">Avg. Time</p>
              </div>
              <p className="text-card-foreground">{avgTimeSpent}</p>
            </div>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <h3 className="text-card-foreground mb-4">🎯 Engagement</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="text-card-foreground">{Math.floor((completionRate / course.studentsEnrolled) * 100) || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.floor((completionRate / course.studentsEnrolled) * 100) || 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Students In Progress</span>
                <span className="text-card-foreground">
                  {course.studentsEnrolled - completionRate}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.floor(((course.studentsEnrolled - completionRate) / course.studentsEnrolled) * 100) || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <h3 className="text-card-foreground mb-4">📚 Course Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Lessons</span>
              <span className="text-card-foreground">{course.lessonsCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className={`px-3 py-1 rounded-full text-white ${
                course.status === 'published' ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                {course.status === 'published' ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="text-card-foreground">
                {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Student Activity */}
        <div className="bg-white dark:bg-card rounded-2xl p-5 shadow-md">
          <h3 className="text-card-foreground mb-4">🎓 Recent Student Activity</h3>
          <div className="space-y-3">
            {course.studentsEnrolled > 0 ? (
              <>
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-xl">
                  <div className="text-2xl">👧</div>
                  <div className="flex-1">
                    <p className="text-card-foreground">Sarah L.</p>
                    <p className="text-muted-foreground">Completed lesson 3</p>
                  </div>
                  <span className="text-muted-foreground">2h ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-xl">
                  <div className="text-2xl">👦</div>
                  <div className="flex-1">
                    <p className="text-card-foreground">Alex M.</p>
                    <p className="text-muted-foreground">Enrolled in course</p>
                  </div>
                  <span className="text-muted-foreground">5h ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-xl">
                  <div className="text-2xl">👧</div>
                  <div className="flex-1">
                    <p className="text-card-foreground">Emma K.</p>
                    <p className="text-muted-foreground">Completed course! 🎉</p>
                  </div>
                  <span className="text-muted-foreground">1d ago</span>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No student activity yet</p>
                <p>Share your course to get students!</p>
              </div>
            )}
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-2xl p-5 shadow-md border-2 border-green-200 dark:border-green-800">
          <h3 className="text-card-foreground mb-4">💰 Revenue Breakdown</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Students Enrolled</span>
              <span className="text-card-foreground">{course.studentsEnrolled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue per Student</span>
              <span className="text-card-foreground">${revenuePerStudent.toFixed(2)}</span>
            </div>
            <div className="h-px bg-green-200 dark:bg-green-800 my-2" />
            <div className="flex justify-between">
              <span className="text-card-foreground">Total Earnings</span>
              <span className="text-green-600 dark:text-green-400">
                ${course.earnings.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
