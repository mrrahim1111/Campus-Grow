import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import '../../constants/app_colors.dart';
import '../../models/chat_message.dart';
import '../../services/ai_mentor_service.dart';

class AiMentorScreen extends StatefulWidget {
  const AiMentorScreen({super.key});

  @override
  State<AiMentorScreen> createState() => _AiMentorScreenState();
}

class _AiMentorScreenState extends State<AiMentorScreen> {
  final _messageController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  bool _isTyping = false;
  String _selectedPersona = 'eli5';

  final List<ChatMessage> _messages = [
    ChatMessage(
      id: 'init',
      text: 'Hello! I am your **CampusGrow Engineering Mentor** 🎓\n\n'
          'Ask me anything about:\n'
          '* Pointer arithmetic & dynamic memory\n'
          '* Time and Space Big-O complexity\n'
          '* Debugging compiler errors or segfaults\n'
          '* Placement interview coding questions',
      sender: MessageSender.mentor,
      timestamp: DateTime.now(),
    ),
  ];

  final Map<String, String> _personas = {
    'eli5': '👶 ELI5 Master',
    'faang': '⚡ FAANG Interviewer',
    'doctor': '🩺 Bug Doctor',
  };

  void _sendMessage() async {
    final text = _messageController.text.trim();
    if (text.isEmpty || _isTyping) return;

    _messageController.clear();

    final studentMsg = ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      text: text,
      sender: MessageSender.student,
      timestamp: DateTime.now(),
    );

    setState(() {
      _messages.add(studentMsg);
      _isTyping = true;
    });

    _scrollToBottom();

    final replyText = await AiMentorService.sendMessage(
      message: text,
      persona: _selectedPersona,
    );

    if (mounted) {
      setState(() {
        _messages.add(ChatMessage(
          id: (DateTime.now().millisecondsSinceEpoch + 1).toString(),
          text: replyText,
          sender: MessageSender.mentor,
          timestamp: DateTime.now(),
        ));
        _isTyping = false;
      });
      _scrollToBottom();
    }
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: AppColors.primaryMint,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(Icons.psychology_outlined, color: AppColors.primary, size: 20),
            ),
            const SizedBox(width: 10),
            const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'AI Engineering Mentor',
                  style: TextStyle(color: AppColors.textDark, fontSize: 15, fontWeight: FontWeight.bold),
                ),
                Text(
                  'Online 24/7 • Socratic Guidance',
                  style: TextStyle(color: AppColors.success, fontSize: 11, fontWeight: FontWeight.w600),
                ),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          // Persona Switcher Bar
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              children: _personas.entries.map((entry) {
                final isSelected = _selectedPersona == entry.key;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: FilterChip(
                    label: Text(entry.value),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _selectedPersona = entry.key),
                    selectedColor: AppColors.primaryMint,
                    backgroundColor: AppColors.background,
                    labelStyle: TextStyle(
                      fontSize: 11,
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      color: isSelected ? AppColors.primaryDark : AppColors.textSecondary,
                    ),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    side: BorderSide(color: isSelected ? AppColors.primary : AppColors.border),
                  ),
                );
              }).toList(),
            ),
          ),

          // Message List
          Expanded(
            child: ListView.builder(
              controller: _scrollController,
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, idx) {
                final msg = _messages[idx];
                final isMentor = msg.sender == MessageSender.mentor;

                return Align(
                  alignment: isMentor ? Alignment.centerLeft : Alignment.centerRight,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.85),
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isMentor ? Colors.white : AppColors.primary,
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(20),
                        topRight: const Radius.circular(20),
                        bottomLeft: Radius.circular(isMentor ? 4 : 20),
                        bottomRight: Radius.circular(isMentor ? 20 : 4),
                      ),
                      border: isMentor ? Border.all(color: AppColors.border) : null,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.02),
                          blurRadius: 8,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: MarkdownBody(
                      data: msg.text,
                      selectable: true,
                      styleSheet: MarkdownStyleSheet(
                        p: TextStyle(
                          color: isMentor ? AppColors.textDark : Colors.white,
                          fontSize: 13,
                          height: 1.5,
                        ),
                        code: TextStyle(
                          backgroundColor: isMentor ? AppColors.background : Colors.black26,
                          fontFamily: 'monospace',
                          fontSize: 11,
                          color: isMentor ? Colors.purple.shade900 : Colors.white,
                        ),
                        codeblockDecoration: BoxDecoration(
                          color: const Color(0xFF0F172A),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        codeblockPadding: const EdgeInsets.all(12),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          if (_isTyping) ...[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
              child: Row(
                children: [
                  const SizedBox(
                    width: 14,
                    height: 14,
                    child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.primary),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Mentor is formulating response...',
                    style: TextStyle(fontSize: 11, color: AppColors.textMuted, fontStyle: FontStyle.italic),
                  ),
                ],
              ),
            ),
          ],

          // Input field
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: AppColors.border)),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    onSubmitted: (_) => _sendMessage(),
                    decoration: InputDecoration(
                      hintText: 'Ask a doubt or paste code...',
                      hintStyle: const TextStyle(fontSize: 13, color: AppColors.textMuted),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                        borderSide: const BorderSide(color: AppColors.border),
                      ),
                      filled: true,
                      fillColor: AppColors.background,
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: _sendMessage,
                  icon: const Icon(Icons.send_rounded, color: AppColors.primary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
