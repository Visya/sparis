import React from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default (HeaderRight = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 16
      }}
    >
      <TouchableOpacity onPress={() => props.navigate("About", {})}>
        <FontAwesome name="question-circle-o" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigate("InfoTicket", {})}>
        <View
          style={{
            marginLeft: 16
          }}
        >
          <FontAwesome name="gear" size={32} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
});
