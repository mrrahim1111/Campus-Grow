import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';
import '../../models/quiz_model.dart';

class QuizScreen extends StatefulWidget {
  const QuizScreen({super.key});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  int _currentIndex = 0;
  int? _selectedOption;
  bool _hasSubmitted = false;
  int _score = 0;

  final List<QuizQuestion> _questions = [
    QuizQuestion(
      id: 'q1',
      question: 'Which memory segment in a C process is dynamically managed using malloc() and free()?',
      options: ['Stack', 'Heap', 'BSS Segment', 'Text Segment'],
      correctOptionIndex: 1,
      explanation: 'The Heap segment is used for dynamic memory allocations controlled at runtime via malloc/calloc and freed with free().',
      branch: 'CSE',
      topic: 'Systems & Memory',
    ),
    QuizQuestion(
      id: 'q2',
      question: 'What is the time complexity of looking up a key in a well-balanced Hash Table on average?',
      options: ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'],
      correctOptionIndex: 2,
      explanation: 'Hash tables offer O(1) average-case lookup, insert, and delete performance under uniform hash distributions.',
      branch: 'CSE',
      topic: 'Data Structures',
    ),
    QuizQuestion(
      id: 'q3',
      question: 'In Object-Oriented Programming, which principle allows a derived class to provide a specific implementation of a method defined in its base class?',
      options: ['Polymorphism', 'Encapsulation', 'Abstraction', 'Composition'],
      correctOptionIndex: 0,
      explanation: 'Polymorphism (specifically runtime polymorphism via method overriding) allows derived types to redefine base class behaviors.',
      branch: 'CSE',
      topic: 'OOP Concepts',
    ),
  ];

  void _submitAnswer() {
    if (_selectedOption == null) return;
    setState(() {
      _hasSubmitted = true;
      if (_selectedOption == _questions[_currentIndex].correctOptionIndex) {
        _score++;
      }
    });
  }

  void _nextQuestion() {
    if (_currentIndex < _questions.length - 1) {
      setState(() {
        _currentIndex++;
        _selectedOption = null;
        _hasSubmitted = false;
      });
    } else {
      _showResultDialog();
    }
  }

  void _showResultDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Text('🎉 Assessment Complete!', textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.w900)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppColors.primaryMint,
                shape: BoxShape.circle,
              ),
              child: Text(
                '$_score/${_questions.length}',
                style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900, color: AppColors.primary),
              ),
            ),
            const SizedBox(height: 16),
            Text(
              _score == _questions.length
                  ? 'Outstanding! You have mastered these fundamental engineering concepts.'
                  : 'Good effort! Review the missed questions to reinforce your foundations.',
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 13, color: AppColors.textSecondary),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(ctx);
              setState(() {
                _currentIndex = 0;
                _selectedOption = null;
                _hasSubmitted = false;
                _score = 0;
              });
            },
            child: const Text('Retake Quiz', style: TextStyle(fontWeight: FontWeight.bold)),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.primary,
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            child: const Text('Back to Home'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentQ = _questions[_currentIndex];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textDark, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          'Question ${_currentIndex + 1} of ${_questions.length}',
          style: const TextStyle(color: AppColors.textDark, fontSize: 15, fontWeight: FontWeight.bold),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Progress Bar
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: LinearProgressIndicator(
                value: (_currentIndex + 1) / _questions.length,
                minHeight: 8,
                backgroundColor: AppColors.border,
                color: AppColors.primary,
              ),
            ),
            const SizedBox(height: 24),

            // Question Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: AppColors.border),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.primaryMint,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      currentQ.topic,
                      style: const TextStyle(color: AppColors.primaryDark, fontSize: 10, fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    currentQ.question,
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: AppColors.textDark, height: 1.4),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Options List
            Expanded(
              child: ListView.separated(
                itemCount: currentQ.options.length,
                separatorBuilder: (_, __) => const SizedBox(height: 12),
                itemBuilder: (context, idx) {
                  final isSelected = _selectedOption == idx;
                  final isCorrect = currentQ.correctOptionIndex == idx;

                  Color borderColor = AppColors.border;
                  Color bgColor = Colors.white;

                  if (_hasSubmitted) {
                    if (isCorrect) {
                      borderColor = AppColors.success;
                      bgColor = Colors.green.shade50;
                    } else if (isSelected) {
                      borderColor = AppColors.error;
                      bgColor = Colors.red.shade50;
                    }
                  } else if (isSelected) {
                    borderColor = AppColors.primary;
                    bgColor = AppColors.primaryMint;
                  }

                  return GestureDetector(
                    onTap: _hasSubmitted ? null : () => setState(() => _selectedOption = idx),
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: bgColor,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: borderColor, width: isSelected ? 2 : 1),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 28,
                            height: 28,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(color: borderColor, width: 2),
                              color: isSelected ? AppColors.primary : Colors.transparent,
                            ),
                            child: isSelected
                                ? const Icon(Icons.check, size: 16, color: Colors.white)
                                : null,
                          ),
                          const SizedBox(width: 14),
                          Expanded(
                            child: Text(
                              currentQ.options[idx],
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                color: AppColors.textDark,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),

            // Explanation Card if submitted
            if (_hasSubmitted) ...[
              Container(
                padding: const EdgeInsets.all(14),
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: Colors.blue.shade50,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.blue.shade200),
                ),
                child: Text(
                  '💡 Explanation: ${currentQ.explanation}',
                  style: TextStyle(fontSize: 12, color: Colors.blue.shade900, height: 1.4),
                ),
              ),
            ],

            // Submit / Next Button
            ElevatedButton(
              onPressed: _selectedOption == null
                  ? null
                  : _hasSubmitted
                      ? _nextQuestion
                      : _submitAnswer,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                elevation: 0,
              ),
              child: Text(
                _hasSubmitted
                    ? (_currentIndex < _questions.length - 1 ? 'Next Question →' : 'View Final Score 🎉')
                    : 'Submit Answer',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
