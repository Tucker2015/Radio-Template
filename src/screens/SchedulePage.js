import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';

const ScheduleScreen = () => (
  <SafeAreaView style={styles.flexContainer}>
    <Text style={styles.text}>Peoples City Radio Schedule</Text>
    <Image
      source={{uri: 'https://ktinternet.net/pcr_schedule.png'}}
      style={[styles.image]}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  flexContainer: {
    backgroundColor: '#EAEAEC',
    flex: 1,
  },
  text: {
    color: '#000',
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
    fontWeight: '500',
    shadowColor: '#334',
    shadowOffset: {height: 2, width: 2},
    shadowOpacity: 0.5,
    fontFamily: "Khand-SemiBold"
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    margin: 20,
    resizeMode: 'contain',
  },
});

export default ScheduleScreen;
