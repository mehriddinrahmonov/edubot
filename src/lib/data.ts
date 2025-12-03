import { StudentData } from '@/types';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

// Helper to format date as ISO string with specific time
const setTime = (date: Date, hours: number, minutes: number) => {
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate.toISOString();
};

export const mockStudentData: StudentData = {
    name: "Javohirbek",
    classes: [
        {
            id: "c1",
            courseId: "MATH101",
            courseName: "Calculus I",
            startTime: setTime(today, 9, 0),
            endTime: setTime(today, 10, 30),
            location: "Room 301"
        },
        {
            id: "c2",
            courseId: "CS101",
            courseName: "Intro to Computer Science",
            startTime: setTime(today, 11, 0),
            endTime: setTime(today, 12, 30),
            location: "Lab 2"
        },
        {
            id: "c3",
            courseId: "PHYS101",
            courseName: "Physics I",
            startTime: setTime(tomorrow, 10, 0),
            endTime: setTime(tomorrow, 11, 30),
            location: "Hall A"
        },
        {
            id: "c4",
            courseId: "ENG101",
            courseName: "English Literature",
            startTime: setTime(tomorrow, 13, 0),
            endTime: setTime(tomorrow, 14, 30),
            location: "Room 105"
        }
    ],
    grades: [
        {
            id: "g1",
            courseId: "MATH101",
            courseName: "Calculus I",
            assignmentName: "Midterm Exam",
            score: 85,
            maxScore: 100,
            date: "2023-10-15T00:00:00Z"
        },
        {
            id: "g2",
            courseId: "CS101",
            courseName: "Intro to Computer Science",
            assignmentName: "Project 1",
            score: 95,
            maxScore: 100,
            date: "2023-10-20T00:00:00Z"
        },
        {
            id: "g3",
            courseId: "PHYS101",
            courseName: "Physics I",
            assignmentName: "Lab Report 1",
            score: 78,
            maxScore: 100,
            date: "2023-10-10T00:00:00Z"
        },
        {
            id: "g4",
            courseId: "MATH101",
            courseName: "Calculus I",
            assignmentName: "Quiz 1",
            score: 9,
            maxScore: 10,
            date: "2023-09-25T00:00:00Z"
        }
    ]
};
