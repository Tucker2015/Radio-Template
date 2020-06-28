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

const FacebookScreen = () => {
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
      
      <SafeAreaView style={screenTabButtons.flexContainer}>
        <WebView
          source={{ uri: 'https://www.facebook.com/groups/943819795648674/' }}
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

  export default FacebookScreen;