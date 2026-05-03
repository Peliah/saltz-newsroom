import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { ArrowLeft, Bookmark, BookOpen, Clock3, Share2 } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, Share, Text, View } from 'react-native';

import { AiBriefCard } from '@/components/article/ai-brief-card';
import { AskAiArticleCard } from '@/components/article/ask-ai-article-card';
import { CommunityCheckCard } from '@/components/article/community-check-card';
import { SupportingEvidenceCard } from '@/components/article/supporting-evidence-card';
import { ArticleNavHeader } from '@/components/ui/article-nav-header';
import { PageMaxWidth } from '@/components/ui/page-max-width';
import { useSavedArticles } from '@/context/saved-articles-context';
import { parseArticlePayload } from '@/libs/article-route';
import { formatPublishedLine, formatRelativeAboutLine } from '@/libs/format-article-meta';
import { articleStyles as styles } from '@/stylesheet/article.styles';
import { pageWidthStyles } from '@/stylesheet/page.styles';

export default function ArticleDetailsScreen() {
  const params = useLocalSearchParams<{ id: string; payload?: string }>();
  const item = parseArticlePayload(params.payload);
  const { isSaved, toggleSaved } = useSavedArticles();

  const articleUrl = item?.articleUrl ?? '';
  const canOpenLink = articleUrl.length > 0;

  const openInBrowser = async () => {
    if (!canOpenLink) {
      Alert.alert('No article link', 'This article does not include a source URL.');
      return;
    }
    await WebBrowser.openBrowserAsync(articleUrl);
  };

  const shareLink = async () => {
    if (!canOpenLink) {
      Alert.alert('No article link', 'This article does not include a source URL.');
      return;
    }
    await Share.share({
      url: articleUrl,
      message: articleUrl,
    });
  };

  if (!item) {
    return (
      <View style={styles.screen}>
        <ArticleNavHeader />
        <View style={styles.backToolbar}>
          <Pressable style={styles.backRow} onPress={() => router.back()} accessibilityRole="button">
            <ArrowLeft size={16} color="#9498A2" />
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>Article unavailable</Text>
          <Text style={styles.description}>
            The article details could not be loaded. Please go back and open it again.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ArticleNavHeader />
      <View style={styles.backToolbar}>
        <Pressable style={styles.backRow} onPress={() => router.back()} accessibilityRole="button">
          <ArrowLeft size={16} color="#9498A2" />
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, pageWidthStyles.scrollContentCentered]}>
        <PageMaxWidth>
        <View style={styles.heroTextBlock}>
          <View style={styles.metaTop}>
            <View style={styles.sourceBadge}>
              <Text style={styles.sourceBadgeText}>{item.source.toUpperCase()}</Text>
            </View>
            <View style={styles.metaTime}>
              <Clock3 size={12} color="#9498A2" strokeWidth={1.5} />
              <Text style={styles.metaTimeText}>{formatRelativeAboutLine(item.publishedAgo)}</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>{item.title}</Text>
          <Text style={styles.heroSubhead}>{item.description}</Text>

          <View style={styles.publishedRow}>
            <Text style={styles.publishedText}>
              {formatPublishedLine(item.publishedAtIso) || 'PUBLISHED DATE UNAVAILABLE'}
            </Text>
          </View>
        </View>

        <Image source={{ uri: item.imageUrl }} style={styles.heroImage} contentFit="cover" />

        <View style={styles.body}>
          <AiBriefCard
            articleTitle={item.title}
            articleDescription={item.description}
            source={item.source}
          />

          <Text style={styles.articleBody}>
            {item.description} The newsroom is still waiting on more official production updates, but the
            sequence of exits in a short period has increased concern around creative continuity and
            development momentum.
          </Text>

          <View style={styles.actions}>
            <Pressable
              onPress={() => void openInBrowser()}
              style={[styles.actionBtn, styles.primaryBtn, !canOpenLink && styles.disabled]}>
              <BookOpen size={12} color="#FCFCFC" strokeWidth={1.75} />
              <Text style={[styles.actionText, styles.primaryText]}>Read full article</Text>
            </Pressable>

            <Pressable onPress={() => void toggleSaved(item)} style={styles.actionBtn}>
              <Bookmark size={12} color="#F0F2F5" strokeWidth={1.75} />
              <Text style={styles.actionText}>{isSaved(item.id) ? 'Saved' : 'Save'}</Text>
            </Pressable>

            <Pressable
              onPress={() => void shareLink()}
              style={[styles.actionBtn, !canOpenLink && styles.disabled]}>
              <Share2 size={12} color="#F0F2F5" strokeWidth={1.75} />
              <Text style={styles.actionText}>Share</Text>
            </Pressable>
          </View>

          <Text style={styles.sourceLink}>Source: {item.source}</Text>

          <AskAiArticleCard />

          <SupportingEvidenceCard itemCount={0} />

          <CommunityCheckCard />
        </View>
        </PageMaxWidth>
      </ScrollView>
    </View>
  );
}
