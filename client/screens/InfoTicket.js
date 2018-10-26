import React from "react";
import { Image, View, Text, TouchableOpacity, TextInput } from "react-native";
import { ECards, ECardsLabels, ImageStyle } from "../utils/enums";
import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";

class InfoTicketScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cardNumber: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: "Uppgifter - Biljett",
      headerLeft: <HeaderLeft navigate={navigate} />,
      headerRight: <HeaderRight navigate={navigate} />
    };
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
            <Text>Välj ett alternativ</Text>
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
                      cardType: card
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
          <TouchableOpacity onPress={() => console.log(this.state.cardNumber)}>
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

export default InfoTicketScreen;
