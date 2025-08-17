import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    // Budowanie filtra
    const where: any = {
      published: true
    };

    if (category && category !== 'Wszystkie') {
      where.category = category;
    }

    if (level && level !== 'Wszystkie') {
      where.level = level;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Pobieranie kursów
    const courses = await prisma.course.findMany({
      where,
      include: {
        creator: {
          select: {
            name: true
          }
        },
        lessons: {
          select: {
            id: true
          }
        },
        _count: {
          select: {
            purchases: true
          }
        }
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Liczenie całkowitej liczby kursów
    const total = await prisma.course.count({ where });

    // Formatowanie odpowiedzi
    const formattedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageUrl: course.imageUrl,
      level: course.level || 'Początkujący',
      category: course.category || 'Programowanie',
      instructor: course.creator.name,
      lessons: course.lessons.length,
      students: course._count.purchases,
      rating: 4.5, // Mock rating - w rzeczywistej aplikacji pochodziłoby z bazy
      featured: false, // Mock featured - w rzeczywistej aplikacji pochodziłoby z bazy
      createdAt: course.createdAt
    }));

    return NextResponse.json({
      courses: formattedCourses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Courses fetch error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania kursów' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, category, level } = body;

    // Walidacja danych wejściowych
    if (!title || !description || !price || !category || !level) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }

    // TODO: Sprawdzenie autoryzacji użytkownika
    // const user = await getCurrentUser(request);
    // if (!user || user.role !== 'INSTRUCTOR') {
    //   return NextResponse.json(
    //     { error: 'Brak uprawnień' },
    //     { status: 403 }
    //   );
    // }

    // Tworzenie nowego kursu
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        category,
        level,
        creatorId: 'mock-user-id', // TODO: Zastąpić rzeczywistym ID użytkownika
        published: false
      },
      include: {
        creator: {
          select: {
            name: true
          }
        }
      }
    });

    return NextResponse.json(
      { 
        message: 'Kurs został utworzony pomyślnie',
        course 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Course creation error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas tworzenia kursu' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 