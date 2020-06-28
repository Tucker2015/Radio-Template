import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';

class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    componentDidMount() {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      
      
    }
  
    render() {
     
      return (
        <>
        
        <Animated.Image
          onProgress={this.onProgress}
          {...this.props}
          style={[
            
            {
              opacity: this.state.opacity,
              transform: [
                {
                  scale: this.state.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-0.1, 1],
                    
                  })
                },
              ],
            },
            this.props.style,
          ]}
                  />
          </>        
      );
    }
  }
export default ImageLoader;

