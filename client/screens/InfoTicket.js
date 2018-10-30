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
import Button from "../components/Button";
import KeyboardAvoid from "../components/KeyboardAvoid";
import { ECardsLabels } from "../utils/enums";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";

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
          <Title>Dina uppgifter - biljett</Title>
          <Paragraph>
            Här fyller du i dina uppgifter som vi använder för att fylla i
            formuläret åt dig. Dina uppgifter lagras på din mobiltelefon och
            skickas endast till SL i samband med att du ansöker om
            resersättning.
          </Paragraph>

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
            <Button onClick={() => this.navigateAndSave()}>Gå vidare</Button>
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
    flex: 2,
    alignItems: "center"
  }
});

export default InfoTicketScreen;
