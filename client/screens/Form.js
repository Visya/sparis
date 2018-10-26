import React from "react";
import {View} from "react-native";
import SlForm from "../components/SlForm";

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{ flex: 1 }}
      >
        <SlForm/>
      </View>
    );
  }
}

export default HomeScreen;
