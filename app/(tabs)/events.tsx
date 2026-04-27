import { useMemo, useState } from 'react';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { CalendarClock, MapPin, SlidersHorizontal } from 'lucide-react-native';
import { Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { DateField } from '@/components/events/date-field';
import { EventsEmptyState } from '@/components/events/events-empty-state';
import { FilterChip } from '@/components/events/filter-chip';
import { AuthFooter } from '@/components/ui/auth-footer';
import { AuthHeader } from '@/components/ui/auth-header';
import { eventsStyles as styles } from '@/stylesheet/events.styles';

const CITIES = [
  'Lagos · Nigeria',
  'Abuja · Nigeria',
  'Nairobi · Kenya',
  'Cape Town · South Africa',
  'Accra · Ghana',
];
const WHEN_OPTIONS = ['Any time', 'Today', 'This week', 'This month'];
const TYPE_OPTIONS = ['All', 'Conference', 'Meetup', 'Hackathon', 'Workshop', 'Summit'];
const FILTER_OPTIONS = ['All', 'Conference', 'Meetup', 'Hackathon', 'Workshop', 'Summit'];
export default function EventsScreen() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [manualCity, setManualCity] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [selectedWhen, setSelectedWhen] = useState('Any time');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Soonest');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [pickerTarget, setPickerTarget] = useState<'from' | 'to' | null>(null);
  const [pickerValue, setPickerValue] = useState(new Date());

  const hasResults = useMemo(
    () => !(selectedFilter !== 'All' && selectedType !== 'All' && selectedFilter !== selectedType),
    [selectedFilter, selectedType]
  );

  const formatDate = (date: Date | null) =>
    date
      ? `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`
      : '';

  const openDatePicker = (target: 'from' | 'to') => {
    const initialValue = target === 'from' ? fromDate : toDate;
    setPickerValue(initialValue ?? new Date());
    setPickerTarget(target);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setPickerTarget(null);
      return;
    }

    if (!selectedDate || !pickerTarget) return;
    if (pickerTarget === 'from') setFromDate(selectedDate);
    else setToDate(selectedDate);

    if (Platform.OS !== 'ios') {
      setPickerTarget(null);
    }
  };

  return (
    <View style={styles.screen}>
      <AuthHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.introRow}>
            <CalendarClock size={14} color="#EE343B" strokeWidth={1.75} />
            <Text style={styles.introText}>Tech Events</Text>
          </View>

          <Text style={styles.title}>What&apos;s happening in Lagos</Text>
          <Text style={styles.body}>
            Upcoming tech conferences, hackathons, meetups, and events near you.
          </Text>
          <View style={styles.divider} />

          <Pressable style={styles.locationButton} onPress={() => setSelectedCity(CITIES[0])}>
            <MapPin size={12} color="#F0F2F5" strokeWidth={1.75} />
            <Text style={styles.locationButtonText}>Use my location</Text>
          </Pressable>

          <View style={styles.chipWrap}>
            {CITIES.map((city) => (
              <FilterChip
                key={city}
                label={city}
                selected={selectedCity === city}
                onPress={() => setSelectedCity(city)}
              />
            ))}
          </View>

          <View style={styles.cityRow}>
            <TextInput
              value={manualCity}
              onChangeText={setManualCity}
              placeholder="Other city..."
              placeholderTextColor="#9498A2"
              style={styles.cityInput}
            />
            <Pressable style={styles.cityPicker} onPress={() => setCountry(country === 'Nigeria' ? 'Kenya' : 'Nigeria')}>
              <Text style={styles.cityPickerText}>{country}</Text>
            </Pressable>
            <Pressable
              style={styles.goButton}
              onPress={() => {
                if (manualCity.trim()) setSelectedCity(`${manualCity.trim()} · ${country}`);
              }}>
              <Text style={styles.goButtonText}>Go</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionLabel}>When</Text>
          <View style={styles.chipWrap}>
            {WHEN_OPTIONS.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={selectedWhen === option}
                onPress={() => setSelectedWhen(option)}
              />
            ))}
          </View>

          <Text style={styles.sectionLabel}>Type</Text>
          <View style={styles.chipWrap}>
            {TYPE_OPTIONS.map((option) => (
              <FilterChip
                key={option}
                label={option}
                selected={selectedType === option}
                onPress={() => setSelectedType(option)}
              />
            ))}
          </View>

          <View style={styles.sortRow}>
            <Pressable
              style={styles.sortButton}
              onPress={() => setSortBy((current) => (current === 'Soonest' ? 'Latest' : 'Soonest'))}>
              <SlidersHorizontal size={14} color="#9498A2" strokeWidth={1.75} />
              <Text style={styles.sortLabel}>Sort</Text>
              <Text style={styles.sortValue}>{sortBy}</Text>
            </Pressable>
          </View>

          <View style={styles.filtersCard}>
            <View style={styles.filtersHeader}>
              <SlidersHorizontal size={14} color="#9498A2" strokeWidth={1.75} />
              <Text style={styles.filtersTitle}>Filters</Text>
            </View>

            <View style={styles.chipWrap}>
              {FILTER_OPTIONS.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  selected={selectedFilter === option}
                  onPress={() => setSelectedFilter(option)}
                />
              ))}
            </View>

            <View style={styles.dateRow}>
              <DateField
                value={formatDate(fromDate)}
                placeholder="From (mm/dd/yyyy)"
                onPress={() => openDatePicker('from')}
              />
              <DateField
                value={formatDate(toDate)}
                placeholder="To (mm/dd/yyyy)"
                onPress={() => openDatePicker('to')}
              />
            </View>
            {pickerTarget ? (
              <>
                {Platform.OS === 'ios' ? (
                  <View style={styles.pickerHeader}>
                    <Pressable style={styles.pickerDoneButton} onPress={() => setPickerTarget(null)}>
                      <Text style={styles.pickerDoneText}>Done</Text>
                    </Pressable>
                  </View>
                ) : null}
                <DateTimePicker
                  value={pickerValue}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                  themeVariant="dark"
                />
              </>
            ) : null}
          </View>

          {hasResults ? (
            <EventsEmptyState
              onTryAgain={() => {
                setSelectedFilter('All');
                setSelectedType('All');
                setSelectedWhen('Any time');
                setFromDate(null);
                setToDate(null);
              }}
            />
          ) : (
            <EventsEmptyState
              onTryAgain={() => {
                setSelectedFilter('All');
                setSelectedType('All');
              }}
            />
          )}

          <Text style={styles.footnote}>
            Events are surfaced from real news coverage and announcements (including mentions of
            Eventbrite, tix.africa, Lu.ma, and Meetup.com) via GNews. Always confirm dates and
            venues with the organizer before attending.
          </Text>
        </View>

        <AuthFooter />
      </ScrollView>
    </View>
  );
}
