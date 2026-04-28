/** Geography picker — value passed to NewsAPI top-headlines `country` when not empty. */
export type CountryOption = { label: string; value: string };

export const PERSONALIZE_COUNTRIES: CountryOption[] = [
  { label: 'Any country', value: '' },
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'Nigeria', value: 'ng' },
  { label: 'Kenya', value: 'ke' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'India', value: 'in' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
];
