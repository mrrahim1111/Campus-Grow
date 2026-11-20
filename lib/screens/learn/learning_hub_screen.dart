import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';
import 'lesson_detail_screen.dart';

class LearningHubScreen extends StatefulWidget {
  const LearningHubScreen({super.key});

  @override
  State<LearningHubScreen> createState() => _LearningHubScreenState();
}

class _LearningHubScreenState extends State<LearningHubScreen> {
  int _selectedYearIndex = 0;

  final List<String> _years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];

  final List<Map<String, dynamic>> _year1Modules = [
    {
      'slug': 'programming-fundamentals',
      'title': 'C Language Architecture & Syntax',
      'desc': 'Compilers, preprocessing, memory layout, and main function anatomy.',
      'lessons': 4,
      'duration': '45m',
    },
    {
      'slug': 'variables-data-types',
      'title': 'Variables, Constants & Memory Types',
      'desc': 'Primitives, bit sizes, memory ranges, and type casting rules.',
      'lessons': 5,
      'duration': '50m',
    },
    {
      'slug': 'conditional-statements',
      'title': 'Control Flow & Branching',
      'desc': 'If-else hierarchies, switch cases, and truth evaluation.',
      'lessons': 4,
      'duration': '40m',
    },
    {
      'slug': 'loops',
      'title': 'Iteration Patterns & Loops',
      'desc': 'While, do-while, and nested loop optimization strategies.',
      'lessons': 6,
      'duration': '60m',
    },
    {
      'slug': 'pointers-mini-project',
      'title': 'Pointers & Dynamic Memory Architecture',
      'desc': 'Heap allocation, malloc/calloc/free, pointer arithmetic, and leaks.',
      'lessons': 7,
      'duration': '75m',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Engineering Curriculum',
          style: TextStyle(
            color: AppColors.textDark,
            fontWeight: FontWeight.w900,
            fontSize: 18,
          ),
        ),
      ),
      body: Column(
        children: [
          // Year Selector Tabs
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: List.generate(_years.length, (index) {
                final isSelected = _selectedYearIndex == index;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _selectedYearIndex = index),
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 4),
                      padding: const EdgeInsets.symmetric(vertical: 10),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.primary : AppColors.background,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: Text(
                        _years[index],
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: isSelected ? Colors.white : AppColors.textSecondary,
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),

          // Module List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(20),
              itemCount: _year1Modules.length,
              separatorBuilder: (_, __) => const SizedBox(height: 14),
              itemBuilder: (context, index) {
                final module = _year1Modules[index];
                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => LessonDetailScreen(
                          slug: module['slug'],
                          title: module['title'],
                          domain: _years[_selectedYearIndex],
                        ),
                      ),
                    );
                  },
                  child: Container(
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(22),
                      border: Border.all(color: AppColors.border),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.02),
                          blurRadius: 10,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: AppColors.primaryMint,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: Text(
                                'Module ${index + 1}',
                                style: const TextStyle(
                                  color: AppColors.primaryDark,
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                            Row(
                              children: [
                                const Icon(Icons.timer_outlined, size: 14, color: AppColors.textMuted),
                                const SizedBox(width: 4),
                                Text(
                                  module['duration'],
                                  style: const TextStyle(fontSize: 11, color: AppColors.textSecondary, fontWeight: FontWeight.bold),
                                ),
                              ],
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          module['title'],
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textDark,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          module['desc'],
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textSecondary,
                            height: 1.3,
                          ),
                        ),
                        const SizedBox(height: 14),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              '${module['lessons']} Lessons & Exercises',
                              style: const TextStyle(fontSize: 11, color: AppColors.textMuted, fontWeight: FontWeight.w600),
                            ),
                            const Text(
                              'Start Lesson →',
                              style: TextStyle(
                                color: AppColors.primary,
                                fontSize: 12,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
