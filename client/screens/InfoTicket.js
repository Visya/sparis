import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image,
  StyleSheet
} from "react-native";
import KeyboardAvoid from "../components/KeyboardAvoid";
import { ECardsLabels } from "../utils/enums";

class InfoTicketScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cardNumber: "",
      ticketType: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: "",
      headerLeft: null
    };
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
            ticketType: this.state.ticketType
          })
        );
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveTicketData();
    navigate("InfoBank", {});
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView>
        <KeyboardAvoid style={styles.ScreenWrapper}>
          <Image
            style={styles.Image}
            source={require("../assets/img/ticket.png")}
          />
          <Text style={styles.Title}>Dina uppgifter - biljett</Text>
          <Text style={styles.Paragraph}>
            Här fyller du i dina uppgifter som vi använder för att fylla i
            formuläret åt dig. Dina uppgifter lagras på din mobiltelefon och
            skickas endast till SL i samband med att du ansöker om
            resersättning.
          </Text>

          <TouchableOpacity
            onPress={() =>
              this.setState({ dropdown: this.state.dropdown ? false : true })
            }
          >
            <View style={styles.DropdownButton}>
              <Text>
                {this.state.ticketType
                  ? this.state.ticketType
                  : "Välj en korttyp"}
              </Text>
              {this.state.dropdown ? <Text>-</Text> : <Text>+</Text>}
            </View>
          </TouchableOpacity>

          {this.state.dropdown && (
            <View style={styles.DropdownList}>
              {ECardsLabels.map(card => {
                return (
                  <TouchableOpacity
                    key={card}
                    onPress={() => {
                      this.setState({
                        ticketType: card,
                        dropdown: false
                      });
                    }}
                  >
                    <View style={styles.DropdownItem}>
                      <Text key={card} style={styles.DropdownItemText}>
                        {card}
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
            placeholder="Kortnummer"
            onChangeText={text => this.setState({ cardNumber: text })}
            value={this.state.cardNumber}
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
        </KeyboardAvoid>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "white"
  },
  Title: { fontSize: 25, fontWeight: "600" },
  Image: {
    width: 195,
    height: 195,
    alignSelf: "center",
    marginBottom: 32
  },
  Paragraph: {
    paddingTop: 10,
    lineHeight: 20,
    opacity: 0.85
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
    flex: 2,
    alignItems: "center"
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

export default InfoTicketScreen;
