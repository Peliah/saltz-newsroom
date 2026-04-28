/** Saved “personalize” choices for the feed (session defaults; extend with persistence later). */
export type NewsPreferences = {
  /** Tab labels from `feedCategories`; empty means “all tabs”. */
  enabledCategories: string[];
  topicTags: string[];
  /** ISO-ish country code for NewsAPI `country` when set; empty = app default (e.g. us). */
  countryCode: string;
  cityHint: string;
};
