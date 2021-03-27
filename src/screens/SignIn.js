import React, { useState, createRef } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, Dimensions, StatusBar, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/routers';
import { signIn } from '../API/firebaseMethods';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from 'firebase';
import LoadingScreen from './LoadingScreen'

import {
    useFonts,
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  } from '@expo-google-fonts/roboto';


import * as Animatable from 'react-native-animatable';
import { color } from 'react-native-reanimated';

export default function SignIn({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        if (!email) {
            Alert.alert('Email field is required.');
        }

        if (!password) {
            Alert.alert('Password field is required.');
        }

        signIn(email, password);
        setEmail('');
        setPassword('');

        /**
         * need this before navigating to home view
         * otherwise error will happen because 
         * firebase.auth().currentuser is still null
         * but immedieately used.
         */
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [{ name: 'Home' }],
                    })
                );
            }
        });

        
    };

    const refInputPasswd = createRef();

    let [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_100Thin_Italic,
        Roboto_300Light,
        Roboto_300Light_Italic,
        Roboto_400Regular,
        Roboto_400Regular_Italic,
        Roboto_500Medium,
        Roboto_500Medium_Italic,
        Roboto_700Bold,
        Roboto_700Bold_Italic,
        Roboto_900Black,
        Roboto_900Black_Italic,
      });

    if (!fontsLoaded) {
        return <LoadingScreen />;
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor='transparent'/>
            <ImageBackground source={require('../../assets/chatting.jpg')} style={styles.backgroundImage}>
            <View style={styles.header}>
                
                <Text style={styles.text_header}>Welkam!!</Text>
            </View>

            <Animatable.View animation='fadeInUp' easing='ease-out-expo' style={styles.footer}>

                <Text style={styles.text_footer}>
                    <Text style={[styles.text_footer,{fontWeight: 'bold', fontSize: 72, color: '#6B48DE'}]}>Obrol</Text>in apa aja, bareng siapa aja!
                </Text>

                <FormInput
                    labelValue={email}
                    onChangeText={(email) => setEmail(email)}
                    placeholderText='Email'
                    iconType='user'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='next'
                    onSubmitEditing={() => refInputPasswd.current.focus()}
                />

                <FormInput
                    labelValue={password}
                    onChangeText={(password) => setPassword(password)}
                    placeholderText='Password'
                    iconType='lock'
                    secureTextEntry={true}
                    ref={refInputPasswd}
                />

                <FormButton buttonTitle='Sign in' onPress={handlePress} />
                
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={() => navigation.navigate('Sign Up')}
                >
                    <Text style={styles.navButtonText}>
                        Don't have an account? Create here
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6B48DE'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 2,
        backgroundColor: '#f9fafd',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontSize: 32,
        marginBottom: 20,
        fontFamily: 'Roboto_700Bold'
    },
    text_footer: {
        color: '#6B48DE',
        fontSize: 32,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
        fontFamily: 'Roboto_400Regular'
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#6B48DE',
        alignSelf: 'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    }
});