import 'package:flutter/material.dart';
import '../../constants/app_colors.dart';

class ResumeBuilderScreen extends StatefulWidget {
  const ResumeBuilderScreen({super.key});

  @override
  State<ResumeBuilderScreen> createState() => _ResumeBuilderScreenState();
}

class _ResumeBuilderScreenState extends State<ResumeBuilderScreen> {
  final _nameController = TextEditingController(text: 'Rahul Sharma');
  final _collegeController = TextEditingController(text: 'National Institute of Technology');
  final _branchController = TextEditingController(text: 'Computer Science and Engineering');
  final _cgpaController = TextEditingController(text: '8.8 / 10.0');
  final _projectTitleController = TextEditingController(text: 'High-Throughput In-Memory Key-Value Store');
  final _projectBulletsController = TextEditingController(
    text: '• Built multithreaded LRU cache in C with POSIX mutex locks and O(1) hash table lookups.\n'
        '• Benchmarked concurrent reads reaching 120,000 queries per second with sub-millisecond p99 latency.\n'
        '• Prevented memory corruption with Valgrind address sanitizers and zero memory leaks.',
  );

  final List<String> _skills = ['C / C++', 'Python', 'Data Structures', 'Linux / POSIX', 'PostgreSQL', 'Docker', 'Git'];
  final TextEditingController _skillInputController = TextEditingController();

  int get _atsScore {
    int score = 40;
    if (_nameController.text.isNotEmpty) score += 10;
    if (_skills.length >= 5) score += 20;
    if (_projectBulletsController.text.contains('•') && _projectBulletsController.text.length > 50) score += 20;
    if (_cgpaController.text.isNotEmpty) score += 10;
    return score.clamp(0, 100);
  }

  void _addSkill() {
    final s = _skillInputController.text.trim();
    if (s.isNotEmpty && !_skills.contains(s)) {
      setState(() {
        _skills.add(s);
        _skillInputController.clear();
      });
    }
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
            Icon(Icons.description_outlined, color: AppColors.primary, size: 22),
            SizedBox(width: 8),
            Text(
              'ATS Resume Builder',
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
            // ATS Match Score Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppColors.primary, AppColors.primaryDark],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(24),
              ),
              child: Row(
                children: [
                  Stack(
                    alignment: Alignment.center,
                    children: [
                      SizedBox(
                        width: 64,
                        height: 64,
                        child: CircularProgressIndicator(
                          value: _atsScore / 100,
                          strokeWidth: 6,
                          backgroundColor: Colors.white24,
                          color: AppColors.accentEmerald,
                        ),
                      ),
                      Text(
                        '$_atsScore%',
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 16),
                      ),
                    ],
                  ),
                  const SizedBox(width: 16),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'ATS Match Score: High',
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 15),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Your profile matches 90%+ keyword expectations for Tier-1 Software Engineering internships.',
                          style: TextStyle(color: Colors.white70, fontSize: 11, height: 1.4),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Education & Personal Info
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
                  const Text('1. Academic & Student Header', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _nameController,
                    decoration: InputDecoration(
                      labelText: 'Full Name',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _collegeController,
                    decoration: InputDecoration(
                      labelText: 'College / University',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        flex: 2,
                        child: TextField(
                          controller: _branchController,
                          decoration: InputDecoration(
                            labelText: 'Degree & Branch',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: TextField(
                          controller: _cgpaController,
                          decoration: InputDecoration(
                            labelText: 'CGPA',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Skills Card
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
                  const Text('2. Technical Core Competencies', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 6,
                    runSpacing: 6,
                    children: _skills.map((skill) {
                      return Chip(
                        label: Text(skill, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        backgroundColor: AppColors.primaryMint,
                        side: const BorderSide(color: AppColors.primaryLight),
                        deleteIcon: const Icon(Icons.close, size: 14),
                        onDeleted: () => setState(() => _skills.remove(skill)),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _skillInputController,
                          decoration: InputDecoration(
                            hintText: 'Add skill (e.g. Kubernetes, Redis)',
                            hintStyle: const TextStyle(fontSize: 12),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        onPressed: _addSkill,
                        icon: const Icon(Icons.add_circle, color: AppColors.primary, size: 28),
                      ),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // Project Highlights
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
                  const Text('3. High-Impact Capstone Projects', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _projectTitleController,
                    decoration: InputDecoration(
                      labelText: 'Project Title',
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: _projectBulletsController,
                    maxLines: 5,
                    style: const TextStyle(fontSize: 12, height: 1.4),
                    decoration: InputDecoration(
                      labelText: 'Quantified Accomplishment Bullets',
                      alignLabelWithHint: true,
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Action Button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('📄 ATS Resume preview ready! Synced with your CampusGrow profile.'),
                      backgroundColor: AppColors.primary,
                    ),
                  );
                },
                icon: const Icon(Icons.download_rounded, size: 20),
                label: const Text('Generate Formatted Resume PDF →', style: TextStyle(fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 0,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
