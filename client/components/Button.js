import React from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";

const Button = props => {
  const { onClick, submit, disabled, children } = props;

  return disabled ? (
    <TouchableOpacity>
      <View
        style={[
          styles.Button,
          submit && { backgroundColor: "#62D288", opacity: 0.5 }
        ]}
      >
        <Text style={styles.ButtonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => onClick()}>
      <View style={[styles.Button, submit && { backgroundColor: "#62D288" }]}>
        <Text style={styles.ButtonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default Button;
