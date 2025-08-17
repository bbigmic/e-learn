'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  User,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data - w rzeczywistej aplikacji pochodziłoby z API
const mockCourses = [
  {
    id: '1',
    title: 'Podstawy React.js',
    progress: 75,
    lessonsCompleted: 6,
    totalLessons: 8,
    imageUrl: '/api/placeholder/300/200',
    lastAccessed: '2 dni temu'
  },
  {
    id: '2',
    title: 'Zaawansowany JavaScript',
    progress: 45,
    lessonsCompleted: 4,
    totalLessons: 10,
    imageUrl: '/api/placeholder/300/200',
    lastAccessed: '1 tydzień temu'
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    progress: 20,
    lessonsCompleted: 2,
    totalLessons: 12,
    imageUrl: '/api/placeholder/300/200',
    lastAccessed: '3 dni temu'
  }
];

const mockStats = {
  totalCourses: 12,
  completedLessons: 24,
  totalHours: 18,
  certificates: 3
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">EduPlatform</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden md:block">Jan Kowalski</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Witaj z powrotem, Jan!</h1>
          <p className="text-gray-600 mt-2">Kontynuuj swoją podróż edukacyjną</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalCourses}</h3>
            <p className="text-gray-600">Aktywne kursy</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.completedLessons}</h3>
            <p className="text-gray-600">Ukończone lekcje</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-4">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.totalHours}</h3>
            <p className="text-gray-600">Godziny nauki</p>
          </Card>

          <Card className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{mockStats.certificates}</h3>
            <p className="text-gray-600">Certyfikaty</p>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Przegląd
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'courses'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Moje kursy
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'progress'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Postęp
            </button>
          </nav>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Continue Learning */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Kontynuuj naukę</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Postęp</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{course.lessonsCompleted}/{course.totalLessons} lekcji</span>
                      <span>{course.lastAccessed}</span>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Kontynuuj
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommended Courses */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Polecane kursy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                    <h3 className="font-semibold text-gray-900 mb-2">Nowy kurs {i}</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Opis nowego kursu, który może Cię zainteresować
                    </p>
                    <Button variant="outline" className="w-full" size="sm">
                      Zobacz więcej
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Wszystkie moje kursy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Postęp</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{course.lastAccessed}</span>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Otwórz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Szczegółowy postęp</h2>
            <Card>
              <div className="space-y-6">
                {mockCourses.map((course) => (
                  <div key={course.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{course.lessonsCompleted} z {course.totalLessons} lekcji ukończonych</span>
                      <span>Ostatnio: {course.lastAccessed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 