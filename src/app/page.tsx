import { mockStudentData } from "@/lib/data";
import { Calendar, BookOpen, TrendingUp, Clock } from "lucide-react";

export default function Home() {
  const nextClass = mockStudentData.classes.find(c => new Date(c.startTime) > new Date());

  // Calculate GPA (simple average for demo)
  const totalScore = mockStudentData.grades.reduce((acc, curr) => acc + (curr.score / curr.maxScore) * 100, 0);
  const averageGrade = Math.round(totalScore / mockStudentData.grades.length);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {mockStudentData.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 mt-2">Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Next Class Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Next Class</h3>
              <p className="text-sm text-gray-500">Upcoming</p>
            </div>
          </div>
          {nextClass ? (
            <div>
              <h4 className="text-lg font-bold text-gray-900">{nextClass.courseName}</h4>
              <p className="text-gray-600">{new Date(nextClass.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="text-sm text-gray-500 mt-1">{nextClass.location}</p>
            </div>
          ) : (
            <p className="text-gray-500">No more classes today!</p>
          )}
        </div>

        {/* Average Grade Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Average Grade</h3>
              <p className="text-sm text-gray-500">Current Term</p>
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-gray-900">{averageGrade}%</h4>
            <p className="text-sm text-green-600 mt-1">+2.5% from last month</p>
          </div>
        </div>

        {/* Total Classes Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Active Courses</h3>
              <p className="text-sm text-gray-500">Enrolled</p>
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-gray-900">{new Set(mockStudentData.classes.map(c => c.courseId)).size}</h4>
            <p className="text-sm text-gray-500 mt-1">Courses this semester</p>
          </div>
        </div>
      </div>

      {/* Recent Activity / Schedule Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Today's Schedule</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockStudentData.classes.slice(0, 3).map((cls) => (
              <div key={cls.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="w-16 text-center">
                  <p className="font-bold text-gray-900">{new Date(cls.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-xs text-gray-500">{new Date(cls.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex-1 border-l-2 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">{cls.courseName}</h4>
                  <p className="text-sm text-gray-500">{cls.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Recent Grades</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {mockStudentData.grades.slice(0, 3).map((grade) => (
              <div key={grade.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div>
                  <h4 className="font-semibold text-gray-900">{grade.assignmentName}</h4>
                  <p className="text-sm text-gray-500">{grade.courseName}</p>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-sm font-medium",
                    grade.score >= 90 ? "bg-green-100 text-green-700" :
                      grade.score >= 80 ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                  )}>
                    {grade.score}/{grade.maxScore}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{new Date(grade.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility for conditional classes (since I can't import the component's internal one easily)
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}
