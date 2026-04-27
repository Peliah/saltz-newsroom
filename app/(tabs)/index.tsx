import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { homeStyles as styles } from '@/stylesheet/home.styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saltz Newsroom</Text>
      <Text style={styles.body}>Top stories, events, and saved reads in one place.</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Today</Text>
        <Text style={styles.body}>3 breaking stories and 2 upcoming events are waiting for you.</Text>
      </View>

      <View style={styles.actionRow}>
        <Link href="/(tabs)/search" asChild>
          <Pressable style={styles.action}>
            <Text style={styles.actionText}>Search News</Text>
          </Pressable>
        </Link>
        <Link href="/(tabs)/saved" asChild>
          <Pressable style={styles.action}>
            <Text style={styles.actionText}>Open Saved</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/(auth)/sigin-in">
        <Text style={styles.link}>Go to Sign in flow</Text>
      </Link>
    </View>
  );
}
