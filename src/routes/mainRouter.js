import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/homeScreen";
import ChatScreen from "../components/chatScreen";

import * as firebase from 'firebase';
import apiKeys from '../config/keys';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export default function MainRouter() {
  if (!firebase.apps.length) {
    console.log('Connected with Firebase')
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
      <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
