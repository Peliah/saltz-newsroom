import {
  Check,
  MessageCircle,
  Shield,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { articleStyles as styles } from '@/stylesheet/article.styles';

const RED = '#EE343B';
const GREEN = '#4ADE80';
const GOLD = '#E8C547';
const PLACEHOLDER = '#757575';

type MockComment = {
  id: string;
  username: string;
  verified: boolean;
  credential: string;
  postedAt: string;
  body: string;
  realVotes: number;
  fakeVotes: number;
};

const AGGREGATE_REAL_PCT = 68;
const AGGREGATE_FAKE_PCT = 32;
const TOTAL_VOTES = 60;

const MOCK_COMMENTS: MockComment[] = [
  {
    id: '1',
    username: 'Maya R.',
    verified: true,
    credential: 'REPORTER · THE STANDARD',
    postedAt: '4 days ago',
    body:
      'I spoke with two former colleagues who confirmed the timeline matches HR filings from that studio. Still waiting on an on-record quote.',
    realVotes: 42,
    fakeVotes: 12,
  },
  {
    id: '2',
    username: 'alex_99',
    verified: false,
    credential: '',
    postedAt: '3 days ago',
    body:
      'The headline overstates it—the piece mixes rumour from forums with one named source. Worth comparing with the original outlet.',
    realVotes: 18,
    fakeVotes: 31,
  },
  {
    id: '3',
    username: 'Dr. K. Patel',
    verified: true,
    credential: 'PHD · PUBLIC HEALTH',
    postedAt: '2 days ago',
    body:
      'From a governance lens, leadership churn alone doesn’t prove failure; we’d need milestone slips or budget signals to infer impact.',
    realVotes: 55,
    fakeVotes: 5,
  },
];

function MiniSentimentBar({ realVotes, fakeVotes }: { realVotes: number; fakeVotes: number }) {
  const total = realVotes + fakeVotes;
  const realFlex = total === 0 ? 1 : realVotes;
  const fakeFlex = total === 0 ? 1 : fakeVotes;
  return (
    <View style={styles.communityMiniBar}>
      <View style={[styles.communityMiniGreen, { flex: realFlex }]} />
      <View style={[styles.communityMiniRed, { flex: fakeFlex }]} />
    </View>
  );
}

export function CommunityCheckCard() {
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [verifiedExpert, setVerifiedExpert] = useState(false);

  const onPost = useCallback(() => {
    Alert.alert(
      'Mock UI',
      'Comments are not persisted yet. Hook this form to your backend when ready.'
    );
  }, []);

  const onVote = useCallback(() => {
    Alert.alert('Mock UI', 'Voting will be wired to persistence and moderation later.');
  }, []);

  const commentCount = MOCK_COMMENTS.length;

  return (
    <View style={styles.communityCard}>
      <View style={styles.communityHeader}>
        <View style={styles.communityHeaderLeft}>
          <MessageCircle size={14} color={RED} strokeWidth={1.75} />
          <View style={styles.communityTitleCluster}>
            <Text style={styles.communityTitleMain}>Community check</Text>
            <Text style={styles.communityTitleCount}>
              {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
            </Text>
          </View>
        </View>
        <View style={styles.communityStatusBadge}>
          <Check size={11} color={GREEN} strokeWidth={2.5} />
          <Text style={styles.communityStatusBadgeText}>
            Likely real · {TOTAL_VOTES} votes
          </Text>
        </View>
      </View>

      <View style={styles.communityBody}>
        <View style={styles.communityAggregateBlock}>
          <View style={styles.communityAggregateBar}>
            <View style={[styles.communityAggregateGreen, { flex: AGGREGATE_REAL_PCT }]} />
            <View style={[styles.communityAggregateRed, { flex: AGGREGATE_FAKE_PCT }]} />
          </View>
          <View style={styles.communitySentimentLabels}>
            <Text style={styles.sentimentReal}>{AGGREGATE_REAL_PCT}% real</Text>
            <Text style={styles.sentimentFake}>{AGGREGATE_FAKE_PCT}% fake</Text>
          </View>
        </View>

        <View style={styles.communityComposer}>
          <TextInput
            style={styles.communityInput}
            placeholder="Your name"
            placeholderTextColor={PLACEHOLDER}
            value={name}
            onChangeText={setName}
            autoCorrect={false}
          />
          <TextInput
            style={styles.communityTextArea}
            placeholder="Add context, sources, or a fact-check…"
            placeholderTextColor={PLACEHOLDER}
            value={context}
            onChangeText={setContext}
            multiline
            textAlignVertical="top"
          />

          <Pressable
            style={styles.communityCheckboxRow}
            onPress={() => setVerifiedExpert((v) => !v)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: verifiedExpert }}>
            <View style={[styles.communityCheckboxBox, verifiedExpert && styles.communityCheckboxBoxOn]}>
              {verifiedExpert ? <Check size={12} color="#FCFCFC" strokeWidth={2.5} /> : null}
            </View>
            <Text style={styles.communityCheckboxLabel}>I&apos;m a verified reporter / expert</Text>
          </Pressable>

          <View style={styles.communityPostRow}>
            <Pressable
              onPress={onPost}
              style={({ pressed }) => [
                styles.communityPostBtn,
                pressed && styles.communityPostBtnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Post comment">
              <Text style={styles.communityPostBtnText}>Post comment</Text>
            </Pressable>
          </View>

          <Text style={styles.communityMockDisclaimer}>
            Mock UI — verification, abuse-handling and persistence are described in docs/comments-fact-check.md.
          </Text>
        </View>

        {MOCK_COMMENTS.map((c, index) => (
          <View
            key={c.id}
            style={[styles.communityComment, index > 0 && styles.communityCommentDivider]}>
            <View style={styles.communityCommentMeta}>
              <View style={styles.communityCommentMetaLeft}>
                <Text style={styles.communityUsername}>{c.username}</Text>
                {c.verified ? (
                  <View style={styles.communityVerifiedBadge}>
                    <Shield size={10} color={GOLD} strokeWidth={1.75} />
                    <Text style={styles.communityVerifiedText}>Verified</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.communityTimestamp}>{c.postedAt}</Text>
            </View>
            {c.credential.length > 0 ? (
              <Text style={styles.communityCredential}>{c.credential}</Text>
            ) : null}
            <Text style={styles.communityCommentBody}>{c.body}</Text>

            <View style={styles.communityVoteRow}>
              <Pressable
                onPress={onVote}
                style={({ pressed }) => [styles.communityVoteBtn, pressed && styles.communityVoteBtnPressed]}>
                <ThumbsUp size={12} color={GREEN} strokeWidth={1.75} />
                <Text style={styles.communityVoteBtnText}>Real · {c.realVotes}</Text>
              </Pressable>
              <Pressable
                onPress={onVote}
                style={({ pressed }) => [styles.communityVoteBtn, pressed && styles.communityVoteBtnPressed]}>
                <ThumbsDown size={12} color="#FF4D4D" strokeWidth={1.75} />
                <Text style={[styles.communityVoteBtnText, styles.communityVoteBtnTextFake]}>
                  Fake · {c.fakeVotes}
                </Text>
              </Pressable>
              <View style={styles.communityMiniBarWrap}>
                <MiniSentimentBar realVotes={c.realVotes} fakeVotes={c.fakeVotes} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
