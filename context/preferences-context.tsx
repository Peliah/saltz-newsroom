import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { PersonalizeSheet } from '@/components/personalize/personalize-sheet';
import { feedCategories } from '@/data/feed';
import type { NewsPreferences } from '@/types/preferences';

function defaultPreferences(): NewsPreferences {
  return {
    enabledCategories: [...feedCategories],
    topicTags: [],
    countryCode: '',
    cityHint: '',
  };
}

type PreferencesContextValue = {
  preferences: NewsPreferences;
  openPersonalize: () => void;
  closePersonalize: () => void;
  personalizeVisible: boolean;
  savePreferences: (next: NewsPreferences) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<NewsPreferences>(defaultPreferences);
  const [personalizeVisible, setPersonalizeVisible] = useState(false);

  const openPersonalize = useCallback(() => setPersonalizeVisible(true), []);
  const closePersonalize = useCallback(() => setPersonalizeVisible(false), []);

  const savePreferences = useCallback((next: NewsPreferences) => {
    setPreferences(next);
    setPersonalizeVisible(false);
  }, []);

  const value = useMemo(
    () => ({
      preferences,
      openPersonalize,
      closePersonalize,
      personalizeVisible,
      savePreferences,
    }),
    [preferences, openPersonalize, closePersonalize, personalizeVisible, savePreferences]
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
      <PersonalizeSheet
        visible={personalizeVisible}
        preferences={preferences}
        onClose={closePersonalize}
        onSave={savePreferences}
      />
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
}
