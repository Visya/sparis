import React from "react";
import Title from "../components/Title";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { Image, View, StyleSheet, AsyncStorage } from "react-native";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      dataLoaded: false
    };
  }

  componentDidMount() {
    this.getStorageData();
  }

  static navigationOptions = {
    header: null
  };

  async getStorageData() {
    const getTicketData = async () => {
      let ticketData = "";
      try {
        ticketData = (await AsyncStorage.getItem("ticketData")) || "none";
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      return JSON.parse(ticketData);
    };

    const getBankData = async () => {
      let bankData = "";
      try {
        bankData = (await AsyncStorage.getItem("bankData")) || "none";
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      return JSON.parse(bankData);
    };

    const getContactData = async () => {
      let contactData = "";
      try {
        contactData = (await AsyncStorage.getItem("contactData")) || "none";
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
      return JSON.parse(contactData);
    };

    const storageData = {
      slCard: await getTicketData(),
      bankAccount: await getBankData(),
      contactInfo: await getContactData()
    };

    this.setState({
      data: storageData,
      dataLoaded: true,
      submitted: true,
      hasError: false
    });
  }

  validateData() {
    const { data } = this.state;

    const { slCard, bankAccount, contactInfo } = data;

    const { cardNumber, ticketType } = slCard;
    const { type, clearingNumber, account } = bankAccount;
    const {
      address,
      city,
      co,
      country,
      email,
      id,
      phone,
      firstname,
      surname,
      zip
    } = contactInfo;

    if (
      cardNumber !== "" &&
      ticketType !== "" &&
      type !== "" &&
      clearingNumber !== "" &&
      account !== "" &&
      address !== "" &&
      city !== "" &&
      co !== "" &&
      country !== "" &&
      email !== "" &&
      id !== "" &&
      phone !== "" &&
      firstname !== "" &&
      surname !== "" &&
      zip !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { dataLoaded, data } = this.state;

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.ScreenWrapper}>
        <Image
          style={styles.Image}
          source={require("../assets/img/home.jpg")}
        />
        <Title center>Välkommen till Spåris</Title>
        <Paragraph center>
          Med denna app kan du snabbt och enkelt be om förseningsersättning för
          förseningar i SL:s lokaltrafik utan att fylla i krångliga formulär. På
          nästa skärm anger du dina personuppgifter som sedan används för att
          fylla i formulären åt dig - smart va?
        </Paragraph>

        {dataLoaded && (
          <Button
            onClick={() =>
              navigate(this.validateData() ? "Compensation" : "InfoTicket", {})
            }
          >
            Nu kör vi!
          </Button>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Image: {
    width: 250,
    height: 250
  },
  ScreenWrapper: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  Paragraph: {
    textAlign: "center",
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 20,
    opacity: 0.85
  }
});

export default HomeScreen;
