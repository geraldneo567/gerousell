import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./screens/WelcomeScreen.js";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import {StyleSheet, Text, View} from "react-native";
import ProfileScreen from "./screens/ProfileScreen";
import SellScreen from "./screens/SellScreen";
import ChatScreen from "./screens/ChatScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListingScreen from "./screens/ListingScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
    headerStyle: {backgroundColor: "#a83232"},
    headerTitleStyle: {color: "white"},
    headerTintColor: "white",
    headerTitleAlign: 'center',
}

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ title: 'Welcome to gerousell!' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{title: 'Register'}}
            />
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{title: 'gerousell'}}
            />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{title: 'Your Profile'}}
            />
            <Stack.Screen
                name="Sell"
                component={SellScreen}
                options={{title: 'Sell your Item!'}}
            />
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{title: 'Your Chats'}}
            />
            <Stack.Screen
                name="Listing"
                component={ListingScreen}
            />
        </Stack.Navigator>

      </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;