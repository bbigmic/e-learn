'use client';

import { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Star, 
  Users, 
  Search,
  Grid,
  List
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

// Mock data - w rzeczywistej aplikacji pochodziłoby z API
const mockCourses = [
  {
    id: '1',
    title: 'Podstawy React.js',
    description: 'Naucz się podstaw React.js i stwórz swoje pierwsze aplikacje webowe',
    price: 199.99,
    originalPrice: 299.99,
    rating: 4.8,
    students: 1247,
    duration: '12 godzin',
    lessons: 24,
    level: 'Początkujący',
    category: 'Programowanie',
    imageUrl: '/api/placeholder/300/200',
    instructor: 'Jan Kowalski',
    featured: true
  },
  {
    id: '2',
    title: 'Zaawansowany JavaScript',
    description: 'Poznaj zaawansowane techniki JavaScript i ES6+',
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.9,
    students: 892,
    duration: '18 godzin',
    lessons: 32,
    level: 'Średniozaawansowany',
    category: 'Programowanie',
    imageUrl: '/api/placeholder/300/200',
    instructor: 'Anna Nowak',
    featured: false
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Stwórz profesjonalne API i aplikacje backendowe z Node.js',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.7,
    students: 567,
    duration: '20 godzin',
    lessons: 28,
    level: 'Zaawansowany',
    category: 'Programowanie',
    imageUrl: '/api/placeholder/300/200',
    instructor: 'Piotr Wiśniewski',
    featured: true
  },
  {
    id: '4',
    title: 'UX/UI Design Fundamentals',
    description: 'Poznaj podstawy projektowania interfejsów użytkownika',
    price: 179.99,
    originalPrice: 249.99,
    rating: 4.6,
    students: 743,
    duration: '15 godzin',
    lessons: 22,
    level: 'Początkujący',
    category: 'Design',
    imageUrl: '/api/placeholder/300/200',
    instructor: 'Maria Kowalczyk',
    featured: false
  },
  {
    id: '5',
    title: 'Digital Marketing Strategy',
    description: 'Strategie marketingowe w świecie cyfrowym',
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.5,
    students: 456,
    duration: '10 godzin',
    lessons: 18,
    level: 'Początkujący',
    category: 'Marketing',
    imageUrl: '/api/placeholder/300/200',
    instructor: 'Tomasz Lewandowski',
    featured: false
  },
  {
    id: '6',
    title: 'Data Science Basics',
    description: 'Wprowadzenie do nauki o danych i analizy',
    price: 329.99,
    originalPrice: 449.99,
    rating: 4.8,
    students: 678,
    duration: '25 godzin',
    lessons: 35,
    level: 'Średniozaawansowany',
    category: 'Data Science',
    imageUrl: '/api/placeholder/300/200',
    instructor: 'Katarzyna Zielińska',
    featured: true
  }
];

const categories = ['Wszystkie', 'Programowanie', 'Design', 'Marketing', 'Data Science', 'Biznes'];
const levels = ['Wszystkie', 'Początkujący', 'Średniozaawansowany', 'Zaawansowany'];

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [selectedLevel, setSelectedLevel] = useState('Wszystkie');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const filteredCourses = mockCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Wszystkie' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'Wszystkie' || course.level === selectedLevel;
    const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Odkryj kursy dla siebie
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wybierz spośród setek kursów online i rozwijaj swoje umiejętności w swoim tempie
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Szukaj kursów..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zakres cenowy: {priceRange[0]} - {priceRange[1]} zł
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600">
            Znaleziono {filteredCourses.length} kursów
          </p>
        </div>

        {/* Courses Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 group-hover:opacity-90 transition-opacity"></div>
                  {course.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                      Polecany
                    </div>
                  )}
                  {course.originalPrice > course.price && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                    <span className="text-sm text-gray-500">{course.level}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.lessons} lekcji
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({course.students})</span>
                    </div>
                    <span className="text-sm text-gray-500">Instruktor: {course.instructor}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {course.originalPrice > course.price ? (
                      <>
                        <span className="text-2xl font-bold text-gray-900">{course.price} zł</span>
                        <span className="text-lg text-gray-500 line-through">{course.originalPrice} zł</span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">{course.price} zł</span>
                    )}
                  </div>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Zobacz
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="flex space-x-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-48 h-32 bg-gray-200 rounded-lg group-hover:opacity-90 transition-opacity"></div>
                    {course.featured && (
                      <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                        Polecany
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">{course.category}</span>
                      <span className="text-sm text-gray-500">{course.level}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {course.description}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.lessons} lekcji
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students} studentów
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {course.rating}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Instruktor: {course.instructor}</span>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          {course.originalPrice > course.price ? (
                            <div>
                              <span className="text-2xl font-bold text-gray-900">{course.price} zł</span>
                              <span className="text-lg text-gray-500 line-through ml-2">{course.originalPrice} zł</span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-gray-900">{course.price} zł</span>
                          )}
                        </div>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Zobacz kurs
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Załaduj więcej kursów
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nie znaleziono kursów</h3>
            <p className="text-gray-600 mb-4">
              Spróbuj zmienić filtry lub wyszukiwanie
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Wszystkie');
              setSelectedLevel('Wszystkie');
              setPriceRange([0, 500]);
            }}>
              Wyczyść filtry
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 