import { useMemo } from 'react';

import {
  FEED_GRID_GAP,
  FEED_GRID_PAGE_INSET_X,
  HEADER_TABLET_MIN,
  PAGE_MAX_WIDTH,
} from '@/constants/layout';
import { useResponsiveWidth } from '@/context/responsive-layout-context';

/**
 * Pixel width for feed cards so rows align with `FEED_GRID_GAP` and page max width.
 * ≥768px: 3 columns; narrower: 2 columns (same pattern as header breakpoint).
 */
export function useFeedGridCardWidth() {
  const windowWidth = useResponsiveWidth();

  return useMemo(() => {
    const contentW = Math.min(windowWidth, PAGE_MAX_WIDTH);
    const inner = contentW - FEED_GRID_PAGE_INSET_X;
    const cols = windowWidth >= HEADER_TABLET_MIN ? 3 : 2;
    const raw = (inner - FEED_GRID_GAP * (cols - 1)) / cols;
    const cardWidth = Math.max(100, Math.floor(raw));
    return { cardWidth, columnCount: cols };
  }, [windowWidth]);
}
