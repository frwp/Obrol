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
import { View, Text, Image, StatusBar } from 'react-native';
import { block } from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator();

export default function MainRouter() {
    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(apiKeys.firebaseConfig);
    }

    function SplashScreen({navigation}) {
        setTimeout(() => {
            navigation.replace('Loading');
        }, 3000)
        return(
            <View style={{backgroundColor: '#6B48DE', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar hidden/>
                <Animatable.Image source={require('../../assets/obrolwhite.png')} animation='zoomIn' easing='ease-in-out-expo' style={{alignSelf: 'center',resizeMode: 'center', width: '60%'}}/>
            </View>
        );
    }

    /**
     * Main route for app, pretty straightforward
     * Stack navigation for main, tab for routing between home and chat list
     */
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='splash'>
            <Stack.Screen name='splash' component={SplashScreen} options={{ headerShown: false }}/>
            <Stack.Screen name={'Loading'} component={LoadingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name='Sign In' component={SignIn} options={{ headerShown: false }}/>
            <Stack.Screen name='Home' component={TabRouter} options={{ headerTitle: 'Obrol' }} />
            <Stack.Screen name='ChatRoom' component={ChatRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
