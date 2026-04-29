import { AlertTriangle, ArrowRight, Bot, Sparkles } from 'lucide-react-native';
import { Alert, Pressable, Text, View } from 'react-native';

import { articleStyles as styles } from '@/stylesheet/article.styles';

const GOLD = '#E8C547';

const PROMPTS = [
  'Summarize this in one sentence.',
  "What's missing from the story?",
  'Who are the named sources?',
  'How could I verify this?',
] as const;

export function AskAiArticleCard() {
  const onSignIn = () => {
    Alert.alert('Sign in', 'Authentication will unlock AI chat for this article.');
  };

  const onChip = () => {
    Alert.alert('Ask the AI', 'Sign in to send prompts about this article.');
  };

  return (
    <View style={styles.askAiCard}>
      <View style={styles.askAiHeader}>
        <Bot size={14} color={GOLD} strokeWidth={1.75} />
        <Text style={styles.askAiHeaderTitle} numberOfLines={2}>
          Ask AI about this article
        </Text>
        <Sparkles size={12} color={GOLD} strokeWidth={1.75} />
        <Text style={styles.askAiBeta}>Beta</Text>
      </View>

      <View style={styles.askAiInner}>
        <Text style={styles.askAiPrompt}>
          The AI only has access to this article — it won&apos;t make up facts. Try:
        </Text>

        <View style={styles.askAiChipGrid}>
          {PROMPTS.map((label) => (
            <Pressable
              key={label}
              onPress={onChip}
              style={({ pressed }) => [styles.askAiChip, pressed && styles.askAiChipPressed]}>
              <Text style={styles.askAiChipText}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={onSignIn}
          style={({ pressed }) => [styles.askAiSignInBox, pressed && styles.askAiSignInPressed]}
          accessibilityRole="button"
          accessibilityLabel="Sign in to ask the AI">
          <ArrowRight size={16} color="#F0F2F5" strokeWidth={1.75} />
          <Text style={styles.askAiSignInText}>Sign in to ask the AI</Text>
        </Pressable>

        <View style={styles.askAiWarningRow}>
          <AlertTriangle size={12} color="#757575" strokeWidth={1.5} />
          <Text style={styles.askAiWarningText}>AI can be wrong. Cross-check before sharing.</Text>
        </View>
      </View>
    </View>
  );
}
