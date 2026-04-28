import { Text, View } from 'react-native';

import { formatError } from '@/libs/news/errors';
import { feedsStyles as styles } from '@/stylesheet/feeds.styles';

import { CustomButton } from './custom-button';

type StateMessageProps = {
  title?: string;
  error: unknown;
  onRetry?: () => void;
};

export function StateMessage({ title = "Couldn't load stories", error, onRetry }: StateMessageProps) {
  return (
    <View style={styles.emptyStateCard}>
      <Text style={styles.emptyStateTitle}>{title}</Text>
      <Text style={styles.emptyStateDescription}>{formatError(error)}</Text>
      {onRetry ? (
        <View style={{ marginTop: 12, alignSelf: 'stretch' }}>
          <CustomButton label="Try again" onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}
