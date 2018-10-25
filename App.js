import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { white } from "ansi-colors";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SL-Broke App</Text>
        <TouchableOpacity onPress={() => console.log("Clicked...")}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Click me</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    padding: 15,
    backgroundColor: "dodgerblue",
    borderRadius: 4,

    width: 375
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center"
  }
});
