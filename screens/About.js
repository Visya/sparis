import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Spåris"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.ScreenWrapper}>
        <Title>Spåris appen</Title>
        <Paragraph>
          Spåris appen hjälper dig att på ett smidigare sätt söka
          förseninsersättning hos SL. Spåris ägs och underhålls av Team
          Undefined.
        </Paragraph>
        <Text style={styles.Focus}>Mer information på sl.se</Text>
        <Paragraph>
          Du hittar mer information om föreseningsersättning på
          https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning/
        </Paragraph>
        <Text style={styles.Focus}>Techinfo</Text>
        <Paragraph>
          Din personliga information sparas lokalt på din telefon. Ingen annan
          data sparas av Spåris. Erätssningsinformation skickas endast till
          sl.se.
        </Paragraph>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white"
  },
  Focus: {
    fontWeight: "bold"
  }
});

export default HomeScreen;
