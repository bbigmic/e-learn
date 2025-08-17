# EduPlatform - Platforma E-learningowa

Profesjonalna platforma e-learningowa zbudowana w Next.js 14, oferująca funkcjonalności zarządzania kursami, lekcjami i użytkownikami.

## 🚀 Funkcje

- **Autoryzacja użytkowników** - rejestracja, logowanie, zarządzanie sesjami
- **Zarządzanie kursami** - tworzenie, edycja, publikowanie kursów
- **System lekcji** - organizacja materiałów edukacyjnych
- **Śledzenie postępów** - monitorowanie ukończonych lekcji
- **Responsywny design** - nowoczesny interfejs na wszystkich urządzeniach
- **Baza danych SQLite** - z Prismą ORM
- **API Routes** - RESTful API dla wszystkich funkcji

## 🛠️ Technologie

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Baza danych**: SQLite z Prismą ORM
- **Autoryzacja**: JWT tokens, bcryptjs
- **Ikony**: Lucide React
- **Formularze**: React Hook Form
- **Walidacja**: Zod

## 📋 Wymagania

- Node.js 18+ 
- npm lub yarn

## 🚀 Instalacja i uruchomienie

1. **Klonowanie repozytorium**
   ```bash
   git clone <repository-url>
   cd e-learning-platform
   ```

2. **Instalacja zależności**
   ```bash
   npm install
   ```

3. **Konfiguracja środowiska**
   ```bash
   cp .env.example .env
   ```
   
   Edytuj plik `.env` i ustaw:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Inicjalizacja bazy danych**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Uruchomienie aplikacji**
   ```bash
   npm run dev
   ```

6. **Otwórz przeglądarkę**
   ```
   http://localhost:3000
   ```

## 📁 Struktura projektu

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (auth)/            # Grupa routów dla autoryzacji
│   │   ├── login/         # Strona logowania
│   │   └── register/      # Strona rejestracji
│   ├── (dashboard)/       # Grupa routów dla dashboardu
│   │   └── dashboard/     # Główny dashboard użytkownika
│   ├── api/               # API Routes
│   │   ├── auth/          # Endpointy autoryzacji
│   │   └── courses/       # Endpointy kursów
│   ├── courses/           # Strona z listą kursów
│   └── lessons/           # Strona z lekcjami kursu
├── components/             # Komponenty React
│   ├── ui/                # Podstawowe komponenty UI
│   └── forms/             # Komponenty formularzy
├── lib/                    # Narzędzia i utilities
└── hooks/                  # Custom React hooks
```

## 🔐 Autoryzacja

Platforma używa JWT tokens przechowywanych w HTTP-only cookies dla bezpieczeństwa.

### Endpointy API:

- `POST /api/auth/register` - Rejestracja użytkownika
- `POST /api/auth/login` - Logowanie użytkownika
- `POST /api/auth/logout` - Wylogowanie użytkownika

### Role użytkowników:

- **STUDENT** - Dostęp do kursów, śledzenie postępów
- **INSTRUCTOR** - Tworzenie i zarządzanie kursami
- **ADMIN** - Pełny dostęp administracyjny

## 📚 Zarządzanie kursami

### Tworzenie kursu:
```typescript
POST /api/courses
{
  "title": "Nazwa kursu",
  "description": "Opis kursu",
  "price": 199.99,
  "category": "Programowanie",
  "level": "Początkujący"
}
```

### Pobieranie kursów:
```typescript
GET /api/courses?category=Programowanie&level=Początkujący&search=react
```

## 🎨 Customizacja

### Kolory i motywy:
Edytuj plik `tailwind.config.js` aby dostosować kolory i motywy aplikacji.

### Komponenty UI:
Wszystkie komponenty UI znajdują się w `src/components/ui/` i mogą być łatwo modyfikowane.

## 🚀 Deployment

### Vercel (zalecane):
1. Połącz repozytorium z Vercel
2. Ustaw zmienne środowiskowe
3. Deploy automatyczny przy każdym push

### Inne platformy:
Aplikacja może być wdrożona na dowolnej platformie obsługującej Node.js.

## 🤝 Rozwój

### Dodawanie nowych funkcji:
1. Stwórz nowy route w `src/app/`
2. Dodaj komponenty w `src/components/`
3. Zaktualizuj schemat bazy danych jeśli potrzeba
4. Dodaj testy

### Struktura bazy danych:
Użyj Prisma Studio do wizualnego zarządzania bazą danych:
```bash
npx prisma studio
```

## 📝 Licencja

Ten projekt jest dostępny na licencji MIT.

## 🆘 Wsparcie

W przypadku problemów:
1. Sprawdź logi w konsoli
2. Upewnij się, że wszystkie zależności są zainstalowane
3. Sprawdź konfigurację bazy danych
4. Otwórz issue w repozytorium

## 🔮 Planowane funkcje

- [ ] System płatności (Stripe)
- [ ] Video streaming
- [ ] System komentarzy i ocen
- [ ] Certyfikaty ukończenia
- [ ] System powiadomień
- [ ] Mobile app (React Native)
- [ ] Analytics i raporty
- [ ] Integracja z zewnętrznymi platformami

---

**EduPlatform** - Twoja droga do sukcesu zaczyna się tutaj! 🎓
