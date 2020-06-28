import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Icon } from "react-native-elements";
import { playButton } from "../screens/RadioPlayer";
import { Context } from "../../App";
import { AirPlayButton } from 'react-native-airplay-btn';

const BottomNavigator = ({ navigation }) => {
    const { isPlaying } = useContext(Context);
    const iconSize = 28;

    return (
        <View style={{ alignItems: "center", position: "relative" }}>
            <View
                style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    bottom: 45,
                    zIndex: 10,
                    shadowColor: 'rgb(90, 90, 90)',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 5,
    shadowOpacity: 0.3,
                    elevation: Platform.OS === "android" ? 5 : 0,
                }}
            >
                <Icon
                    style={{}}
                    name={isPlaying ? "pause" : "play"}
                    type="feather"
                    color="#000"
                    containerStyle={{ alignSelf: "center" }}
                    reverse
                    size={31}
                    onPress={() => playButton()}
                />
            </View>
            <View
                style={{
                    backgroundColor: "#B6B6B6",
                    width: "100%",
                    height: 70,
                    
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    paddingVertical: 18,
                }}
            >
                <Icon name="home" type="feather" color="#fff" size={iconSize} onPress={() => navigation.current.navigate("Radio")} />
                
                {Platform.OS === 'ios' && (
                    <AirPlayButton
                        style={{
                            alignSelf: 'center',
                            marginBottom: 5,
                            color: 'black',
                            height: 40,
                            width: 40,
                        }}
                    />
                )}
                <View style={{ flexDirection: "row", justifyContent: "center" }}>

                    <Icon
                        name="globe"
                        type="feather"
                        color="#fff"
                        size={iconSize}
                        onPress={() => navigation.current.navigate("WebPage")}
                        containerStyle={{ marginHorizontal: 0 }}
                    />
                    <Icon
                        name="facebook"
                        type="feather"
                        color="#fff"
                        size={iconSize}
                        onPress={() => navigation.current.navigate("FacebookPage")}
                        containerStyle={{ marginHorizontal: 5 }}
                    />
                    <Icon
                        name="calendar"
                        type="feather"
                        color="#fff"
                        size={iconSize}
                        onPress={() => navigation.current.navigate("SchedulePage")}
                        containerStyle={{ marginHorizontal: 5 }}
                    />
                    <Icon
                        name="twitter"
                        type="feather"
                        color="#fff"
                        size={iconSize}
                        onPress={() => navigation.current.navigate("TwitterPage")}
                        containerStyle={{ marginHorizontal: 5 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default BottomNavigator;
