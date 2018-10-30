import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.ScreenWrapper}>
        <Image
          style={styles.Image}
          source={require("../assets/img/home.jpg")}
        />
        <Text style={styles.Title}>Välkommen till Spåris</Text>
        <Text style={styles.Paragraph}>
          Med denna app kan du snabbt och enkelt be om förseningsersättning för
          förseningar i SL:s lokaltrafik utan att fylla i krångliga formulär. På
          nästa skärm anger du dina personuppgifter som sedan används för att
          fylla i formulären åt dig - smart va?
        </Text>
        <TouchableOpacity onPress={() => navigate("InfoTicket", {})}>
          <View style={styles.Button}>
            <Text style={styles.ButtonText}>Nu kör vi!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Image: {
    width: 250,
    height: 250
  },
  ScreenWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  Title: {
    fontSize: 30,
    fontWeight: "600"
  },
  Paragraph: {
    textAlign: "center",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 20,
    opacity: 0.85
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

export default HomeScreen;
