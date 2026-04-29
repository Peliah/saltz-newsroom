import { ChevronDown, ChevronUp, Clock3, Sparkles } from 'lucide-react-native';
import { useCallback, useMemo, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

import { articleStyles as styles } from '@/stylesheet/article.styles';

const ACCENT_GOLD = '#E8C547';

type AiBriefCardProps = {
  articleTitle: string;
  articleDescription: string;
  source: string;
};

function tldrParagraph(title: string, description: string): string {
  const d = description.trim();
  if (d.length > 0 && d.length <= 360) return d;
  if (d.length > 360) return `${d.slice(0, 357).trimEnd()}…`;
  return `${title} — key details are still emerging from primary sources.`;
}

function bulletPoints(description: string): [string, string, string] {
  const sentences = description
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);
  if (sentences.length >= 3) {
    return [sentences[0]!, sentences[1]!, sentences[2]!];
  }
  const pad = [
    'Corroborating outlets and official statements will clarify facts over the next news cycle.',
    'Leadership and timeline impacts often surface through follow-up interviews and filings.',
    'Readers benefit from comparing multiple independent sources before drawing conclusions.',
  ];
  return [
    sentences[0] ?? pad[0]!,
    sentences[1] ?? pad[1]!,
    sentences[2] ?? pad[2]!,
  ];
}

function whyItMatters(title: string, source: string): string {
  return `Stories covered by ${source} such as “${title.slice(0, 72)}${title.length > 72 ? '…' : ''}” matter because leadership and production shifts can alter creative direction, schedules, and investment outcomes—often affecting large audiences and long-running franchises.`;
}

export function AiBriefCard({ articleTitle, articleDescription, source }: AiBriefCardProps) {
  const [expanded, setExpanded] = useState(true);

  const tldr = useMemo(
    () => tldrParagraph(articleTitle, articleDescription),
    [articleTitle, articleDescription]
  );
  const bullets = useMemo(() => bulletPoints(articleDescription), [articleDescription]);
  const why = useMemo(() => whyItMatters(articleTitle, source), [articleTitle, source]);

  const onRegenerate = useCallback(() => {
    Alert.alert(
      'Regenerate brief',
      'When you connect an AI backend, this will re-run summarisation on the article text.'
    );
  }, []);

  return (
    <View style={styles.aiBriefCard}>
      <Pressable
        style={[styles.aiBriefHeader, expanded && styles.aiBriefHeaderExpanded]}
        onPress={() => setExpanded((e) => !e)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={expanded ? 'Collapse AI brief' : 'Expand AI brief'}>
        <View style={styles.aiBriefHeaderLeft}>
          <Sparkles size={14} color={ACCENT_GOLD} strokeWidth={1.75} />
          <Text style={styles.aiBriefTitle}>AI Brief</Text>
        </View>
        <View style={styles.aiBriefHeaderCenter}>
          <Text style={styles.aiBriefDot}>·</Text>
          <Text style={styles.aiBriefSub}>60-second read</Text>
        </View>
        <View style={styles.aiBriefHeaderRight}>
          {expanded ? (
            <ChevronUp size={18} color="#9498A2" strokeWidth={1.75} />
          ) : (
            <ChevronDown size={18} color="#9498A2" strokeWidth={1.75} />
          )}
        </View>
      </Pressable>

      {expanded ? (
        <>
          <View style={styles.aiBriefBody}>
            <Text style={styles.aiBriefTldrLabel}>TL;DR</Text>
            <Text style={styles.aiBriefSummary}>{tldr}</Text>

            <View style={styles.aiBriefBullets}>
              {bullets.map((line, i) => (
                <View key={i} style={styles.aiBriefBulletRow}>
                  <View style={styles.aiBriefBulletSquare} />
                  <Text style={styles.aiBriefBulletText}>{line}</Text>
                </View>
              ))}
            </View>

            <View style={styles.aiBriefDivider} />

            <Text style={styles.aiBriefWhyLabel}>Why it matters</Text>
            <Text style={styles.aiBriefWhyBody}>{why}</Text>
          </View>

          <View style={styles.aiBriefFooter}>
            <View style={styles.aiBriefFooterLeft}>
              <Clock3 size={12} color="#9498A2" strokeWidth={1.5} />
              <Text style={styles.aiBriefReadTime}>~20s</Text>
            </View>
            <Pressable onPress={onRegenerate} hitSlop={8}>
              <Text style={styles.aiBriefRegenerate}>Regenerate</Text>
            </Pressable>
          </View>
          <Text style={styles.aiBriefDisclaimer}>
            AI-generated · may contain errors. Powered by Lovable AI.
          </Text>
        </>
      ) : null}
    </View>
  );
}
