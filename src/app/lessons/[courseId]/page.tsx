'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Lock,
  ChevronRight,
  ChevronDown,
  Video,
  FileText,
  Download
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

// Mock data - w rzeczywistej aplikacji pochodziłoby z API
const mockCourse = {
  id: '1',
  title: 'Podstawy React.js',
  description: 'Naucz się podstaw React.js i stwórz swoje pierwsze aplikacje webowe',
  instructor: 'Jan Kowalski',
  totalLessons: 24,
  totalDuration: '12 godzin',
  progress: 75,
  lessons: [
    {
      id: '1',
      title: 'Wprowadzenie do React.js',
      description: 'Poznaj podstawowe koncepcje i historię React.js',
      duration: '15 min',
      type: 'video',
      completed: true,
      locked: false,
      resources: ['Slajdy', 'Kod źródłowy', 'Ćwiczenia']
    },
    {
      id: '2',
      title: 'Konfiguracja środowiska',
      description: 'Przygotuj swoje środowisko deweloperskie',
      duration: '20 min',
      type: 'video',
      completed: true,
      locked: false,
      resources: ['Instrukcja instalacji', 'Pliki konfiguracyjne']
    },
    {
      id: '3',
      title: 'Pierwszy komponent',
      description: 'Stwórz swój pierwszy komponent React',
      duration: '25 min',
      type: 'video',
      completed: false,
      locked: false,
      resources: ['Kod źródłowy', 'Ćwiczenia praktyczne']
    },
    {
      id: '4',
      title: 'Props i state',
      description: 'Poznaj podstawy zarządzania danymi w React',
      duration: '30 min',
      type: 'video',
      completed: false,
      locked: true,
      resources: ['Dokumentacja', 'Przykłady']
    },
    {
      id: '5',
      title: 'Event handling',
      description: 'Obsługa zdarzeń w komponentach React',
      duration: '25 min',
      type: 'video',
      completed: false,
      locked: true,
      resources: ['Przykłady', 'Ćwiczenia']
    },
    {
      id: '6',
      title: 'Listy i klucze',
      description: 'Renderowanie list i optymalizacja z kluczami',
      duration: '20 min',
      type: 'video',
      completed: false,
      locked: true,
      resources: ['Kod źródłowy', 'Dokumentacja']
    },
    {
      id: '7',
      title: 'Formularze w React',
      description: 'Tworzenie i obsługa formularzy',
      duration: '35 min',
      type: 'video',
      completed: false,
      locked: true,
      resources: ['Przykłady', 'Ćwiczenia praktyczne']
    },
    {
      id: '8',
      title: 'Quiz - Podstawy React',
      description: 'Sprawdź swoją wiedzę z pierwszych lekcji',
      duration: '15 min',
      type: 'quiz',
      completed: false,
      locked: true,
      resources: ['Instrukcje', 'Wyniki']
    }
  ]
};

export default function CourseLessonsPage() {
  const [expandedLesson, setExpandedLesson] = useState<string | null>('1');
  const [currentLesson, setCurrentLesson] = useState('3');

  const toggleLesson = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'quiz':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getLessonStatus = (lesson: {
    completed: boolean;
    locked: boolean;
  }) => {
    if (lesson.completed) {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (lesson.locked) {
      return <Lock className="h-5 w-5 text-gray-400" />;
    } else {
      return <Play className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockCourse.title}</h1>
              <p className="text-gray-600 mt-1">Instruktor: {mockCourse.instructor}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Postęp: {mockCourse.progress}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${mockCourse.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Lekcje kursu</h2>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {mockCourse.totalLessons} lekcji • {mockCourse.totalDuration}
                </div>
              </div>

              <div className="space-y-2">
                {mockCourse.lessons.map((lesson) => (
                  <div key={lesson.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleLesson(lesson.id)}
                      className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                        lesson.id === currentLesson ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getLessonStatus(lesson)}
                          <div className="flex-1 min-w-0">
                            <h3 className={`text-sm font-medium ${
                              lesson.completed ? 'text-green-700' : 
                              lesson.locked ? 'text-gray-500' : 'text-gray-900'
                            }`}>
                              {lesson.title}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              {getLessonIcon(lesson.type)}
                              <span className="ml-1">{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                        {expandedLesson === lesson.id ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {expandedLesson === lesson.id && (
                      <div className="px-3 pb-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mt-2 mb-3">
                          {lesson.description}
                        </p>
                        
                        {lesson.resources && lesson.resources.length > 0 && (
                          <div className="mb-3">
                            <h4 className="text-xs font-medium text-gray-700 mb-2">Zasoby:</h4>
                            <div className="space-y-1">
                              {lesson.resources.map((resource, index) => (
                                <div key={index} className="flex items-center text-xs text-gray-600">
                                  <Download className="h-3 w-3 mr-1" />
                                  {resource}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {!lesson.locked && (
                          <Button 
                            size="sm" 
                            className="w-full"
                            variant={lesson.completed ? 'secondary' : 'primary'}
                            onClick={() => setCurrentLesson(lesson.id)}
                          >
                            {lesson.completed ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Ukończone
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-2" />
                                {lesson.id === currentLesson ? 'Oglądaj' : 'Rozpocznij'}
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            <Card>
              {currentLesson && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {mockCourse.lessons.find(l => l.id === currentLesson)?.title}
                    </h2>
                    <p className="text-gray-600">
                      {mockCourse.lessons.find(l => l.id === currentLesson)?.description}
                    </p>
                  </div>

                  {/* Video Player Placeholder */}
                  <div className="aspect-video bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Odtwarzacz wideo</p>
                      <p className="text-sm text-gray-500">W rzeczywistej aplikacji tutaj byłby odtwarzacz</p>
                    </div>
                  </div>

                  {/* Lesson Navigation */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <Button 
                      variant="outline"
                      disabled={currentLesson === '1'}
                      onClick={() => {
                        const currentIndex = mockCourse.lessons.findIndex(l => l.id === currentLesson);
                        if (currentIndex > 0) {
                          setCurrentLesson(mockCourse.lessons[currentIndex - 1].id);
                        }
                      }}
                    >
                      Poprzednia lekcja
                    </Button>

                    <div className="text-sm text-gray-600">
                      Lekcja {currentLesson} z {mockCourse.totalLessons}
                    </div>

                    <Button 
                      disabled={currentLesson === mockCourse.totalLessons.toString()}
                      onClick={() => {
                        const currentIndex = mockCourse.lessons.findIndex(l => l.id === currentLesson);
                        if (currentIndex < mockCourse.lessons.length - 1) {
                          setCurrentLesson(mockCourse.lessons[currentIndex + 1].id);
                        }
                      }}
                    >
                      Następna lekcja
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Course Progress */}
            <Card className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Twój postęp</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Ogólny postęp</span>
                    <span>{mockCourse.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${mockCourse.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {mockCourse.lessons.filter(l => l.completed).length}
                    </div>
                    <div className="text-sm text-gray-600">Ukończone</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-600">
                      {mockCourse.lessons.filter(l => !l.completed && !l.locked).length}
                    </div>
                    <div className="text-sm text-gray-600">Dostępne</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-400">
                      {mockCourse.lessons.filter(l => l.locked).length}
                    </div>
                    <div className="text-sm text-gray-600">Zablokowane</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 