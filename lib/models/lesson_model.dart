class Lesson {
  final String id;
  final String slug;
  final String title;
  final String domain;
  final String durationMinutes;
  final String description;
  final String contentMarkdown;
  final String? codeSnippet;
  final String? codeLanguage;
  final bool isCompleted;

  Lesson({
    required this.id,
    required this.slug,
    required this.title,
    required this.domain,
    required this.durationMinutes,
    required this.description,
    required this.contentMarkdown,
    this.codeSnippet,
    this.codeLanguage,
    this.isCompleted = false,
  });

  factory Lesson.fromJson(Map<String, dynamic> json) {
    return Lesson(
      id: json['id'] ?? '',
      slug: json['slug'] ?? '',
      title: json['title'] ?? '',
      domain: json['domain'] ?? 'Foundations',
      durationMinutes: json['duration_minutes']?.toString() ?? '15',
      description: json['description'] ?? '',
      contentMarkdown: json['content_markdown'] ?? '',
      codeSnippet: json['code_snippet'],
      codeLanguage: json['code_language'] ?? 'c',
      isCompleted: json['is_completed'] ?? false,
    );
  }
}
