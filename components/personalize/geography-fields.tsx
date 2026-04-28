import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import type { CountryOption } from '@/constants/personalize-countries';
import { personalizeStyles as styles } from '@/stylesheet/personalize.styles';

type GeographyFieldsProps = {
  countries: readonly CountryOption[];
  countryLabel: string;
  countryMenuOpen: boolean;
  onToggleCountryMenu: () => void;
  onSelectCountry: (value: string) => void;
  cityHint: string;
  onCityHintChange: (text: string) => void;
};

export function GeographyFields({
  countries,
  countryLabel,
  countryMenuOpen,
  onToggleCountryMenu,
  onSelectCountry,
  cityHint,
  onCityHintChange,
}: GeographyFieldsProps) {
  return (
    <View style={styles.geoRow}>
      <Pressable style={styles.geoSelect} onPress={onToggleCountryMenu}>
        <Text style={styles.geoSelectText}>{countryLabel}</Text>
      </Pressable>
      {countryMenuOpen ? (
        <View style={styles.countryMenu}>
          <ScrollView nestedScrollEnabled>
            {countries.map((o) => (
              <Pressable
                key={o.value || 'any'}
                onPress={() => onSelectCountry(o.value)}
                style={styles.countryMenuItem}>
                <Text style={styles.countryMenuItemText}>{o.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}
      <TextInput
        value={cityHint}
        onChangeText={onCityHintChange}
        placeholder="City or region (optional)"
        placeholderTextColor="#9498A2"
        style={styles.cityInput}
      />
    </View>
  );
}
