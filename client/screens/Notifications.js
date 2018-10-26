import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import {
  ETravelMethodsLabels,
  ETravelMethods,
  EMetroBranches
} from "../utils/enums";

class NotificationsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      method: "",
      selectedBranches: []
    };
  }

  static navigationOptions = {
    title: "Notifikationer"
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
        <Text style={{ fontSize: 25, fontWeight: "600" }}>Notifikationer</Text>
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
          {ETravelMethodsLabels.map(method => {
            return (
              <TouchableOpacity
                key={method}
                onPress={() => this.setState({ method: method })}
              >
                <View
                  style={{
                    padding: 25,
                    paddingLeft: 30,
                    borderRadius: 5,
                    paddingRight: 30,
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor:
                      this.state.method === method ? "#D26283" : "lightgrey",
                    backgroundColor:
                      this.state.method === method ? "#D26283" : "white"
                  }}
                >
                  <Text
                    style={{
                      color: this.state.method === method ? "white" : "#222"
                    }}
                  >
                    {method[0]}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {this.state.method ? (
          <TouchableOpacity
            onPress={() =>
              this.setState({ dropdown: this.state.dropdown ? false : true })
            }
          >
            <View
              style={{
                marginTop: 20,
                borderWidth: 1,
                borderColor: "lightgrey",
                borderRadius: 5,
                padding: 16,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text>Välj ett alternativ</Text>
              {this.state.dropdown ? <Text>-</Text> : <Text>+</Text>}
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: 20,
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 5,
              padding: 16,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              opacity: 0.4
            }}
          >
            <Text>Välj ett alternativ</Text>
            <Text>+</Text>
          </View>
        )}
        {this.state.dropdown && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 5,
              padding: 10,
              marginTop: 10
            }}
          >
            {EMetroBranches.map(branch => {
              return (
                <TouchableOpacity
                  key={branch}
                  onPress={() => {
                    this.setState(prevState => ({
                      selectedBranches: [...prevState.selectedBranches, branch]
                    }));
                  }}
                >
                  <View
                    style={{
                      padding: 10,

                      backgroundColor: this.state.selectedBranches.includes(
                        branch
                      )
                        ? "#222"
                        : "#f3f3f3",
                      marginBottom: 10,
                      borderRadius: 3
                    }}
                  >
                    <Text
                      key={branch}
                      style={{
                        color: this.state.selectedBranches.includes(branch)
                          ? "white"
                          : "#222",
                        fontSize: 16
                      }}
                    >
                      {branch} linjen
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <View
          style={{
            flex: 2,
            alignItems: "center"
          }}
        >
          {this.state.selectedBranches.length > 0 && (
            <TouchableOpacity
              onPress={() => this.setState({ selectedBranches: [] })}
              style={{
                borderRadius: 5,
                padding: 10,
                marginTop: 15
              }}
            >
              <Text style={{ color: "dodgerblue", fontSize: 16 }}>Rensa</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigate("Notifications", {})}>
            <View
              style={{
                padding: 15,
                width: 250,
                borderRadius: 5,
                backgroundColor: "#D26283",
                marginTop: !this.state.dropdown ? 50 : 15
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "600"
                }}
              >
                Gå vidare
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default NotificationsScreen;
