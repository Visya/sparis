import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import { ECards, ECardsLabels, EBankAccounts } from "../utils/enums";

class InfoBankScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cardNumber: "",
      accountType: ""
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
    const { cardNumber } = this.state;

    const saveTicketData = async cardNumber => {
      try {
        await AsyncStorage.setItem(
          "ticketData",
          JSON.stringify({
            cardNumber: this.state.cardNumber,
            accountType: JSON.stringify(this.state.accountType)
          })
        );
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveTicketData();
    navigate("Compensation", {});
  }

  render() {
    const { navigate } = this.props.navigation;

    // const getTicketData = async () => {
    //   let ticketData = "";
    //   try {
    //     ticketData = (await AsyncStorage.getItem("ticketData")) || "none";
    //   } catch (error) {
    //     // Error retrieving data
    //     console.log(error.message);
    //   }
    //   return console.log(JSON.parse(JSON.parse(ticketData).branches));
    // };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 20,
          backgroundColor: "white"
        }}
      >
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
            <Text>
              {this.state.accountType
                ? this.state.accountType
                : "Välj en korttyp"}
            </Text>
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
                      accountType: account,
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
          onChangeText={text => this.setState({ accountNumber: text })}
          value={this.state.accountNumber}
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
