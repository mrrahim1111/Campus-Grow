import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';

class MockInterviewScreen extends StatefulWidget {
  const MockInterviewScreen({super.key});

  @override
  State<MockInterviewScreen> createState() => _MockInterviewScreenState();
}

class _MockInterviewScreenState extends State<MockInterviewScreen> {
  int _selectedTrackIndex = 0;
  final TextEditingController _answerController = TextEditingController();
  bool _isEvaluating = false;
  Map<String, dynamic>? _feedback;

  final List<Map<String, dynamic>> _tracks = [
    {
      'title': 'FAANG SDE-1 Technical Round',
      'company': 'Google / Meta / Amazon',
      'difficulty': 'Medium - Hard',
      'timeLimit': '45 Mins',
      'problem': 'Two Sum II - Input Array Is Sorted',
      'description':
          'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.\n\n'
          'Your solution must use only O(1) additional space complexity.',
      'expectedComplexity': 'Time: O(N), Space: O(1)',
      'example': 'Input: numbers = [2,7,11,15], target = 9\nOutput: [1,2]\nExplanation: The sum of 2 and 7 is 9.',
    },
    {
      'title': 'System Design & Architecture',
      'company': 'Uber / Netflix',
      'difficulty': 'Hard',
      'timeLimit': '60 Mins',
      'problem': 'Design a Distributed Rate Limiter',
      'description':
          'Design an API rate limiter capable of throttling millions of client requests per second. Compare Sliding Window Log vs Token Bucket algorithm under Redis cluster replication.',
      'expectedComplexity': 'Throughput: 100k+ RPS, Latency < 5ms',
      'example': 'Client sends 150 requests/min; rate limit is 100/min. Requests 101-150 receive HTTP 429 Too Many Requests.',
    },
    {
      'title': 'Amazon Leadership & Behavioral',
      'company': 'Amazon',
      'difficulty': 'Behavioral STAR',
      'timeLimit': '30 Mins',
      'problem': 'Tell me about a time you disagreed with a technical design decision.',
      'description':
          'Demonstrate the STAR method (Situation, Task, Action, Result) showcasing Customer Obsession, Have Backbone; Disagree and Commit, and Bias for Action.',
      'expectedComplexity': 'STAR framework with quantified business metrics.',
      'example': 'Describe how you benchmarked alternative architectures with empirical data.',
    },
  ];

  void _submitForEvaluation() async {
    final text = _answerController.text.trim();
    if (text.isEmpty) return;

    setState(() => _isEvaluating = true);

    // Simulate interview evaluation response
    await Future.delayed(const Duration(milliseconds: 1400));

    if (mounted) {
      setState(() {
        _isEvaluating = false;
        _feedback = {
          'score': 88,
          'verdict': 'Strong Hire (Recommended)',
          'timeComplexity': 'Optimal O(N)',
          'spaceComplexity': 'Optimal O(1)',
          'strengths': [
            'Recognized two-pointer technique over brute force hash set.',
            'Correctly handled zero-indexed vs one-indexed array offset.',
            'Addressed integer overflow boundaries proactively.',
          ],
          'improvements': [
            'Explain trade-offs aloud before writing the final loop condition.',
            'Mention how hardware CPU branch prediction benefits sequential scans.',
          ],
        };
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final currentTrack = _tracks[_selectedTrackIndex];

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Row(
          children: [
            Icon(Icons.workspace_premium_rounded, color: AppColors.primary, size: 22),
            SizedBox(width: 8),
            Text(
              'FAANG Mock Simulator',
              style: TextStyle(color: AppColors.textDark, fontWeight: FontWeight.w900, fontSize: 16),
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Track Switcher
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: List.generate(_tracks.length, (idx) {
                  final isSelected = _selectedTrackIndex == idx;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(_tracks[idx]['title']),
                      selected: isSelected,
                      onSelected: (_) {
                        setState(() {
                          _selectedTrackIndex = idx;
                          _feedback = null;
                          _answerController.clear();
                        });
                      },
                      selectedColor: AppColors.primaryMint,
                      backgroundColor: Colors.white,
                      labelStyle: TextStyle(
                        fontSize: 11,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w600,
                        color: isSelected ? AppColors.primaryDark : AppColors.textSecondary,
                      ),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      side: BorderSide(color: isSelected ? AppColors.primary : AppColors.border),
                    ),
                  );
                }),
              ),
            ),

            const SizedBox(height: 16),

            // Question Overview Card
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
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.primaryMint,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          currentTrack['company'],
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppColors.primaryDark),
                        ),
                      ),
                      Text(
                        '⏱ ${currentTrack['timeLimit']}',
                        style: const TextStyle(fontSize: 11, color: AppColors.textMuted, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    currentTrack['problem'],
                    style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: AppColors.textDark),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    currentTrack['description'],
                    style: const TextStyle(fontSize: 13, color: AppColors.textDark, height: 1.5),
                  ),
                  const SizedBox(height: 14),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppColors.background,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    child: Text(
                      currentTrack['example'],
                      style: const TextStyle(fontFamily: 'monospace', fontSize: 11, color: AppColors.textDark),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 18),

            // Answer Input Area
            const Text(
              'Your Code / Technical Architecture Formulation:',
              style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: AppColors.textDark),
            ),
            const SizedBox(height: 8),
            Container(
              decoration: BoxDecoration(
                color: const Color(0xFF0F172A),
                borderRadius: BorderRadius.circular(20),
                border: Border.all(color: Colors.slate.shade800),
              ),
              child: TextField(
                controller: _answerController,
                maxLines: 7,
                style: const TextStyle(fontFamily: 'monospace', fontSize: 12, color: Color(0xFFE2E8F0)),
                decoration: const InputDecoration(
                  contentPadding: EdgeInsets.all(16),
                  hintText: '// Write your solution using optimal pointers or write architectural notes...\n\nint* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {\n    // ...\n}',
                  hintStyle: TextStyle(color: Colors.white30, fontFamily: 'monospace', fontSize: 11),
                  border: InputBorder.none,
                ),
              ),
            ),

            const SizedBox(height: 16),

            // Submit Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _isEvaluating ? null : _submitForEvaluation,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 0,
                ),
                child: _isEvaluating
                    ? const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white)),
                          SizedBox(width: 10),
                          Text('AI Interviewer Evaluating Logic...'),
                        ],
                      )
                    : const Text(
                        'Submit Solution for AI Interview Assessment →',
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                      ),
              ),
            ),

            // Evaluation Report if available
            if (_feedback != null) ...[
              const SizedBox(height: 20),
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: AppColors.success, width: 1.5),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Interviewer Scorecard',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: AppColors.textDark),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: Colors.green.shade100,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            '${_feedback!['score']}/100 • ${_feedback!['verdict']}',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.green.shade900),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Text('⏱ Time Complexity: ${_feedback!['timeComplexity']}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    Text('💾 Space Complexity: ${_feedback!['spaceComplexity']}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    const Text('Strong Signals Observed:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.primaryDark)),
                    const SizedBox(height: 4),
                    ...(_feedback!['strengths'] as List<String>).map((s) => Text(' • $s', style: const TextStyle(fontSize: 12, color: AppColors.textDark))),
                    const SizedBox(height: 10),
                    const Text('Next Growth Areas:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.accentAmber)),
                    const SizedBox(height: 4),
                    ...(_feedback!['improvements'] as List<String>).map((i) => Text(' • $i', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary))),
                  ],
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
