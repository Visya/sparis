import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet
} from "react-native";
import { ETravelTypesLabels, EMetroLines } from "../utils/enums";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";

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
    return (
      <ScrollView style={styles.ScreenWrapper}>
        <Image
          style={styles.Image}
          source={require("../assets/img/notifications.png")}
        />
        <Title>Notifikationer</Title>
        <Paragraph>
          Genom att fylla i ditt vanligaste resesätt kan vi skicka dig en
          notifiering om det sker en försening.
        </Paragraph>
        <View style={styles.ChoiceWrapper}>
          {ETravelTypesLabels.map(method => {
            return (
              <TouchableOpacity
                key={method}
                onPress={() => this.setState({ method: method })}
              >
                <View
                  style={[
                    styles.Choice,
                    {
                      borderColor:
                        this.state.method === method ? "#D26283" : "lightgrey",
                      backgroundColor:
                        this.state.method === method ? "#D26283" : "white"
                    }
                  ]}
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
            <View style={styles.DropdownButton}>
              <Text>Välj ett alternativ</Text>
              {this.state.dropdown ? <Text>-</Text> : <Text>+</Text>}
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.DropdownButtonDisabled}>
            <Text>Välj ett alternativ</Text>
            <Text>+</Text>
          </View>
        )}
        {this.state.dropdown && (
          <View style={styles.DropdownList}>
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
                    style={[
                      styles.DropdownItem,
                      {
                        backgroundColor: this.state.selectedLines.includes(line)
                          ? "#222"
                          : "#f3f3f3"
                      }
                    ]}
                  >
                    <Text
                      key={line}
                      style={[
                        styles.DropdownItemText,
                        {
                          color: this.state.selectedLines.includes(line)
                            ? "white"
                            : "#222"
                        }
                      ]}
                    >
                      {line} linjen
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <View style={styles.ButtonsWrapper}>
          {this.state.selectedLines.length > 0 && (
            <TouchableOpacity
              onPress={() => this.setState({ selectedLines: [] })}
              style={styles.SmallButton}
            >
              <Text style={styles.SmallButtonText}>Rensa</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => this.navigateAndSave()}>
            <View
              style={[
                styles.Button,
                { marginTop: !this.state.dropdown ? 50 : 35 }
              ]}
            >
              <Text style={styles.ButtonText}>Gå vidare</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  Image: {
    width: 195,
    height: 195,
    alignSelf: "center",
    marginBottom: 32
  },
  ChoiceWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  Choice: {
    padding: 25,
    paddingLeft: 30,
    borderRadius: 5,
    paddingRight: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  DropdownButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  DropdownButtonDisabled: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.4
  },
  DropdownList: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  DropdownItem: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 3
  },
  DropdownItemText: {
    fontSize: 16
  },
  ButtonsWrapper: {
    flex: 2,
    alignItems: "center"
  },
  SmallButton: {
    borderRadius: 5,
    padding: 10,
    marginTop: 15
  },
  SmallButtonText: {
    color: "dodgerblue",
    fontSize: 16
  },
  Button: {
    padding: 15,
    width: 250,
    borderRadius: 5,
    backgroundColor: "#D26283",
    marginBottom: 100
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600"
  }
});

export default NotificationsScreen;
