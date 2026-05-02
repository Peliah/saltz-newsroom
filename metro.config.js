const path = require('node:path');

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Expo defaults to platforms: ['ios', 'android']. macOS must be listed or Metro + our shims mis-resolve.
const platforms = config.resolver.platforms ?? ['ios', 'android'];
if (!platforms.includes('macos')) {
  config.resolver.platforms = [...platforms, 'macos'];
}
config.resolver.unstable_conditionsByPlatform = {
  ...config.resolver.unstable_conditionsByPlatform,
  macos: ['react-native'],
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (platform === 'macos') {
    if (moduleName === 'react-native-reanimated') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'shims/reanimated-macos.tsx'),
      };
    }
    if (moduleName === 'expo-image') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'shims/expo-image-macos.tsx'),
      };
    }
    if (moduleName === 'expo-location') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'shims/expo-location-macos.ts'),
      };
    }
    if (moduleName === 'expo-symbols') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'shims/expo-symbols-macos.tsx'),
      };
    }
    if (moduleName === 'lucide-react-native') {
      return {
        type: 'sourceFile',
        filePath: path.resolve(__dirname, 'shims/lucide-react-native-macos.tsx'),
      };
    }
  }
  if (
    platform === 'macos' &&
    (moduleName === 'react-native' || moduleName.startsWith('react-native/'))
  ) {
    const newModuleName = moduleName.replace('react-native', 'react-native-macos');
    return context.resolveRequest(context, newModuleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

const originalGetModulesRunBeforeMainModule = config.serializer.getModulesRunBeforeMainModule;
config.serializer.getModulesRunBeforeMainModule = () => {
  try {
    return [
      require.resolve('react-native/Libraries/Core/InitializeCore'),
      require.resolve('react-native-macos/Libraries/Core/InitializeCore'),
    ];
  } catch {}
  return originalGetModulesRunBeforeMainModule();
};

module.exports = config;