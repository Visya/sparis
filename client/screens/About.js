import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Spåris"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.ScreenWrapper}>
        <Text style={styles.Focus}>Spåris appen</Text>
        <Text>
          Spåris appen hjälper dig att på ett smidigare sätt söka
          förseninsersättning hos SL. Spåris ägs och underhålls av Team
          Undefined.
        </Text>
        <Text style={styles.Focus}>Mer information på sl.se</Text>
        <Text>
          Du hittar mer information om föreseningsersättning på
          https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning/
        </Text>
        <Text style={styles.Focus}>Techinfo</Text>
        <Text>
          Din personliga information sparas lokalt på din telefon. Ingen annan
          data sparas av Spåris. Erätssningsinformation skickas endast till
          sl.se.
        </Text>
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
