#import "AppDelegate.h"

#import "SaltzAppDependencyProvider.h"
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (void)applicationDidFinishLaunching:(NSNotification *)notification
{
  self.moduleName = @"main";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  self.dependencyProvider = [SaltzAppDependencyProvider new];
  
  return [super applicationDidFinishLaunching:notification];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  // RN sets RCTPlatformName to "ios" on macOS, so Metro would get platform=ios and skip macOS shims.
  // Request platform=macos so Metro resolves react-native-macos, expo shims, and reanimated stub.
  NSURL *url =
      [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@".expo/.virtual-metro-entry"];
  NSURLComponents *components = [NSURLComponents componentsWithURL:url resolvingAgainstBaseURL:NO];
  NSMutableArray<NSURLQueryItem *> *items = [NSMutableArray array];
  for (NSURLQueryItem *item in components.queryItems) {
    if ([item.name isEqualToString:@"platform"] && [item.value isEqualToString:@"ios"]) {
      [items addObject:[NSURLQueryItem queryItemWithName:@"platform" value:@"macos"]];
    } else {
      [items addObject:item];
    }
  }
  components.queryItems = items;
  return components.URL ?: url;
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
#ifdef RN_FABRIC_ENABLED
  return true;
#else
  return false;
#endif
}

@end
