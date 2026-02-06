'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Clock, Award, BookOpen, TrendingUp, Calendar, Target, Trophy, CheckCircle, PlayCircle, GraduationCap, ChevronRight, AlertCircle } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Type Definitions
interface Course {
  id: number;
  name: string;
  instructor: string;
  progress: number;
  duration: string;
  enrolled: string;
  thumbnail: string;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  difficulty: string;
  rating: number;
  students: number;
  lastAccessed: string;
  estimatedCompletion: string;
  assignments: { completed: number; total: number };
  quizzes: { completed: number; total: number };
  watchTime: string;
}

interface CompletedCourse {
  id: number;
  name: string;
  instructor: string;
  completedDate: string;
  score: number;
  duration: string;
  certificateId: string;
  thumbnail: string;
  totalStudents: number;
  finalProject: string;
  skills: string[];
  certificateUrl: string;
}

interface StudyGroup {
  id: number;
  name: string;
  category: string;
  members: number;
  progress: number;
  nextSession: string;
  sessionTopic: string;
  active: boolean;
  meetingLink: string;
  leader: string;
  weeklyHours: number;
  description: string;
  achievements: string[];
  studyStreak: number;
  totalSessions: number;
  attendanceRate: number;
}

interface UpcomingSession {
  id: number;
  group: string;
  time: string;
  topic: string;
}

interface UpcomingCourseSession {
  id: number;
  course: string;
  time: string;
  topic: string;
}

interface StudentData {
  name: string;
  email: string;
  studentId: string;
  avatar: string;
  totalHours: number;
  groupsJoined: number;
  completedCourses: number;
  currentStreak: number;
  joinedDate: string;
  totalPoints: number;
  rank: string;
  averageScore: number;
  weeklyGoal: number;
  weeklyProgress: number;
  myCourses: Course[];
  completedCourses: CompletedCourse[];
  myGroups: StudyGroup[];
  upcomingSessions: UpcomingSession[];
  upcomingCourseSessions: UpcomingCourseSession[];
}

type MainTab = 'courses' | 'study-groups';
type CourseTab = 'enrolled' | 'completed' | 'certificates';
type Timeframe = 'weekly' | 'monthly' | 'yearly';

const StudentDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly');
  const [mainTab, setMainTab] = useState<MainTab>('courses');
  const [courseTab, setcourseTab] = useState<CourseTab>('enrolled');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const studentData: StudentData = {
    name: "Priya Kumar",
    email: "priya.kumar@example.com",
    studentId: "STU2026001",
    avatar: "https://ui-avatars.com/api/?name=Priya+Kumar&background=8b6f47&color=fff&size=128",
    totalHours: 156,
    groupsJoined: 8,
    completedCourses: 12,
    currentStreak: 15,
    joinedDate: "Sep 2024",
    totalPoints: 2450,
    rank: "Gold Member",
    averageScore: 91.25,
    weeklyGoal: 25,
    weeklyProgress: 18,
    myCourses: [
      { 
        id: 1, 
        name: "Advanced Data Structures", 
        instructor: "Dr. Rajesh Sharma", 
        progress: 75, 
        duration: "12 weeks", 
        enrolled: "Jan 2026",
        thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop",
        totalLessons: 48,
        completedLessons: 36,
        nextLesson: "Trees and Graphs",
        difficulty: "Advanced",
        rating: 4.8,
        students: 1245,
        lastAccessed: "2 hours ago",
        estimatedCompletion: "3 weeks",
        assignments: { completed: 8, total: 12 },
        quizzes: { completed: 6, total: 8 },
        watchTime: "32h 45m"
      },
      { 
        id: 2, 
        name: "Machine Learning Fundamentals", 
        instructor: "Prof. Anita Desai", 
        progress: 45, 
        duration: "10 weeks", 
        enrolled: "Dec 2025",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
        totalLessons: 40,
        completedLessons: 18,
        nextLesson: "Neural Networks Basics",
        difficulty: "Intermediate",
        rating: 4.9,
        students: 2156,
        lastAccessed: "1 day ago",
        estimatedCompletion: "5 weeks",
        assignments: { completed: 4, total: 10 },
        quizzes: { completed: 3, total: 8 },
        watchTime: "24h 20m"
      },
      { 
        id: 3, 
        name: "Web Development Bootcamp", 
        instructor: "Arjun Mehta", 
        progress: 90, 
        duration: "8 weeks", 
        enrolled: "Nov 2025",
        thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=225&fit=crop",
        totalLessons: 32,
        completedLessons: 29,
        nextLesson: "Final Project Review",
        difficulty: "Beginner",
        rating: 4.7,
        students: 3421,
        lastAccessed: "5 hours ago",
        estimatedCompletion: "1 week",
        assignments: { completed: 7, total: 8 },
        quizzes: { completed: 7, total: 8 },
        watchTime: "28h 15m"
      },
      { 
        id: 4, 
        name: "Digital Marketing Strategy", 
        instructor: "Sneha Kapoor", 
        progress: 30, 
        duration: "6 weeks", 
        enrolled: "Jan 2026",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
        totalLessons: 24,
        completedLessons: 7,
        nextLesson: "SEO Fundamentals",
        difficulty: "Beginner",
        rating: 4.6,
        students: 1876,
        lastAccessed: "3 days ago",
        estimatedCompletion: "4 weeks",
        assignments: { completed: 2, total: 6 },
        quizzes: { completed: 1, total: 6 },
        watchTime: "8h 30m"
      },
    ],
    completedCourses: [
      { 
        id: 1, 
        name: "Python Fundamentals", 
        instructor: "Dr. Vikram Singh", 
        completedDate: "Dec 15, 2024", 
        score: 95, 
        duration: "8 weeks",
        certificateId: "CERT-PY-2024-001",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=225&fit=crop",
        totalStudents: 2341,
        finalProject: "E-commerce Backend API",
        skills: ["Python", "Flask", "SQLAlchemy", "REST APIs"],
        certificateUrl: "/certificates/CERT-PY-2024-001"
      },
      { 
        id: 2, 
        name: "React.js Masterclass", 
        instructor: "Prateek Narang", 
        completedDate: "Nov 22, 2024", 
        score: 88, 
        duration: "10 weeks",
        certificateId: "CERT-RCT-2024-002",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop",
        totalStudents: 3125,
        finalProject: "Social Media Dashboard",
        skills: ["React", "Redux", "TypeScript", "Material-UI"],
        certificateUrl: "/certificates/CERT-RCT-2024-002"
      },
      { 
        id: 3, 
        name: "Data Science Basics", 
        instructor: "Dr. Maya Patel", 
        completedDate: "Oct 10, 2024", 
        score: 92, 
        duration: "12 weeks",
        certificateId: "CERT-DS-2024-003",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
        totalStudents: 1876,
        finalProject: "Sales Prediction Model",
        skills: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
        certificateUrl: "/certificates/CERT-DS-2024-003"
      },
      { 
        id: 4, 
        name: "Database Management", 
        instructor: "Rahul Verma", 
        completedDate: "Sep 5, 2024", 
        score: 90, 
        duration: "6 weeks",
        certificateId: "CERT-DB-2024-004",
        thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=225&fit=crop",
        totalStudents: 1543,
        finalProject: "University Management System",
        skills: ["SQL", "PostgreSQL", "MongoDB", "Database Design"],
        certificateUrl: "/certificates/CERT-DB-2024-004"
      },
    ],
    myGroups: [
      { 
        id: 1, 
        name: "Data Structures Marathon", 
        category: "Computer Science", 
        members: 45, 
        progress: 75, 
        nextSession: "Today, 6:00 PM",
        sessionTopic: "Binary Search Trees",
        active: true,
        meetingLink: "https://meet.example.com/ds-marathon",
        leader: "Amit Sharma",
        weeklyHours: 12,
        description: "Intensive group focusing on mastering data structures",
        achievements: ["Top Performer", "100 Hour Club"],
        studyStreak: 21,
        totalSessions: 45,
        attendanceRate: 95
      },
      { 
        id: 2, 
        name: "NEET Biology Focus", 
        category: "Medical", 
        members: 32, 
        progress: 60, 
        nextSession: "Tomorrow, 4:00 PM",
        sessionTopic: "Human Physiology",
        active: true,
        meetingLink: "https://meet.example.com/neet-bio",
        leader: "Dr. Kavita Reddy",
        weeklyHours: 15,
        description: "Comprehensive NEET biology preparation",
        achievements: ["Perfect Attendance"],
        studyStreak: 15,
        totalSessions: 32,
        attendanceRate: 100
      },
      { 
        id: 3, 
        name: "JEE Advanced Math", 
        category: "Engineering", 
        members: 28, 
        progress: 85, 
        nextSession: "Today, 8:00 PM",
        sessionTopic: "Calculus Applications",
        active: true,
        meetingLink: "https://meet.example.com/jee-math",
        leader: "Prof. Suresh Kumar",
        weeklyHours: 18,
        description: "Advanced mathematics for JEE",
        achievements: ["Math Champion", "Top Performer"],
        studyStreak: 28,
        totalSessions: 52,
        attendanceRate: 92
      },
    ],
    upcomingSessions: [
      { id: 1, group: "Data Structures Marathon", time: "Today, 6:00 PM", topic: "Binary Search Trees" },
      { id: 2, group: "JEE Advanced Math", time: "Today, 8:00 PM", topic: "Calculus Applications" },
      { id: 3, group: "NEET Biology Focus", time: "Tomorrow, 4:00 PM", topic: "Human Physiology" },
    ],
    upcomingCourseSessions: [
      { id: 1, course: "Advanced Data Structures", time: "Today, 3:00 PM", topic: "Trees and Graphs - Live Session" },
      { id: 2, course: "Machine Learning Fundamentals", time: "Tomorrow, 5:00 PM", topic: "Neural Networks Workshop" },
      { id: 3, course: "Web Development Bootcamp", time: "Wednesday, 2:00 PM", topic: "Final Project Review" },
    ]
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#f5f1ea] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#d4a574] border-t-[#4a3728] rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-[#8b6f47] text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#f5f1ea] p-3 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Compact */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={studentData.avatar} 
              alt={studentData.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h1 className="text-xl font-bold text-[#4a3728]">{studentData.name}</h1>
              <div className="flex items-center gap-2 text-xs text-[#8b6f47]">
                <span>{studentData.studentId}</span>
                <span>•</span>
                <span>{studentData.rank}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation - Compact inline */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMainTab('courses')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mainTab === 'courses'
                ? 'bg-gradient-to-r from-[#4a3728] to-[#8b6f47] text-white shadow-sm'
                : 'bg-white text-[#8b6f47] border border-[#d4a574]/30 hover:bg-[#faf8f5]'
            }`}
          >
            Courses
          </button>
          <button
            onClick={() => setMainTab('study-groups')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              mainTab === 'study-groups'
                ? 'bg-gradient-to-r from-[#4a3728] to-[#8b6f47] text-white shadow-sm'
                : 'bg-white text-[#8b6f47] border border-[#d4a574]/30 hover:bg-[#faf8f5]'
            }`}
          >
            Study Groups
          </button>
        </div>

        {/* COURSES SECTION */}
        {mainTab === 'courses' && (
          <>
            {/* Stats - 3 Divs Side by Side - Narrower */}
            <div className="grid grid-cols-3 gap-3 mb-4 max-w-3xl">
              <div className="bg-white rounded-lg p-3 border border-[#d4a574]/30">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="w-4 h-4 text-[#8b6f47]" />
                  <span className="text-xs text-[#8b6f47]">Enrolled</span>
                </div>
                <p className="text-2xl font-bold text-[#4a3728]">{studentData.myCourses.length}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-[#d4a574]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-[#8b6f47]" />
                  <span className="text-xs text-[#8b6f47]">Completed</span>
                </div>
                <p className="text-2xl font-bold text-[#4a3728]">{studentData.completedCourses.length}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-[#d4a574]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-[#8b6f47]" />
                  <span className="text-xs text-[#8b6f47]">Avg Score</span>
                </div>
                <p className="text-2xl font-bold text-[#4a3728]">{studentData.averageScore}%</p>
              </div>
            </div>

            {/* Course Sub-tabs - Compact inline */}
            <div className="flex gap-2 mb-4">
              {(['enrolled', 'completed', 'certificates'] as CourseTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setcourseTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    courseTab === tab
                      ? 'bg-gradient-to-r from-[#4a3728] to-[#8b6f47] text-white shadow-sm'
                      : 'bg-white text-[#8b6f47] border border-[#d4a574]/30 hover:bg-[#faf8f5]'
                  }`}
                >
                  {tab === 'enrolled' && 'Enrolled'}
                  {tab === 'completed' && 'Completed'}
                  {tab === 'certificates' && 'Certificates'}
                </button>
              ))}
            </div>

            {/* Upcoming Sessions in Courses */}
            {courseTab === 'enrolled' && studentData.upcomingCourseSessions && studentData.upcomingCourseSessions.length > 0 && (
              <div className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] text-white rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Upcoming Sessions</h3>
                    <div className="space-y-0.5">
                      {studentData.upcomingCourseSessions.slice(0, 2).map(session => (
                        <p key={session.id} className="text-xs text-white/90">
                          {session.course} - {session.time} ({session.topic})
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enrolled Courses - 3 Columns */}
            {courseTab === 'enrolled' && (
              <div className="bg-white rounded-lg p-4 border border-[#d4a574]/30">
                <h2 className="text-lg font-bold text-[#4a3728] mb-3">Enrolled Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {studentData.myCourses.map((course) => (
                    <div key={course.id} className="border border-[#d4a574]/30 rounded-lg overflow-hidden hover:border-[#8b6f47] transition-colors">
                      <div className="relative h-24 bg-gray-200">
                        <img 
                          src={course.thumbnail} 
                          alt={course.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded text-xs font-semibold text-[#4a3728]">
                          {course.progress}%
                        </div>
                      </div>

                      <div className="p-3">
                        <h3 className="font-semibold text-[#4a3728] text-sm mb-1">{course.name}</h3>
                        <p className="text-xs text-[#8b6f47] mb-2">{course.instructor}</p>

                        <div className="grid grid-cols-3 gap-1.5 mb-2">
                          <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                            <p className="text-xs text-[#8b6f47]">Rating</p>
                            <p className="text-xs font-semibold text-[#4a3728]">{course.rating}</p>
                          </div>
                          <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                            <p className="text-xs text-[#8b6f47]">Students</p>
                            <p className="text-xs font-semibold text-[#4a3728]">{course.students}</p>
                          </div>
                          <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                            <p className="text-xs text-[#8b6f47]">Level</p>
                            <p className="text-xs font-semibold text-[#4a3728]">{course.difficulty}</p>
                          </div>
                        </div>

                        <div className="bg-[#faf8f5] rounded p-2 mb-2">
                          <p className="text-xs text-[#8b6f47] mb-0.5">Next Lesson</p>
                          <p className="text-xs font-medium text-[#4a3728]">{course.nextLesson}</p>
                        </div>
                        
                        <div className="mb-2">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-[#8b6f47]">Progress</span>
                            <span className="text-xs font-semibold text-[#4a3728]">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-[#f5f1ea] rounded-full h-1.5">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-[#4a3728] to-[#8b6f47] transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-[#4a3728] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#d4a574] text-white font-medium py-2 rounded text-sm transition-colors">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Courses - Compact */}
            {courseTab === 'completed' && (
              <div className="bg-white rounded-lg p-4 border border-[#d4a574]/30">
                <h2 className="text-lg font-bold text-[#4a3728] mb-3">Completed Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {studentData.completedCourses.map((course) => (
                    <div key={course.id} className="border border-[#d4a574]/30 rounded-lg overflow-hidden hover:border-[#8b6f47] transition-colors">
                      <div className="relative h-24 bg-gradient-to-br from-[#8b6f47] to-[#d4a574]">
                        <img 
                          src={course.thumbnail} 
                          alt={course.name}
                          className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GraduationCap className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded text-xs font-bold text-[#4a3728]">
                          {course.score}%
                        </div>
                      </div>

                      <div className="p-3">
                        <h3 className="font-semibold text-[#4a3728] text-sm mb-1">{course.name}</h3>
                        <p className="text-xs text-[#8b6f47] mb-2">{course.instructor}</p>
                        
                        <div className="space-y-1 mb-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#8b6f47]">Completed:</span>
                            <span className="text-[#4a3728] font-medium">{course.completedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#8b6f47]">Score:</span>
                            <span className="text-[#4a3728] font-bold">{course.score}%</span>
                          </div>
                        </div>

                        <div className="bg-[#faf8f5] rounded p-2 mb-2">
                          <p className="text-xs text-[#8b6f47] mb-0.5">Final Project</p>
                          <p className="text-xs font-semibold text-[#4a3728]">{course.finalProject}</p>
                        </div>

                        <a 
                          href="/certificates"
                          className="block w-full bg-white border border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white font-medium py-2 rounded text-sm transition-colors text-center"
                        >
                          View Certificate
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Tab */}
            {courseTab === 'certificates' && (
              <div className="bg-white rounded-lg p-4 border border-[#d4a574]/30">
                <h2 className="text-lg font-bold text-[#4a3728] mb-3">My Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {studentData.completedCourses.map((course) => (
                    <div key={course.id} className="border-2 border-[#d4a574]/30 rounded-lg overflow-hidden hover:border-[#8b6f47] transition-all hover:shadow-lg bg-gradient-to-br from-white to-[#faf8f5]">
                      {/* Certificate Header */}
                      <div className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] p-4 text-center">
                        <Award className="w-12 h-12 text-white mx-auto mb-2" />
                        <h3 className="text-white font-bold text-sm mb-1">Certificate of Completion</h3>
                        <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 inline-block">
                          <p className="text-white text-xs font-semibold">{course.certificateId}</p>
                        </div>
                      </div>

                      {/* Certificate Body */}
                      <div className="p-4">
                        <h4 className="font-bold text-[#4a3728] text-base mb-1 text-center">{course.name}</h4>
                        <p className="text-xs text-[#8b6f47] text-center mb-3">{course.instructor}</p>
                        
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Trophy className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-bold text-[#4a3728]">Score: {course.score}%</span>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-[#8b6f47] mb-1">Completed on</p>
                            <p className="text-xs font-semibold text-[#4a3728]">{course.completedDate}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs text-[#8b6f47] font-medium mb-1.5 text-center">Skills Acquired</p>
                          <div className="flex flex-wrap gap-1 justify-center">
                            {course.skills.map((skill, idx) => (
                              <span key={idx} className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] text-white px-2 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <a 
                            href="/certificates"
                            className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#d4a574] text-white font-medium py-2 rounded text-xs transition-colors text-center flex items-center justify-center gap-1"
                          >
                            <Award className="w-3 h-3" />
                            View
                          </a>
                          <button className="bg-white border border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47] hover:text-white font-medium py-2 rounded text-xs transition-colors flex items-center justify-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* STUDY GROUPS SECTION */}
        {mainTab === 'study-groups' && (
          <>
            {/* Study Groups Stats - 3 Divs Side by Side - Narrower */}
            <div className="grid grid-cols-3 gap-3 mb-4 max-w-3xl">
              <div className="bg-white rounded-lg p-3 border border-[#d4a574]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-[#8b6f47]" />
                  <span className="text-xs text-[#8b6f47]">Groups</span>
                </div>
                <p className="text-2xl font-bold text-[#4a3728]">{studentData.groupsJoined}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-[#d4a574]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-[#8b6f47]" />
                  <span className="text-xs text-[#8b6f47]">Active</span>
                </div>
                <p className="text-2xl font-bold text-[#4a3728]">{studentData.myGroups.filter(g => g.active).length}</p>
              </div>

              <div className="bg-white rounded-lg p-3 border border-[#d4a574]/30">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-[#8b6f47]" />
                  <span className="text-xs text-[#8b6f47]">Weekly</span>
                </div>
                <p className="text-2xl font-bold text-[#4a3728]">{studentData.myGroups.reduce((sum, g) => sum + g.weeklyHours, 0)}h</p>
              </div>
            </div>

            {/* Upcoming To-Dos */}
            {studentData.upcomingSessions.length > 0 && (
              <div className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] text-white rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">Upcoming To-Dos</h3>
                    <div className="space-y-0.5">
                      {studentData.upcomingSessions.slice(0, 2).map(session => (
                        <p key={session.id} className="text-xs text-white/90">
                          {session.group} - {session.time}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Study Groups - 3 Columns */}
            <div className="bg-white rounded-lg p-4 border border-[#d4a574]/30">
              <h2 className="text-lg font-bold text-[#4a3728] mb-3">My Study Groups</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {studentData.myGroups.map((group) => (
                  <div key={group.id} className="border border-[#d4a574]/30 rounded-lg overflow-hidden hover:border-[#8b6f47] transition-colors">
                    <div className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] p-3">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-sm mb-1">{group.name}</h3>
                          <span className="inline-block bg-white/20 text-white px-2 py-0.5 rounded text-xs">
                            {group.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs bg-white/20 text-white rounded px-2 py-1">
                          <Users className="w-3 h-3" />
                          <span className="font-semibold">{group.members}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3">
                      <div className="bg-[#faf8f5] rounded p-2 mb-2">
                        <p className="text-xs text-[#8b6f47] mb-0.5">Next Session</p>
                        <p className="text-xs font-semibold text-[#4a3728]">{group.nextSession}</p>
                        <p className="text-xs text-[#8b6f47] mt-0.5">{group.sessionTopic}</p>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-[#8b6f47]">Progress</span>
                          <span className="text-xs font-semibold text-[#4a3728]">{group.progress}%</span>
                        </div>
                        <div className="w-full bg-[#f5f1ea] rounded-full h-1.5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#4a3728] to-[#8b6f47] transition-all duration-500"
                            style={{ width: `${group.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5 mb-2">
                        <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                          <p className="text-xs text-[#8b6f47]">Weekly</p>
                          <p className="text-xs font-bold text-[#4a3728]">{group.weeklyHours}h</p>
                        </div>
                        <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                          <p className="text-xs text-[#8b6f47]">Sessions</p>
                          <p className="text-xs font-bold text-[#4a3728]">{group.totalSessions}</p>
                        </div>
                        <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                          <p className="text-xs text-[#8b6f47]">Attend</p>
                          <p className="text-xs font-bold text-[#4a3728]">{group.attendanceRate}%</p>
                        </div>
                        <div className="bg-[#faf8f5] rounded p-1.5 text-center">
                          <p className="text-xs text-[#8b6f47]">Streak</p>
                          <p className="text-xs font-bold text-[#4a3728]">{group.studyStreak}d</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <Link
                          href={`/study/my-groups/${group.id}`}
                          className="bg-gradient-to-r from-[#4a3728] to-[#8b6f47] hover:from-[#8b6f47] hover:to-[#d4a574] text-white font-medium py-1.5 rounded text-xs transition-colors text-center"
                        >
                          View Group
                        </Link>

                      
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;