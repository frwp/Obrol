import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {signIn} from '../API/firebaseMethods';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function SignIn({navigation}) {

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
    };

    return (
    <View style={styles.container}>
        <Image
            source={require('../../assets/obrol.png')}
            style={styles.logo}
        />
        <Text style={styles.text}>
            ObrolApp
        </Text>

        <FormInput
            labelValue={email}
            onChangeText={(email) => setEmail(email)}
            placeholderText='Email'
            iconType='user'
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
        />

        <FormInput
            labelValue={password}
            onChangeText={(password) => setPassword(password)}
            placeholderText='Password'
            iconType='lock'
            secureTextEntry={true}
        />

        <FormButton
            buttonTitle='Sign in'
            onPress={handlePress}
        />

        <TouchableOpacity 
            style={styles.forgotButton} 
            onPress={() => {}}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={styles.forgotButton} 
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.navButtonText}>Don't have an account? Create here</Text>
        </TouchableOpacity>

    </View>
    );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    padding: 5,
    backgroundColor: '#ff9999',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    margin: "2%",
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    // fontFamily: 'Lato-Regular',
  },
  navButton: {
    marginTop: 15,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  buttonText: {
    fontSize:20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#f9fafd',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  formInput: {
    width: 300,
    fontSize:18,
    borderWidth: 1,
    borderColor:'#a4eddf',
    padding: 10,
    margin: 5,
  },
  text: {
    fontSize: 36,
    marginBottom: 10,
    marginTop: 10,
    color: '#051d5f',
  },
});