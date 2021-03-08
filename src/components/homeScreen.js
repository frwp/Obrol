import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Obrol App</Text>
      <Text>
        Open up src/components/homeScreen.js to start working on Obrol!
      </Text>
      <Button
        title="button - touch me plz"
        onPress={() => navigation.navigate("Chat")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
