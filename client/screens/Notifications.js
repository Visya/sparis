import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";
import { ETravelTypesLabels, EMetroLines, ImageStyle } from "../utils/enums";

class NotificationsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      method: "",
      selectedLines: []
    };
  }
  static navigationOptions = {
    title: "",
    headerLeft: null
    /*
    title: "Spåris",
    headerTintColor: "white",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#D26283"
    }
*/
  };

  navigateAndSave() {
    const { navigate } = this.props.navigation;
    const { method } = this.state;

    const saveNotificationData = async method => {
      try {
        await AsyncStorage.setItem(
          "notificationData",
          JSON.stringify({
            method: this.state.method,
            branches: JSON.stringify(this.state.selectedLines)
          })
        );
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveNotificationData();
    navigate("Compensation", {});
  }

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
        <Image
          style={ImageStyle}
          source={require("../assets/img/notifications.png")}
        />
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
          {ETravelTypesLabels.map(method => {
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
            {EMetroLines.map(line => {
              return (
                <TouchableOpacity
                  key={line}
                  onPress={() => {
                    this.setState(prevState => ({
                      selectedLines: [...prevState.selectedLines, line]
                    }));
                  }}
                >
                  <View
                    style={{
                      padding: 10,

                      backgroundColor: this.state.selectedLines.includes(line)
                        ? "#222"
                        : "#f3f3f3",
                      marginBottom: 10,
                      borderRadius: 3
                    }}
                  >
                    <Text
                      key={line}
                      style={{
                        color: this.state.selectedLines.includes(line)
                          ? "white"
                          : "#222",
                        fontSize: 16
                      }}
                    >
                      {line} linjen
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
          {this.state.selectedLines.length > 0 && (
            <TouchableOpacity
              onPress={() => this.setState({ selectedLines: [] })}
              style={{
                borderRadius: 5,
                padding: 10,
                marginTop: 15
              }}
            >
              <Text style={{ color: "dodgerblue", fontSize: 16 }}>Rensa</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => this.navigateAndSave()}>
            <View
              style={{
                padding: 15,
                width: 250,
                borderRadius: 5,
                backgroundColor: "#D26283",
                marginTop: !this.state.dropdown ? 50 : 35
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
