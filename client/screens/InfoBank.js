import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image
} from "react-native";

import { EBankAccounts, ImageStyle } from "../utils/enums";

class InfoBankScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "",
      clearingNumber: "",
      account: ""
    };
  }

  static navigationOptions = {
    title: "Spåris",
    headerTintColor: "white",
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: "#D26283"
    }
  };

  navigateAndSave() {
    const { navigate } = this.props.navigation;
    const { account } = this.state;

    const saveBankData = async account => {
      try {
        await AsyncStorage.setItem(
          "bankData",
          JSON.stringify({
            account: this.state.account,
            type: this.state.type,
            clearingNumber: this.state.clearingNumber
          })
        );
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveBankData();
    navigate("InfoContact", {});
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
          source={require("../assets/img/ticket.png")}
        />
        <Text style={{ fontSize: 25, fontWeight: "600" }}>
          Dina uppgifter - bankkonto
        </Text>
        <Text
          style={{
            paddingTop: 10,
            lineHeight: 20,
            opacity: 0.85
          }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure
          reiciendis quo eveniet ratione et rem quas saepe cumque nostrum
          quisquam. quas saepe cumque nostrum quisquam. saepe cumque nostrum
          quisquam.
        </Text>

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
            <Text>{this.state.type ? this.state.type : "Välj en korttyp"}</Text>
            {this.state.dropdown ? <Text>-</Text> : <Text>+</Text>}
          </View>
        </TouchableOpacity>

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
            {EBankAccounts.map(account => {
              return (
                <TouchableOpacity
                  key={account}
                  onPress={() => {
                    this.setState({
                      type: account,
                      dropdown: false
                    });
                  }}
                >
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#f3f3f3",
                      marginBottom: 10,
                      borderRadius: 3
                    }}
                  >
                    <Text
                      key={account}
                      style={{
                        color: "#222",
                        fontSize: 16
                      }}
                    >
                      {account}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
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
          placeholder="Clearingnr"
          onChangeText={text => this.setState({ clearingNumber: text })}
          value={this.state.clearingNumber}
        />

        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
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
          placeholder="Kontonummer"
          onChangeText={text => this.setState({ account: text })}
          value={this.state.account}
        />

        <View
          style={{
            flex: 2,
            alignItems: "center"
          }}
        >
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

export default InfoBankScreen;
