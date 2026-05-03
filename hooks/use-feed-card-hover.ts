import { useCallback, useState } from 'react';

/**
 * Pointer hover for feed cards. macOS uses a Reanimated stub — keep this hook state-only.
 */
export function useFeedCardHover() {
  const [hovered, setHovered] = useState(false);

  const onHoverIn = useCallback(() => {
    setHovered(true);
  }, []);

  const onHoverOut = useCallback(() => {
    setHovered(false);
  }, []);

  return { hovered, onHoverIn, onHoverOut };
}
