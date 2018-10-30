import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";

class Yay extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.ScreenWrapper}>
        <Image source={require("../assets/img/yay.png")} />
        <Title center>YAY! Du gjorde det</Title>
        <Paragraph center>
          Din förfrågan om förseningsersättning är skickad till SL. // Team
          Undefined
        </Paragraph>
        <TouchableOpacity onPress={() => navigate("InfoTicket", {})}>
          <View style={styles.Button}>
            <Text style={styles.ButtonText}>En till, en till!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  Button: {
    padding: 18,
    width: 250,
    borderRadius: 5,
    backgroundColor: "#D26283",
    marginTop: 30
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600"
  }
});

export default Yay;
