import React, { useState, useRef } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import WebView from 'react-native-webview'
import { screenTabButtons } from '../styles/screenTabButtons'
const WebScreen = () => {
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  const webviewRef = useRef(null)

  backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack()
  }

  frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward()
  }
  return (
    <>
      <StatusBar  barStyle='dark-content'/>
      <SafeAreaView style={screenTabButtons.flexContainer}>
        <WebView
          source={{ uri: 'https://peoplescityradio.co.uk' }}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color='black'
              size='large'
              style={screenTabButtons.flexContainer}
            />
          )}
          ref={webviewRef}
          onNavigationStateChange={navState => {
            setCanGoBack(navState.canGoBack)
            setCanGoForward(navState.canGoForward)
            setCurrentUrl(navState.url)
          }}
        />
        <View style={screenTabButtons.tabBarContainer}>
          <TouchableOpacity onPress={backButtonHandler}>
            <Text style={screenTabButtons.button}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={frontButtonHandler}>
            <Text style={screenTabButtons.button}>Forward</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

  export default WebScreen;