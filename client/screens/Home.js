import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

class HomeScreen extends React.Component {
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
        <Text style={{ fontSize: 30, fontWeight: "600" }}>
          Välkommen till Spåris
        </Text>
        <Text
          style={{
            textAlign: "center",
            padding: 20,
            paddingLeft: 40,
            paddingRight: 40,
            lineHeight: 20,
            opacity: 0.85
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo placeat
          amet, cumque praesentium, facilis perspiciatis, iste ad ullam nulla
          asperiores reiciendis error autem fuga aut iure necessitatibus vero
          quos deleniti similique aspernatur eius explicabo iusto deserunt
          dicta. Voluptate nihil officiis ducimus quaerat, voluptas nobis ipsum.
          Autem, libero aliquid. Ducimus, aliquam.
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
              Nu kör vi!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
