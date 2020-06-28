import {StyleSheet} from 'react-native';

export const screenTabButtons = StyleSheet.create ({
      
      flexContainer: {
        backgroundColor: "#FFF",
        flex: 1
      },
      tabBarContainer: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#000',
        position: 'relative',
        bottom:0,
        
      },
      button: {
        color: 'white',
        fontSize: 18
      },
      barImage: {
        height: 50,
        width: 50,
        resizeMode: "center",
        borderWidth: 1,
        borderRadius: 5,
        
        
      }
    })