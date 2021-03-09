import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as firebase from 'firebase';
import {loggingOut} from '../API/firebaseMethods';
import FormButton from '../components/FormButton';

export default function HomeScreen({ navigation }) {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    async function getUserInfo(){
      let doc = await firebase
      .firestore()
      .collection('users')
      .doc(currentUserUID)
      .get();

      if (!doc.exists){
        Alert.alert('No user data found!')
      } else {
        let dataObj = doc.data();
        setFirstName(dataObj.firstName)
      }
    }
    getUserInfo();
  })

  const handlePress = () => {
    loggingOut();
    navigation.replace('Sign In');
  };

  return (
    <View style={styles.container}>
      <Text>Obrol App</Text>
      <Text style={styles.text}>Hi {firstName}</Text>
      <Text>
        Open up src/components/homeScreen.js to start working on Obrol!
      </Text>
      <Button
        title="button - touch me plz"
        onPress={() => navigation.navigate("Chat")}
      />
      <StatusBar style="auto" />
      
      <FormButton buttonTitle='Logout' onPress={handlePress}/>
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
});
