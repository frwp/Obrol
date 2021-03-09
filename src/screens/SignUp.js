import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../API/firebaseMethods';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!email) {
      Alert.alert('Email field is required.');
    } else if (!password) {
      Alert.alert('Password field is required.');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password field is required.');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match!');
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
      );
      navigation.navigate('Loading');
      emptyState();
    }
  };

  return (

     <View style={styles.container}>
       <Text style={styles.text}>Create an account </Text>
       <FormInput
            labelValue={firstName}
            onChangeText={(name) => setFirstName(name)}
            placeholderText='First name'
            iconType='user'
        />

        <FormInput
            labelValue={lastName}
            onChangeText={(name) => setLastName(name)}
            placeholderText='Last Name'
            iconType='user'
        />

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

        <FormInput
            labelValue={confirmPassword}
            onChangeText={(password2) => setConfirmPassword(password2)}
            placeholderText='Confirm Password'
            iconType='lock'
            secureTextEntry={true}
        />
        
        <FormButton
            buttonTitle='Sign Up'
            onPress={handlePress}
        />
        
        <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>By registering, you confirm that you accept out</Text>
            <TouchableOpacity onPress={()=> alert('Terms Clicked')}>
                <Text style={[styles.color_textPrivate, {color: '#e88832'}]}> Terms of service </Text>
            </TouchableOpacity>
            <Text style={styles.color_textPrivate}>and</Text>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>Privacy Policy</Text>
        </View>

        <TouchableOpacity 
            style={styles.navButton} 
            onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.navButtonText}>Have an account? Sign in</Text>
        </TouchableOpacity>

     </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50,
      },
      text: {
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
      },
      navButton: {
        marginTop: 15,
      },
      textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
      },
      navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
      },
});