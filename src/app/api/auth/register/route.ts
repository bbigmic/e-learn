import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();

    // Walidacja danych wejściowych
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Hasło musi mieć co najmniej 6 znaków' },
        { status: 400 }
      );
    }

    // Sprawdzenie czy użytkownik już istnieje
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Użytkownik z tym adresem email już istnieje' },
        { status: 409 }
      );
    }

    // Hashowanie hasła
    const hashedPassword = await bcrypt.hash(password, 12);

    // Tworzenie nowego użytkownika
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'STUDENT'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json(
      { 
        message: 'Użytkownik został utworzony pomyślnie',
        user 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas rejestracji' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 