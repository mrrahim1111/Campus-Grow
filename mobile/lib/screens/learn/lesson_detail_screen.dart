import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import '../../constants/app_colors.dart';
import '../../services/supabase_service.dart';

class LessonDetailScreen extends StatefulWidget {
  final String slug;
  final String title;
  final String domain;

  const LessonDetailScreen({
    super.key,
    required this.slug,
    required this.title,
    required this.domain,
  });

  @override
  State<LessonDetailScreen> createState() => _LessonDetailScreenState();
}

class _LessonDetailScreenState extends State<LessonDetailScreen> {
  bool _isCompleted = false;

  final String _sampleMarkdown = '''
# Memory Architecture in Systems Programming

In low-level systems and C development, understanding how the computer manages memory is essential for writing high-performance, bug-free applications.

### 1. The Virtual Address Space
When your operating system launches an executable process, it allocates a continuous virtual address space divided into four key segments:

* **Text Segment:** Stores compiled machine instructions (read-only).
* **Data & BSS:** Stores global and static variables.
* **Stack:** Fast, automatic LIFO allocation for local variables and function call frames.
* **Heap:** Dynamically allocated memory managed manually via pointers.

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // Stack allocation
    int count = 10;
    
    // Heap dynamic allocation
    int *buffer = (int*)malloc(count * sizeof(int));
    
    if (buffer == NULL) {
        fprintf(stderr, "Allocation failed!\\n");
        return 1;
    }
    
    for (int i = 0; i < count; i++) {
        buffer[i] = i * 2;
        printf("buffer[%d] = %d\\n", i, buffer[i]);
    }
    
    // Always free dynamic memory
    free(buffer);
    buffer = NULL;
    return 0;
}
```

### 2. Common Pitfalls
1. **Memory Leaks:** Failing to invoke `free()` when memory is no longer required.
2. **Dangling Pointers:** Accessing memory after it has been freed.
3. **Buffer Overflows:** Writing past allocated boundary limits.
''';

  void _markAsDone() async {
    setState(() => _isCompleted = true);
    await SupabaseService.instance.recordLessonProgress(
      lessonSlug: widget.slug,
      completed: true,
    );

    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('🎉 Lesson completed and saved to your profile!'),
          backgroundColor: AppColors.primary,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: AppColors.textDark, size: 20),
          onPressed: () => Navigator.pop(context),
        ),
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              widget.domain.toUpperCase(),
              style: const TextStyle(fontSize: 10, color: AppColors.textSecondary, fontWeight: FontWeight.bold),
            ),
            Text(
              widget.title,
              style: const TextStyle(fontSize: 14, color: AppColors.textDark, fontWeight: FontWeight.bold),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: Markdown(
              data: _sampleMarkdown,
              selectable: true,
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              styleSheet: MarkdownStyleSheet(
                h1: const TextStyle(fontSize: 20, fontWeight: FontWeight.w900, color: AppColors.textDark, height: 1.4),
                h2: const TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: AppColors.textDark, height: 1.4),
                h3: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppColors.textDark, height: 1.4),
                p: const TextStyle(fontSize: 14, color: AppColors.textDark, height: 1.6),
                code: TextStyle(
                  backgroundColor: AppColors.background,
                  fontFamily: 'monospace',
                  fontSize: 12,
                  color: Colors.purple.shade900,
                ),
                codeblockDecoration: BoxDecoration(
                  color: const Color(0xFF0F172A),
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.border),
                ),
                codeblockPadding: const EdgeInsets.all(16),
              ),
            ),
          ),

          // Bottom Action Bar
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: AppColors.border)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 10,
                  offset: const Offset(0, -4),
                ),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: _isCompleted ? null : _markAsDone,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _isCompleted ? AppColors.success : AppColors.primary,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      elevation: 0,
                    ),
                    child: Text(
                      _isCompleted ? '✓ Completed' : 'Mark as Complete & Next →',
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
