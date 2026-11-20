import 'package:flutter/foundation.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../constants/app_strings.dart';

class SupabaseService {
  static final SupabaseService instance = SupabaseService._internal();
  SupabaseService._internal();

  SupabaseClient get client => Supabase.instance.client;

  User? get currentUser => client.auth.currentUser;
  bool get isAuthenticated => currentUser != null;

  static Future<void> initialize() async {
    try {
      await Supabase.initialize(
        url: AppStrings.supabaseUrl,
        anonKey: AppStrings.supabaseAnonKey,
      );
    } catch (e) {
      debugPrint('[Supabase Init Error]: $e');
    }
  }

  // ── Authentication ──────────────────────────────────────────────────────────

  Future<AuthResponse> signInWithPassword({
    required String email,
    required String password,
  }) async {
    final response = await client.auth.signInWithPassword(
      email: email,
      password: password,
    );

    // Cache user credentials locally for fast startup
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user_email', email);
    await prefs.setBool('is_authenticated', true);

    return response;
  }

  Future<AuthResponse> signUpWithPassword({
    required String email,
    required String password,
    String name = 'Student',
    String branch = 'Computer Science',
    String year = '1st Year',
  }) async {
    final response = await client.auth.signUp(
      email: email,
      password: password,
      data: {
        'name': name,
        'branch': branch,
        'year': year,
      },
    );

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('student_name', name);
    await prefs.setString('student_branch', branch);
    await prefs.setString('student_year', year);

    return response;
  }

  Future<void> signOut() async {
    try {
      await client.auth.signOut();
    } catch (_) {}
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }

  // ── Profile & Progress ──────────────────────────────────────────────────────

  Future<Map<String, dynamic>> fetchStudentProfile() async {
    final user = currentUser;
    if (user == null) {
      final prefs = await SharedPreferences.getInstance();
      return {
        'name': prefs.getString('student_name') ?? 'Engineering Student',
        'branch': prefs.getString('student_branch') ?? 'Computer Science',
        'year': prefs.getString('student_year') ?? '1st Year',
        'is_pro': prefs.getBool('is_pro') ?? true,
      };
    }

    try {
      final data = await client
          .from('profiles')
          .select()
          .eq('id', user.id)
          .maybeSingle();

      if (data != null) return data;
    } catch (e) {
      debugPrint('[Supabase Profile Fetch]: $e');
    }

    return {
      'name': user.userMetadata?['name'] ?? 'Engineering Student',
      'branch': user.userMetadata?['branch'] ?? 'Computer Science',
      'year': user.userMetadata?['year'] ?? '1st Year',
      'is_pro': true,
    };
  }

  Future<void> recordLessonProgress({
    required String lessonSlug,
    required bool completed,
  }) async {
    final prefs = await SharedPreferences.getInstance();
    final completedLessons = prefs.getStringList('completed_lessons') ?? [];
    if (completed && !completedLessons.contains(lessonSlug)) {
      completedLessons.add(lessonSlug);
      await prefs.setStringList('completed_lessons', completedLessons);
    }

    final user = currentUser;
    if (user != null) {
      try {
        await client.from('lesson_progress').upsert({
          'user_id': user.id,
          'lesson_slug': lessonSlug,
          'completed': completed,
          'updated_at': DateTime.now().toIso8601String(),
        });
      } catch (e) {
        debugPrint('[Progress Sync Warning]: $e');
      }
    }
  }
}
