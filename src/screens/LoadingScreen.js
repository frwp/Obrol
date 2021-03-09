
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import * as firebase from 'firebase';

export default function LoadingScreen({ navigation }) {
  useEffect(
     () => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.replace('Home');
        } else {
          navigation.replace('Sign In');
        }
      });
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOADINGGG</Text>
      <ActivityIndicator size='large' />
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