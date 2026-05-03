/** Single-row height (mobile header, or desktop header single row). */
export const APP_HEADER_INNER_HEIGHT = 56;

/** Stacked desktop header: brand row + horizontal nav row when width is tablet–desktop but < APP_HEADER_BREAKPOINT. */
export const APP_HEADER_INNER_HEIGHT_COMPACT = 92;

/**
 * At or above this width, `AppChromeHeader` shows desktop chrome (top tab strip). Below: mobile row only.
 */
export const HEADER_TABLET_MIN = 768;

/** Below this width, `AppChromeHeader` uses the compact two-row desktop layout (only when width >= HEADER_TABLET_MIN). */
export const APP_HEADER_BREAKPOINT = 900;

/** Max width for main page content and chrome (`AppChromeHeader`) on large viewports. */
export const PAGE_MAX_WIDTH = 1240;

/** Gap between cards in feed grids (`feeds.styles` grid). */
export const FEED_GRID_GAP = 12;

/**
 * Horizontal inset subtracted for column math (tab scroll / feed container padding 8+8).
 */
export const FEED_GRID_PAGE_INSET_X = 16;

/** @deprecated Use APP_HEADER_INNER_HEIGHT */
export const AUTH_HEADER_INNER_HEIGHT = APP_HEADER_INNER_HEIGHT;

export const AUTH_SCREEN_CONTENT_EXTRA_TOP = 20;
