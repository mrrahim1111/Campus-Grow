# CampusGrow Mobile App (Flutter)

A cross-platform native Flutter mobile application for **CampusGrow — Grow Beyond the Classroom**, engineered for Android and iOS.

---

## 📱 Features

1. **Native Authentication with Supabase**:
   - Email & password registration and login.
   - Offline guest demo mode for immediate access.
   - Synchronized with your live Supabase database (`whwtzpizozuuubliwwwi`).
2. **Dashboard & Daily Streak**:
   - Streak counter, recommended engineering sprints, and active course progress.
   - Instant quick-access cards for AI Mentor and Skill Assessments.
3. **Curriculum Hub (Years 1 to 4)**:
   - Full branch-wise modular curriculum tracks (C, DSA, OOP, OS, Full-Stack, System Design).
   - Interactive lesson reader with markdown formatting, syntax-highlighted code blocks, and progress tracking.
4. **Interactive Practice Quizzes**:
   - Timed multiple-choice questions with instant correct/incorrect visual feedback.
   - Explanations and performance summaries.
5. **24/7 AI Engineering Mentor**:
   - Real-time Socratic mentor chat connected to the CampusGrow backend API (`/api/mentor/chat`).
   - Socratic persona switcher: **ELI5 Master**, **FAANG Placement Interviewer**, and **Code Bug Doctor**.
6. **Student Profile**:
   - Branch, graduation year, badges earned, and statistics.

---

## 🛠 Project Structure

```
mobile/
├── pubspec.yaml               # Dependencies (supabase_flutter, markdown, google_fonts)
├── android/                   # Android native manifest with deep linking
└── lib/
    ├── main.dart              # Entry point, Theme, AuthGate
    ├── constants/
    │   ├── app_colors.dart    # CampusGrow Emerald / Mint / Slate theme
    │   └── app_strings.dart   # App constants & live Supabase URLs
    ├── models/
    │   ├── chat_message.dart  # AI chat data models
    │   ├── lesson_model.dart  # Syllabi & lesson entities
    │   ├── quiz_model.dart    # MCQ and assessment questions
    │   └── user_model.dart    # Student profile
    ├── services/
    │   ├── supabase_service.dart # Auth and database sync
    │   └── ai_mentor_service.dart# Socratic AI chat with offline fallback
    └── screens/
        ├── auth/login_screen.dart           # Authentication & Guest login
        ├── home/dashboard_screen.dart       # Student dashboard & streak
        ├── learn/learning_hub_screen.dart   # Modular course browser
        ├── learn/lesson_detail_screen.dart  # Interactive lesson reader
        ├── practice/quiz_screen.dart        # Realtime quiz & tests
        ├── mentor/ai_mentor_screen.dart     # Socratic AI mentor
        ├── profile/profile_screen.dart      # Student statistics & badges
        └── main_shell.dart                  # BottomNavigationBar controller
```

---

## 🚀 How to Run the Flutter App

### Prerequisites
- Install the [Flutter SDK](https://docs.flutter.dev/get-started/install).
- Verify setup by running:
  ```bash
  flutter doctor
  ```

### Step 1: Navigate to the `mobile/` directory
```bash
cd mobile
```

### Step 2: Install dependencies
```bash
flutter pub get
```

### Step 3: Run on Emulator, Simulator, or Physical Device
- To list connected devices:
  ```bash
  flutter devices
  ```
- To run:
  ```bash
  flutter run
  ```

### Step 4: Build for Production
- **Android APK**:
  ```bash
  flutter build apk --release
  ```
- **Android App Bundle (Google Play)**:
  ```bash
  flutter build appbundle --release
  ```
- **iOS (Xcode)**:
  ```bash
  flutter build ios --release
  ```
