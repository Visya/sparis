import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image,
  ScrollView,
  StyleSheet
} from "react-native";
import KeyboardAvoid from "../components/KeyboardAvoid";
import { EBankAccounts } from "../utils/enums";
import Title from "../components/Title";

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
    return (
      <KeyboardAvoid style={styles.ScreenWrapper}>
        <ScrollView style={styles.ScrollWrapper}>
          <Image
            style={styles.Image}
            source={require("../assets/img/bankaccount.png")}
          />
          <Title>Dina uppgifter - bankkonto</Title>

          <TouchableOpacity
            onPress={() =>
              this.setState({ dropdown: this.state.dropdown ? false : true })
            }
          >
            <View style={styles.DropdownButton}>
              <Text>
                {this.state.type ? this.state.type : "Välj en korttyp"}
              </Text>
              {this.state.dropdown ? <Text>-</Text> : <Text>+</Text>}
            </View>
          </TouchableOpacity>

          {this.state.dropdown && (
            <View style={styles.DropdownList}>
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
                    <View style={styles.DropdownItem}>
                      <Text key={account} style={styles.DropdownItemText}>
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
            style={styles.InputField}
            placeholder="Clearingnr"
            onChangeText={text => this.setState({ clearingNumber: text })}
            value={this.state.clearingNumber}
          />

          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.InputField}
            placeholder="Kontonummer"
            onChangeText={text => this.setState({ account: text })}
            value={this.state.account}
          />

          <View style={styles.ButtonWrapper}>
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
      </KeyboardAvoid>
    );
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white",
    flex: 1
  },
  ScrollWrapper: {
    backgroundColor: "white"
  },
  Image: {
    width: 195,
    height: 195,
    alignSelf: "center",
    marginBottom: 32
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
  DropdownList: {
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  DropdownItem: {
    padding: 10,
    backgroundColor: "#f3f3f3",
    marginBottom: 10,
    borderRadius: 3
  },
  DropdownItemText: {
    color: "#222",
    fontSize: 16
  },
  InputField: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
    padding: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  ButtonWrapper: {
    alignItems: "center"
  },
  Button: {
    padding: 15,
    width: 250,
    borderRadius: 5,
    backgroundColor: "#D26283"
  },
  ButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600"
  }
});

export default InfoBankScreen;
