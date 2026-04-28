import { MapPin, Sparkles, Tag } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PERSONALIZE_COUNTRIES } from '@/constants/personalize-countries';
import { PERSONALIZE_TOPIC_TAGS } from '@/constants/personalize-topics';
import { feedCategories } from '@/data/feed';
import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';
import type { NewsPreferences } from '@/types/preferences';

import { CategoryChipGrid } from './category-chip-grid';
import { CustomTopicRow } from './custom-topic-row';
import { FeedPreviewPanel } from './feed-preview-panel';
import { GeographyFields } from './geography-fields';
import { PersonalizeFooter } from './personalize-footer';
import { PersonalizeHeader } from './personalize-header';
import { SectionHeading } from './section-heading';
import { TopicChipGrid } from './topic-chip-grid';

type PersonalizeSheetProps = {
  visible: boolean;
  preferences: NewsPreferences;
  onClose: () => void;
  onSave: (next: NewsPreferences) => void;
};

export function PersonalizeSheet({ visible, preferences, onClose, onSave }: PersonalizeSheetProps) {
  const insets = useSafeAreaInsets();
  const [draftCats, setDraftCats] = useState<Set<string>>(() => new Set(feedCategories));
  const [draftTopics, setDraftTopics] = useState<Set<string>>(new Set());
  const [draftCountry, setDraftCountry] = useState('');
  const [cityHint, setCityHint] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [countryMenuOpen, setCountryMenuOpen] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const cats =
      preferences.enabledCategories.length > 0
        ? new Set(preferences.enabledCategories)
        : new Set(feedCategories);
    setDraftCats(cats);
    setDraftTopics(new Set(preferences.topicTags));
    setDraftCountry(preferences.countryCode);
    setCityHint(preferences.cityHint);
    setCustomInput('');
    setCountryMenuOpen(false);
  }, [visible, preferences]);

  const toggleCat = (label: string) => {
    setDraftCats((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        if (next.size <= 1) return prev;
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const toggleTopic = (label: string) => {
    setDraftTopics((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const addCustomTopic = () => {
    const t = customInput.trim();
    if (!t) return;
    setDraftTopics((prev) => new Set(prev).add(t));
    setCustomInput('');
  };

  const previewCategory = useMemo(
    () => feedCategories.find((c) => draftCats.has(c)) ?? '',
    [draftCats]
  );

  const countryLabel =
    PERSONALIZE_COUNTRIES.find((o) => o.value === draftCountry)?.label ?? 'Any country';

  const handleSave = () => {
    if (draftCats.size === 0) {
      Alert.alert('Pick categories', 'Choose at least one category.');
      return;
    }
    const ordered = feedCategories.filter((c) => draftCats.has(c));
    onSave({
      enabledCategories: ordered,
      topicTags: Array.from(draftTopics),
      countryCode: draftCountry,
      cityHint: cityHint.trim(),
    });
  };

  return (
    <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.overlay}>
          <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="Dismiss" />
          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            <PersonalizeHeader onClose={onClose} />

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View style={styles.section}>
                <SectionHeading icon={<Tag size={12} color="#9498A2" strokeWidth={1.5} />} title="Categories" />
                <CategoryChipGrid categories={feedCategories} selected={draftCats} onToggle={toggleCat} />
              </View>

              <View style={styles.section}>
                <SectionHeading
                  icon={<Sparkles size={12} color="#9498A2" strokeWidth={1.5} />}
                  title="Hobbies, work & topics"
                />
                <TopicChipGrid topics={PERSONALIZE_TOPIC_TAGS} selected={draftTopics} onToggle={toggleTopic} />
                <CustomTopicRow
                  value={customInput}
                  onChangeText={setCustomInput}
                  onAdd={addCustomTopic}
                />
              </View>

              <View style={styles.section}>
                <SectionHeading icon={<MapPin size={12} color="#9498A2" strokeWidth={1.5} />} title="Geography" />
                <GeographyFields
                  countries={PERSONALIZE_COUNTRIES}
                  countryLabel={countryLabel}
                  countryMenuOpen={countryMenuOpen}
                  onToggleCountryMenu={() => setCountryMenuOpen((o) => !o)}
                  onSelectCountry={(value) => {
                    setDraftCountry(value);
                    setCountryMenuOpen(false);
                  }}
                  cityHint={cityHint}
                  onCityHintChange={setCityHint}
                />
              </View>

              <FeedPreviewPanel
                visible={visible}
                previewCategory={previewCategory}
                countryCode={draftCountry}
              />
            </ScrollView>

            <PersonalizeFooter onSkip={onClose} onSave={handleSave} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
