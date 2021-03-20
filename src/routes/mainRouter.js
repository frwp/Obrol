import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from 'firebase';
import apiKeys from '../config/keys';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import LoadingScreen from '../screens/LoadingScreen';
import ChatRoom from '../screens/chatRoom'
import TabRouter from './tabRouter';

const Stack = createStackNavigator();

export default function MainRouter() {
    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(apiKeys.firebaseConfig);
    }

    /**
     * Main route for app, pretty straightforward
     * Stack navigation for main, tab for routing between home and chat list
     */
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name='Home' component={TabRouter} options={{ headerTitle: 'Obrol' }} />
            <Stack.Screen name='ChatRoom' component={ChatRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
