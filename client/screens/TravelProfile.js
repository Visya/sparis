import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ETravelMethodsLabels } from "../utils/enums";

class TravelProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      method: ""
    };
  }

  static navigationOptions = {
    title: "Reseprofil"
  };

  render() {
    const { navigate } = this.props.navigation;

    console.log(this.state.method);

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 20,
          backgroundColor: "white"
        }}
      >
        <Text style={{ fontSize: 25, fontWeight: "600" }}>Din reseprofil</Text>
        <Text
          style={{
            paddingTop: 10,
            lineHeight: 20,
            opacity: 0.85
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
          reiciendis quo eveniet ratione et rem quas saepe cumque nostrum
          quisquam.
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ method: ETravelMethodsLabels[0] })}
          >
            <View
              style={{
                padding: 25,
                borderWidth: 1,
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "lightgrey"
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "600" }}>T</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ method: ETravelMethodsLabels[1] })}
          >
            <View
              style={{
                padding: 25,
                borderWidth: 1,
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "lightgrey"
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "600" }}>J</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ method: ETravelMethodsLabels[2] })}
          >
            <View
              style={{
                padding: 25,
                borderWidth: 1,
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "lightgrey"
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "600" }}>B</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({ method: ETravelMethodsLabels[3] })}
          >
            <View
              style={{
                padding: 25,
                borderWidth: 1,
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "lightgrey"
              }}
            >
              <Text style={{ fontSize: 25, fontWeight: "600" }}>S</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TextInput
          style={{
            marginTop: 50,
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 5,
            padding: 16
          }}
          placeholder="Välj ett transportsätt"
          onChange={text => {
            this.setState({
              value: text
            });
          }}
        />
      </View>
    );
  }
}

export default TravelProfileScreen;
