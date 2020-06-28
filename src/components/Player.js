import React, {useState} from 'react';
import PropTypes from 'prop-types';
//import TrackPlayer, {
//  useTrackPlayerProgress,
//  usePlaybackState,
//} from 'react-native-track-player';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function ProgressBar() {
  const progress = useTrackPlayerProgress();

  return (
    <View style={styles.progress}>
    </View>
  );
}

function ControlButton({onPress}) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Icon
        name="play-circle"
        size={100}
        color="#FFF"
        alignItems="center"
        style={[styles.playButton, {marginLeft: 0}]}
      />
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default function Player(props) {
  const playbackState = usePlaybackState();

  const {
    style,
    onNext,
    onPrevious,
    onTogglePlayback,
    albumCover,
    trackName,
    artistName,
  } = props;

  var middleButtonText = 'Play';

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonText = 'Pause';
  }

  return (
    <View style={[styles.card, style]}>
      <Image
        source={
          albumCover === ''
            ? require('../assets/main_logo.jpg')
            : {uri: albumCover}
        }
        resizeMode="contain"
        style={styles.logo}
      />
      <ProgressBar />
      <Text adjustsFontSizeToFit
              numberOfLines={2} style={styles.title }>{trackName}</Text>
      <Text style={styles.artist}>{artistName}</Text>
      <View style={styles.controls}>
        <ControlButton title={middleButtonText} onPress={onTogglePlayback} />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired,
};

Player.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 10,
    backgroundColor: 'grey',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  logo: {
    width: 300,
    height: 300,
    
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 24,
  },
  artist: {
    color: "#fff",
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  controls: {
    marginVertical: 20,
    alignContent: 'center',
  },
  controlButtonContainer: {},
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
