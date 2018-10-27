import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  Button,
  Image
} from "react-native";

import KeyboardAvoid from "../components/KeyboardAvoid";
import { ImageStyle } from "../utils/enums";

class InfoContactScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
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

    const saveContactData = async cardNumber => {
      try {
        await AsyncStorage.setItem(
          "contactData",
          JSON.stringify({
            id: this.state.id,
            co: this.state.co,
            phone: this.state.phone,
            firstname: this.state.firstname,
            surname: this.state.surname,
            address: this.state.adress,
            zip: this.state.zip,
            city: this.state.city,
            country: this.state.country,
            email: this.state.email
          })
        );
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveContactData();
    navigate("Notifications", {});
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoid
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 20,
          backgroundColor: "white"
        }}
      >
        <ScrollView>
          <Image
            style={ImageStyle}
            source={require("../assets/img/contactinfo.png")}
          />
          <Text style={{ fontSize: 25, fontWeight: "600" }}>
            Dina kontaktuppgifter
          </Text>

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
            placeholder="Förnamn"
            onChangeText={text => this.setState({ firstname: text })}
            value={this.state.firstname}
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
            placeholder="Efternamn"
            onChangeText={text => this.setState({ surname: text })}
            value={this.state.surname}
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
            placeholder="Personnummer"
            onChangeText={text => this.setState({ id: text })}
            value={this.state.id}
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
            placeholder="Telefonnummer"
            onChangeText={text => this.setState({ phone: text })}
            value={this.state.phone}
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
            placeholder="C/O"
            onChangeText={text => this.setState({ co: text })}
            value={this.state.co}
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
            placeholder="Gatuadress"
            onChangeText={text => this.setState({ adress: text })}
            value={this.state.adress}
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
            placeholder="Postnummer"
            onChangeText={text => this.setState({ zip: text })}
            value={this.state.zip}
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
            placeholder="Ort"
            onChangeText={text => this.setState({ city: text })}
            value={this.state.city}
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
            placeholder="Land"
            onChangeText={text => this.setState({ country: text })}
            value={this.state.country}
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
            placeholder="E-postadress"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
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
                  marginTop: !this.state.dropdown ? 50 : 35,
                  marginBottom: 50
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
      </KeyboardAvoid>
    );
  }
}

export default InfoContactScreen;
