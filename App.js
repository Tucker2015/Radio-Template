import "react-native-gesture-handler";
import React, { createRef, useState, createContext } from "react";
import BottomNavigator from "./src/components/BottomNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RadioPlayer from "./src/screens/RadioPlayer";
import FacebookPage from "./src/screens/FacebookPage";
import TwitterPage from "./src/screens/TwitterPage";
import SchedulePage from "./src/screens/SchedulePage";
import WebPage from "./src/screens/WebPage";


const Stack = createStackNavigator();

export const Context = createContext({
    isPlaying: false,
});

export default App = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const navigationRef = createRef();

    const changeState = (state) => {
        setIsPlaying(state);
    };

    return (
        <Context.Provider value={{ isPlaying: isPlaying, setIsPlaying: changeState }}>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen name="Radio" component={RadioPlayer} />
                    <Stack.Screen name="FacebookPage" component={FacebookPage} />
                    <Stack.Screen name="TwitterPage" component={TwitterPage} />
                    <Stack.Screen name="SchedulePage" component={SchedulePage} />
                    <Stack.Screen name="WebPage" component={WebPage} />
                </Stack.Navigator>
            </NavigationContainer>
            <BottomNavigator navigation={navigationRef} />
        </Context.Provider>
    );
};
