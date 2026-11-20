import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';

class CohortsScreen extends StatefulWidget {
  const CohortsScreen({super.key});

  @override
  State<CohortsScreen> createState() => _CohortsScreenState();
}

class _CohortsScreenState extends State<CohortsScreen> {
  final List<String> _enrolled = [];

  final List<Map<String, dynamic>> _cohorts = [
    {
      'id': 'systems-c',
      'title': 'High-Performance Systems & C Kernel Architecture',
      'mentor': 'Arjun Mehta',
      'company': 'Google (Core Systems)',
      'duration': '8 Weeks',
      'schedule': 'Sat & Sun • 11:00 AM - 1:00 PM IST',
      'seatsLeft': 14,
      'highlights': [
        'POSIX multithreading & lock-free queues',
        'Custom virtual memory allocator (malloc from scratch)',
        '1-on-1 code review on final Capstone project',
      ],
      'weeks': [
        'Week 1-2: Pointer arithmetic, stack vs heap, assembly mapping',
        'Week 3-4: Concurrency, race conditions, POSIX mutexes',
        'Week 5-6: Linux socket programming & asynchronous I/O (epoll)',
        'Week 7-8: Capstone: Building a high-throughput Redis clone in C',
      ],
    },
    {
      'id': 'dsa-oa',
      'title': 'FAANG DSA & Placement Crackers Sprint',
      'mentor': 'Sneha Rao',
      'company': 'Microsoft (Azure Cloud)',
      'duration': '6 Weeks',
      'schedule': 'Sat & Sun • 5:00 PM - 7:00 PM IST',
      'seatsLeft': 9,
      'highlights': [
        'Sliding window, monotonic stack, interval patterns',
        'Dynamic programming: Top-down memoization vs Tabulation',
        'Mock Online Assessment (OA) simulator with live test series',
      ],
      'weeks': [
        'Week 1: Two pointers, fast & slow pointers, cyclic sort',
        'Week 2: Monotonic stack & deque optimization tricks',
        'Week 3-4: Trees, Lowest Common Ancestor, Graph DFS/BFS & Dijkstra',
        'Week 5-6: 1-D and 2-D Dynamic Programming patterns',
      ],
    },
  ];

  void _enrollInCohort(String id, String title) {
    setState(() => _enrolled.add(id));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('🎓 Enrolled in $title! Google Meet invite sent.'),
        backgroundColor: AppColors.primary,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Row(
          children: [
            Icon(Icons.video_library_rounded, color: AppColors.primary, size: 22),
            SizedBox(width: 8),
            Text(
              'Live Cohorts & Masterclasses',
              style: TextStyle(color: AppColors.textDark, fontWeight: FontWeight.w900, fontSize: 16),
            ),
          ],
        ),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(16),
        itemCount: _cohorts.length,
        separatorBuilder: (_, __) => const SizedBox(height: 16),
        itemBuilder: (context, idx) {
          final c = _cohorts[idx];
          final isEnrolled = _enrolled.contains(c['id']);

          return Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: isEnrolled ? AppColors.success : AppColors.border, width: isEnrolled ? 2 : 1),
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
                        '⚡ ${c['duration']} Live Cohort',
                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.primaryDark),
                      ),
                    ),
                    Text(
                      '${c['seatsLeft']} seats left',
                      style: const TextStyle(color: Colors.redAccent, fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(
                  c['title'],
                  style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w900, color: AppColors.textDark),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    const Icon(Icons.person, size: 14, color: AppColors.primary),
                    const SizedBox(width: 4),
                    Text(
                      '${c['mentor']} (${c['company']})',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.textDark),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  c['schedule'],
                  style: const TextStyle(fontSize: 11, color: AppColors.textSecondary),
                ),
                const SizedBox(height: 14),
                const Text('What is included:', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                const SizedBox(height: 6),
                ...(c['highlights'] as List<String>).map((h) => Padding(
                      padding: const EdgeInsets.only(bottom: 4),
                      child: Row(
                        children: [
                          const Icon(Icons.check_circle_rounded, color: AppColors.success, size: 14),
                          const SizedBox(width: 6),
                          Expanded(child: Text(h, style: const TextStyle(fontSize: 11, color: AppColors.textDark))),
                        ],
                      ),
                    )),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: isEnrolled ? null : () => _enrollInCohort(c['id'], c['title']),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: isEnrolled ? AppColors.success : AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 0,
                    ),
                    child: Text(
                      isEnrolled ? '✓ Admission Confirmed' : 'Confirm Free Admission →',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
