#import "SaltzAppDependencyProvider.h"

#import <React/RCTComponentViewProtocol.h>

@implementation SaltzAppDependencyProvider

- (nonnull NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents
{
  static NSDictionary<NSString *, Class<RCTComponentViewProtocol>> *thirdPartyComponents = nil;
  static dispatch_once_t nativeComponentsToken;

  dispatch_once(&nativeComponentsToken, ^{
    NSMutableDictionary *components = [NSMutableDictionary dictionary];

    void (^add)(NSString *, NSString *) = ^(NSString *key, NSString *className) {
      Class cls = NSClassFromString(className);
      if (cls) {
        components[key] = cls;
      }
    };

    add(@"RNDateTimePicker", @"RNDateTimePickerComponentView");
    add(@"RNGestureHandlerButton", @"RNGestureHandlerButtonComponentView");
    add(@"RNCViewPager", @"RNCPagerViewComponentView");
    add(@"RNCSafeAreaProvider", @"RNCSafeAreaProviderComponentView");
    add(@"RNCSafeAreaView", @"RNCSafeAreaViewComponentView");
    add(@"RNSVGCircle", @"RNSVGCircle");
    add(@"RNSVGClipPath", @"RNSVGClipPath");
    add(@"RNSVGDefs", @"RNSVGDefs");
    add(@"RNSVGEllipse", @"RNSVGEllipse");
    add(@"RNSVGFeBlend", @"RNSVGFeBlend");
    add(@"RNSVGFeColorMatrix", @"RNSVGFeColorMatrix");
    add(@"RNSVGFeComposite", @"RNSVGFeComposite");
    add(@"RNSVGFeFlood", @"RNSVGFeFlood");
    add(@"RNSVGFeGaussianBlur", @"RNSVGFeGaussianBlur");
    add(@"RNSVGFeMerge", @"RNSVGFeMerge");
    add(@"RNSVGFeOffset", @"RNSVGFeOffset");
    add(@"RNSVGFilter", @"RNSVGFilter");
    add(@"RNSVGForeignObject", @"RNSVGForeignObject");
    add(@"RNSVGGroup", @"RNSVGGroup");
    add(@"RNSVGImage", @"RNSVGImage");
    add(@"RNSVGLine", @"RNSVGLine");
    add(@"RNSVGLinearGradient", @"RNSVGLinearGradient");
    add(@"RNSVGMarker", @"RNSVGMarker");
    add(@"RNSVGMask", @"RNSVGMask");
    add(@"RNSVGPath", @"RNSVGPath");
    add(@"RNSVGPattern", @"RNSVGPattern");
    add(@"RNSVGRadialGradient", @"RNSVGRadialGradient");
    add(@"RNSVGRect", @"RNSVGRect");
    add(@"RNSVGSvgView", @"RNSVGSvgView");
    add(@"RNSVGSymbol", @"RNSVGSymbol");
    add(@"RNSVGTSpan", @"RNSVGTSpan");
    add(@"RNSVGText", @"RNSVGText");
    add(@"RNSVGTextPath", @"RNSVGTextPath");
    add(@"RNSVGUse", @"RNSVGUse");
    add(@"RNSFullWindowOverlay", @"RNSFullWindowOverlay");
    add(@"RNSModalScreen", @"RNSModalScreen");
    add(@"RNSScreenContainer", @"RNSScreenContainerView");
    add(@"RNSScreenContentWrapper", @"RNSScreenContentWrapper");
    add(@"RNSScreenFooter", @"RNSScreenFooter");
    add(@"RNSScreen", @"RNSScreenView");
    add(@"RNSScreenNavigationContainer", @"RNSScreenNavigationContainerView");
    add(@"RNSScreenStackHeaderConfig", @"RNSScreenStackHeaderConfig");
    add(@"RNSScreenStackHeaderSubview", @"RNSScreenStackHeaderSubview");
    add(@"RNSScreenStack", @"RNSScreenStackView");
    add(@"RNSSearchBar", @"RNSSearchBar");
    add(@"RNSStackScreen", @"RNSStackScreenComponentView");
    add(@"RNSScreenStackHost", @"RNSScreenStackHostComponentView");
    add(@"RNSBottomTabsScreen", @"RNSBottomTabsScreenComponentView");
    add(@"RNSBottomTabs", @"RNSBottomTabsHostComponentView");
    add(@"RNSSplitViewHost", @"RNSSplitViewHostComponentView");
    add(@"RNSSplitViewScreen", @"RNSSplitViewScreenComponentView");

    thirdPartyComponents = [components copy];
  });

  return thirdPartyComponents;
}

@end
