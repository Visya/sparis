import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Image
} from "react-native";
import { ECards, ECardsLabels, ImageStyle } from "../utils/enums";

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
      <ScrollView
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
          Dina uppgifter - biljett
        </Text>
        <Text
          style={{
            paddingTop: 10,
            lineHeight: 20,
            opacity: 0.85
          }}
        >
          Här fyller du i dina uppgifter som vi använder för att fylla i
          formuläret åt dig. Dina uppgifter lagras på din mobiltelefon och
          skickas endast till SL i samband med att du ansöker om resersättning.
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
              {this.state.ticketType
                ? this.state.ticketType
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
                  <View
                    style={{
                      padding: 10,
                      backgroundColor: "#f3f3f3",
                      marginBottom: 10,
                      borderRadius: 3
                    }}
                  >
                    <Text
                      key={card}
                      style={{
                        color: "#222",
                        fontSize: 16
                      }}
                    >
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
          placeholder="Kortnummer"
          onChangeText={text => this.setState({ cardNumber: text })}
          value={this.state.cardNumber}
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
      </ScrollView>
    );
  }
}

export default InfoTicketScreen;
