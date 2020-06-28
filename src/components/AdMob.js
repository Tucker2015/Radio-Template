import React, { useState } from 'react';
import {View, Platform, Modal, ScrollView} from 'react-native';
import NativeAdView, {
  CallToActionView,
  IconView,
  HeadlineView,
  TaglineView,
  AdvertiserView,
  MediaView,
  AdBadge,
  
} from 'react-native-admob-native-ads';

const NATIVE_AD_ID =
  Platform.OS === 'ios'
    ? 'ca-app-pub-1554575210508408/5250245841'
    : 'ca-app-pub-1554575210508408/1194385100';

    const App = () => {
  const [aspectRatio,setAspectRatio] = useState(1);
  const _onAdFailedToLoad = event => {
    console.log(event.nativeEvent);
  };

  const _onAdLoaded = () => {
    console.log('Ad has loaded');
  };

  return (
      <>
        <View
          style={{
            flex: 1,
          }}
        >
          <NativeAdView
           onAdLoaded={_onAdLoaded}
           onAdFailedToLoad={_onAdFailedToLoad}
           onUnifiedNativeAdLoaded={event => {
             setAspectRatio(event.aspectRatio);
           }}
            style={{
              width: "95%",
              alignSelf: "center",
              height: 50,
            }}
            adUnitID={NATIVE_AD_ID} // TEST adUnitID
          >
            <View
              style={{
                height: 50,
                width: "100%",
                backgroundColor: "white",
              }}
            >
              <AdBadge />
              <View
                style={{
                  height: 50,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <IconView
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <View
                  style={{
                    width: "65%",
                    maxWidth: "65%",
                    paddingHorizontal: 6,
                  }}
                >
                  <HeadlineView
                    style={{
                      fontWeight: "bold",
                      fontSize: 13,
                    }}
                  />
                  <TaglineView
                    numberOfLines={1}
                    style={{
                      fontSize: 11,
                    }}
                  />
                  <AdvertiserView
                    style={{
                      fontSize: 10,
                      color: "gray",
                    }}
                  />
                </View>
    
                <CallToActionView
                  style={{
                    height: 25,
                    paddingHorizontal: 12,
                    backgroundColor: "purple",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    elevation: 10,
                  }}
                  textStyle={{ color: "white", fontSize: 10 }}
                />
              </View>
            </View>
          </NativeAdView>
        </View>
      </>
    );
            };

export default App;