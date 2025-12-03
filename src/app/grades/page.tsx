import { mockStudentData } from "@/lib/data";
import { GraduationCap, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export default function GradesPage() {
    // Calculate average per course
    const courseGrades = mockStudentData.grades.reduce((acc, grade) => {
        if (!acc[grade.courseName]) {
            acc[grade.courseName] = { total: 0, max: 0, count: 0, grades: [] };
        }
        acc[grade.courseName].total += grade.score;
        acc[grade.courseName].max += grade.maxScore;
        acc[grade.courseName].count += 1;
        acc[grade.courseName].grades.push(grade);
        return acc;
    }, {} as Record<string, { total: number; max: number; count: number; grades: typeof mockStudentData.grades }>);

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Academic Performance</h1>
                <p className="text-gray-500 mt-2">Detailed breakdown of your grades and assignments.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Course Cards */}
                <div className="lg:col-span-2 space-y-6">
                    {Object.entries(courseGrades).map(([courseName, data]) => {
                        const percentage = Math.round((data.total / data.max) * 100);
                        const letterGrade = percentage >= 90 ? 'A' : percentage >= 80 ? 'B' : percentage >= 70 ? 'C' : 'D';

                        return (
                            <div key={courseName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{courseName}</h3>
                                        <p className="text-sm text-gray-500">{data.count} assignments graded</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-gray-900">{percentage}%</div>
                                        <div className={cn(
                                            "text-sm font-medium",
                                            percentage >= 90 ? "text-green-600" : "text-blue-600"
                                        )}>
                                            Grade: {letterGrade}
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {data.grades.map((grade) => (
                                        <div key={grade.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center",
                                                    grade.score / grade.maxScore >= 0.9 ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                                                )}>
                                                    {grade.score / grade.maxScore >= 0.9 ? <CheckCircle2 className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">{grade.assignmentName}</h4>
                                                    <p className="text-xs text-gray-500">{new Date(grade.date).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-gray-900">{grade.score}</span>
                                                <span className="text-gray-400">/{grade.maxScore}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5" />
                            GPA Projection
                        </h3>
                        <div className="text-4xl font-bold mb-1">3.8</div>
                        <p className="text-blue-100 text-sm">You're doing great! Keep it up to maintain your Dean's List status.</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-orange-500" />
                            Areas for Improvement
                        </h3>
                        <div className="space-y-3">
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                                <p className="text-sm font-medium text-orange-800">Physics I Lab Reports</p>
                                <p className="text-xs text-orange-600 mt-1">Your average is 78%. Try to review the lab manual before next session.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
