class QuizQuestion {
  final String id;
  final String question;
  final List<String> options;
  final int correctOptionIndex;
  final String explanation;
  final String branch;
  final String topic;

  QuizQuestion({
    required this.id,
    required this.question,
    required this.options,
    required this.correctOptionIndex,
    required this.explanation,
    required this.branch,
    required this.topic,
  });

  factory QuizQuestion.fromJson(Map<String, dynamic> json) {
    return QuizQuestion(
      id: json['id'] ?? '',
      question: json['question'] ?? '',
      options: List<String>.from(json['options'] ?? []),
      correctOptionIndex: json['correct_option_index'] ?? 0,
      explanation: json['explanation'] ?? '',
      branch: json['branch'] ?? 'CSE',
      topic: json['topic'] ?? 'General',
    );
  }
}
