import React from "react";
import { Image, View, Text, TouchableOpacity } from "react-native";

class Yay extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      >
        <Image style={{}} source={require("../assets/img/yay.png")} />
        <Text style={{ fontSize: 30, fontWeight: "600", marginTop: 20 }}>
          YAY! Du gjorde det
        </Text>
        <Text
          style={{
            textAlign: "center",
            padding: 20,
            paddingLeft: 70,
            paddingRight: 70,
            lineHeight: 20,
            opacity: 0.85
          }}
        >
          Din förfrågan om förseningsersättning är skickad till SL. // Team
          Undefined
        </Text>
        <TouchableOpacity onPress={() => navigate("InfoTicket", {})}>
          <View
            style={{
              padding: 18,
              width: 250,
              borderRadius: 5,
              backgroundColor: "#D26283",
              marginTop: 30
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontSize: 25,
                fontWeight: "600"
              }}
            >
              En till, en till!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Yay;
