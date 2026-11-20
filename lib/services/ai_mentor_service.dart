import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import '../constants/app_strings.dart';

class AiMentorService {
  static Future<String> sendMessage({
    required String message,
    String persona = 'eli5',
    String? branch,
    String? year,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('${AppStrings.webApiBaseUrl}/api/mentor/chat'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'message': message,
          'persona': persona,
          'profile': {
            'branch': branch ?? 'Computer Science',
            'year': year ?? 'Engineering',
          },
        }),
      ).timeout(const Duration(seconds: 12));

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        return data['reply'] ?? data['text'] ?? 'I understand. Let us break this down step-by-step.';
      }
    } catch (e) {
      debugPrint('[AI Mentor API Timeout/Offline]: $e');
    }

    // Intelligent offline Socratic response engine
    return _generateLocalMentorReply(message, persona);
  }

  static String _generateLocalMentorReply(String question, String persona) {
    final lower = question.toLowerCase();

    if (lower.contains('pointer') || lower.contains('*') || lower.contains('&')) {
      return '🧠 **Memory & Pointers Concept**\n\n'
          'Think of computer memory like a row of student lockers. Each locker has an address (like `0x7ffee4`) and content inside (like `42`).\n\n'
          '```c\n'
          'int x = 42;\n'
          'int *ptr = &x; // ptr stores the address of x\n'
          'printf("%d", *ptr); // dereferencing gets 42\n'
          '```\n\n'
          'What happens if you change `*ptr = 100`? Does `x` also change? Think about why!';
    }

    if (lower.contains('recursion') || lower.contains('base case')) {
      return '⚡ **Recursion Mastery**\n\n'
          'Every recursive function must satisfy two golden rules:\n'
          '1. **Base Case:** The emergency stop condition preventing infinite stack overflow.\n'
          '2. **Recursive Step:** Progressing towards the base case with a smaller input.\n\n'
          'Which base case would you write to reverse a string recursively?';
    }

    return '💡 **Engineering Mentor Guidance**\n\n'
        'Great question about **"$question"**!\n\n'
        'In production engineering, we evaluate trade-offs between **Time Complexity**, **Memory Usage**, and **Readability**.\n\n'
        '1. What input size are you expecting?\n'
        '2. Have you considered edge cases like empty arrays or null pointers?\n\n'
        'Share your current code snippet and let us optimize it together!';
  }
}
