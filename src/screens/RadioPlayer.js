import React, {useEffect, useState, useCallback, useContext} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import VolumeSlider from '../components/VolumeSlider';
import ImageLoader from '../components/ImageFader';
import {Context} from '../../App';
import {Icon} from 'react-native-elements';
import ModalView from '../components/InfoModal';

const image = 'https://ktinternet.net/radio-logos/pcr_logo.jpg';
const streamUrl = 'https://streams.ktinternet.net:8010';

export default function Radio({navigation}) {
  const {setIsPlaying} = useContext(Context);
  const playbackState = usePlaybackState();
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumCover, setAlbumCover] = useState('');

  useEffect(() => {
    setup();
    getCurrentTrackData();
  }, [getCurrentTrackData]);

  //With this fetch call I get the current song name and artist
  const getCurrentTrackData = useCallback(() => {
    TrackPlayer.addEventListener('playback-metadata-received', async e => {
      let [artist, title] = [e.artist, e.title];
      if (e.artist == null || e.title == null) {
        if (Platform.OS === 'ios') {
          [artist, title] = e.title.split(' - ');
          updateTrackPlayer(artist, title);
        } else {
          setAlbumCover('');
        }
        setTrackName(title == null ? 'PCR' : title);
        setArtistName(artist == null ? 'Peoples City Radio' : artist);
        TrackPlayer.updateMetadataForTrack('1111', {
          title: title == null ? 'PCR' : title,
          artist: artist == null ? 'Peoples City Radio' : artist,
          artwork: image,
        });
        return;
      }
      setTrackName(title);
      setArtistName(artist);
      updateTrackPlayer(artist, title);
    });
  }, []);

  const updateTrackPlayer = (artist, track) => {
    fetch(`https://itunes.apple.com/search?term=?${artist}+${track}&limit=2`)
      .then(res => res.json())
      .then(body => {
        console.log(body);
        //checking if we parsed invalid artist and track, if so I set album cover to "" so you will se default one and I return so other part of the code won't run
        if (body.error != null) {
          setAlbumCover('');
          //I assume track never changes that's why a hardcoded the id
          TrackPlayer.updateMetadataForTrack('1111', {
            title: track,
            artist: artist,
            artwork: image,
          });
          return;
        }
        const img = body.results[0]['artworkUrl100'].replace(
          '100x100',
          '600x600',
        );
        //I set the image using useState
        setAlbumCover(img);
        //I assume track never changes that's why a hardcoded the id
        TrackPlayer.updateMetadataForTrack('1111', {
          title: track,
          artist: artist,
          artwork: img === '' ? image : img,
        });
      })
      .catch(error => {
        setAlbumCover('');
        TrackPlayer.updateMetadataForTrack('1111', {
          title: track,
          artist: artist,
          artwork: image,
        });
        console.log('error log', error);
      });
  };

  async function setup() {
    await TrackPlayer.setupPlayer({
      waitForBuffer: true
    });
    await TrackPlayer.updateOptions({
      
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });
  }

  async function togglePlayback() {
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if (currentTrack == null) {
      await TrackPlayer.reset();
      await TrackPlayer.setupPlayer().then(async () => {
        TrackPlayer.add({
          id: '1111',
          url: streamUrl,
          artist: 'PCR',
          title: 'Peoples City Radio',
          artwork: 'https://ktinternet.net/pcr_logo.jpg',
        });
      });

      //// Icecast Stream :  https://ais-sa2.cdnstream1.com/1398_128
      //// Shoutcast Stream : http://149.56.185.59:8022/

      await TrackPlayer.play();
      setIsPlaying(true);
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
        setIsPlaying(true);
      } else {
        await TrackPlayer.pause();
        setIsPlaying(false);
      }
    }
  }
  module.exports.playButton = togglePlayback;
  // Set Playback Icon from State


  
  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.topBar}>
     <ModalView/>
        <Text
          style={[styles.textLight, {fontSize: 12}]}>
          {getStateName(playbackState)}
        </Text>
        <Icon
          name="share"
          type="feather"
          color="#000"
          size={25}
          onPress={() => {
            alert('Share');
          }}
        />
        </View>
      <View style={{alignItems: 'center', marginTop: 0}}>
        <Text
          style={[
            styles.text,
            {fontSize: 12, fontWeight: '400', marginTop: 5},
          ]}>
          © 2020, Kevin Tucker
        </Text>
        <View />
        <View style={styles.coverContainer}>
          <ImageLoader
            source={albumCover === '' ? {uri: image} : {uri: albumCover}}
            style={styles.cover}
          />
          <View />
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                styles.textDark,
                {fontSize: hp('3%'), fontWeight: '500'},
              ]}>
              {trackName}
            </Text>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={[
                styles.textArtist,
                {fontSize: hp('3%'), alignContent: 'center'},
              ]}>
              {artistName}
            </Text>
          </View>
        </View>

        <View />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignSelf: 'center',
          marginBottom: 60,
        }}>
        <VolumeSlider />
      </View>
    </SafeAreaView>
  );
}
function getStateName(state) {
  switch (state) {
    case TrackPlayer.STATE_NONE:
      return 'Hit play to start';
    case TrackPlayer.STATE_PLAYING:
      return 'Playing';
    case TrackPlayer.STATE_PAUSED:
      return 'Paused';
    case TrackPlayer.STATE_STOPPED:
      return 'Stopped';
    case TrackPlayer.STATE_BUFFERING:
      return 'Buffering';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#D2D2D2',
  },
  topBar: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignContent: 'center',
    marginTop: 10
  },
  textLight: {
    color: '#000',
    fontFamily: 'Khand-Regular',
    marginRight: 55
  },
  textDark: {
    color: '#3D425C',
    fontFamily: 'Khand-Regular',
  },
  textArtist: {
    color: '#8E97A6',
    fontFamily: 'Khand-SemiBold',
  },

  coverContainer: {
    zIndex: 10,
    elevation: 10,
    marginTop: 15,
    width: 300,
    height: 300,
    shadowColor: 'rgb(141, 138, 142)',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.3,
  },
  cover: {
    width: 300,
    height: 300,
    
  },
});
