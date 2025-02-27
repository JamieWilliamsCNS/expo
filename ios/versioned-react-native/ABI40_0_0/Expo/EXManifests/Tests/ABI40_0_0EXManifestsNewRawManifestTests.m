//  Copyright (c) 2020 650 Industries, Inc. All rights reserved.

#import <XCTest/XCTest.h>

#import <ABI40_0_0EXManifests/ABI40_0_0EXManifestsNewRawManifest.h>

@interface ABI40_0_0EXManifestsNewRawManifestTests : XCTestCase

@end

@implementation ABI40_0_0EXManifestsNewRawManifestTests

- (void)testSDKVersion_ValidCases {
  NSString *runtimeVersion = @"exposdk:39.0.0";
  NSDictionary *manifestJson = @{
    @"runtimeVersion": runtimeVersion
  };
  ABI40_0_0EXManifestsNewRawManifest *manifest = [[ABI40_0_0EXManifestsNewRawManifest alloc] initWithRawManifestJSON:manifestJson];
  XCTAssert([manifest.sdkVersion isEqualToString:@"39.0.0"], @"%@", manifest.sdkVersion);
}

- (void)testSDKVersion_NotSDKRuntimeVersionCases {
  NSArray *runtimeVersions = @[
    @"exposdk:123",
    @"exposdkd:39.0.0",
    @"exposdk:hello",
    @"bexposdk:39.0.0",
    @"exposdk:39.0.0-beta.0",
    @"exposdk:39.0.0-alpha.256"
  ];

  [runtimeVersions enumerateObjectsUsingBlock:^(NSString *  _Nonnull runtimeVersion, NSUInteger idx, BOOL * _Nonnull stop) {
    NSDictionary *manifestJson = @{
      @"runtimeVersion": runtimeVersion
    };
    ABI40_0_0EXManifestsNewRawManifest *manifest = [[ABI40_0_0EXManifestsNewRawManifest alloc] initWithRawManifestJSON:manifestJson];
    XCTAssert(manifest.sdkVersion == nil, @"%@", manifest.sdkVersion);
  }];
}

@end
