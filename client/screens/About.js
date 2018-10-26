import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Spåris"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 20,
          backgroundColor: "white"
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Spåris</Text>
        <Text>
          {`
            Spåris appen hjälper dig att på ett smidigare sätt söka
            förseninsersättning hos SL.
            
            Spåris ägs och underhålls av Team Undefined.
            `}
        </Text>
        <Text style={{ fontWeight: "bold" }}>Mer information på sl.se</Text>
        <Text>
          {`
            Du hittar mer information om föreseningsersättning på https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning/
            `}
        </Text>
        <Text style={{ fontWeight: "bold" }}>Techinfo</Text>
        <Text>
          {`
            Din personliga information sparas lokalt på din telefon. Ingen annan data sparas av Spåris.
            Erätssningsinformation skickas endast till sl.se.
            `}
        </Text>
      </View>
    );
  }
}

export default HomeScreen;
