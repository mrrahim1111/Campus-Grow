# CampusGrow — Grow Beyond the Classroom (Flutter Mobile App)

A complete, production-grade native cross-platform mobile application for **CampusGrow**, engineered with **Flutter** (iOS & Android) and backed by **Supabase** and Next.js cloud APIs.

---

## 📱 Mobile Architecture & Modules

The repository root is now the primary Flutter application:

```
.
├── pubspec.yaml                       # Flutter dependencies & assets configuration
├── android/                           # Native Android manifest & gradle configuration
├── lib/                               # Primary Flutter Dart application
│   ├── main.dart                      # App entry point, Material 3 Theme, AuthGate
│   ├── constants/
│   │   ├── app_colors.dart            # CampusGrow Emerald / Mint / Slate palette
│   │   └── app_strings.dart           # App constants & live Supabase project endpoints
│   ├── models/
│   │   ├── chat_message.dart          # AI Socratic mentor chat models
│   │   ├── lesson_model.dart          # Syllabi, modules, and code models
│   │   ├── quiz_model.dart            # Diagnostic MCQ and question models
│   │   └── user_model.dart            # Student profile & progress models
│   ├── services/
│   │   ├── supabase_service.dart      # Realtime Supabase authentication & progress sync
│   │   └── ai_mentor_service.dart     # Socratic AI chat engine with local fallback
│   └── screens/
│       ├── auth/login_screen.dart             # Student sign-in, registration, and guest mode
│       ├── home/dashboard_screen.dart         # Daily streaks, sprint recommendations, stats
│       ├── learn/learning_hub_screen.dart     # Year 1 to 4 modular engineering curriculum
│       ├── learn/lesson_detail_screen.dart    # Markdown reader with code blocks & completion
│       ├── compiler/code_runner_screen.dart   # Cloud Code Runner for C, Python, JavaScript
│       ├── interview/mock_interview_screen.dart# FAANG SDE & System Design interview simulator
│       ├── resume/resume_builder_screen.dart  # ATS Resume score gauge & PDF builder
│       ├── cohorts/cohorts_screen.dart        # Live weekend masterclasses & mentor admission
│       ├── practice/quiz_screen.dart          # Timed assessments, feedback, and scoring
│       ├── mentor/ai_mentor_screen.dart       # 24/7 AI mentor with ELI5, FAANG, Doctor personas
│       ├── profile/profile_screen.dart        # Student badges, CGPA, branch, and settings
│       └── main_shell.dart                    # Persistent bottom navigation controller
└── backend/                           # Next.js 16 Web APIs & Cloud Services
    ├── app/api/terminal/execute/      # Cloud sandbox compiler API (C, Python, JS)
    ├── app/api/mentor/chat/           # Gemini AI model endpoint
    ├── app/api/auth/callback/         # Supabase OAuth handlers
    └── supabase/                      # Database migrations & schemas
```

---

## 🚀 How to Run the Flutter Mobile App

### 1. Prerequisites
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (`>= 3.0.0`)
- Android Studio / Xcode for device simulation.

### 2. Install Packages
```bash
flutter pub get
```

### 3. Run Locally
```bash
flutter run
```

### 4. Build Release Packages
- **Android APK**: `flutter build apk --release`
- **Android App Bundle**: `flutter build appbundle --release`
- **iOS App**: `flutter build ios --release`

---

## ☁️ Backend & Web Services (`backend/`)
The Next.js backend services located in `backend/` provide the optional cloud compiler sandbox and web hooks:
```bash
cd backend
npm install
npm run dev
```
