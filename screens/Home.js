import React from "react";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { Image, View, StyleSheet } from "react-native";

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
        <Title center>Välkommen till Spåris</Title>
        <Paragraph center>
          Med denna app kan du snabbt och enkelt be om förseningsersättning för
          förseningar i SL:s lokaltrafik utan att fylla i krångliga formulär. På
          nästa skärm anger du dina personuppgifter som sedan används för att
          fylla i formulären åt dig - smart va?
        </Paragraph>

        <Button onClick={() => navigate("InfoTicket", {})}>Nu kör vi!</Button>
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
  Paragraph: {
    textAlign: "center",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 20,
    opacity: 0.85
  }
});

export default HomeScreen;
