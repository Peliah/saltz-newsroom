/**
 * `expo-location` is not linked in the macOS build. Events “use my location” falls back to a message.
 */
export async function requestForegroundPermissionsAsync() {
  return { status: 'denied' as const, canAskAgain: false, granted: false, expires: 'never' as const };
}

export async function getCurrentPositionAsync(_options?: object) {
  throw new Error('Location is not available in the macOS build.');
}
