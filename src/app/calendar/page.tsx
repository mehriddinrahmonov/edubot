import { mockStudentData } from "@/lib/data";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export default function CalendarPage() {
    // Group classes by date (simple implementation for demo)
    const classesByDate = mockStudentData.classes.reduce((acc, cls) => {
        const date = new Date(cls.startTime).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(cls);
        return acc;
    }, {} as Record<string, typeof mockStudentData.classes>);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Class Schedule</h1>
                    <p className="text-gray-500 mt-2">Your upcoming classes and events.</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    Sync Calendar
                </button>
            </header>

            <div className="space-y-8">
                {Object.entries(classesByDate).map(([date, classes]) => (
                    <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">
                                {new Date(classes[0].startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {classes.map((cls) => (
                                <div key={cls.id} className="p-6 hover:bg-blue-50 transition-colors group">
                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                        <div className="w-32 flex-shrink-0">
                                            <div className="flex items-center gap-2 text-blue-600 font-semibold">
                                                <Clock className="w-4 h-4" />
                                                {new Date(cls.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div className="text-sm text-gray-400 mt-1">
                                                to {new Date(cls.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                {cls.courseName}
                                            </h4>
                                            <div className="flex items-center gap-2 text-gray-500 mt-1">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-medium text-gray-600">
                                                    {cls.courseId}
                                                </span>
                                                <span className="flex items-center gap-1 text-sm">
                                                    <MapPin className="w-3 h-3" />
                                                    {cls.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-shrink-0">
                                            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
