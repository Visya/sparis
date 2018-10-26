import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from "react-native";
import {
  ECards,
  ECardsLabels,
  ETramBranches,
  EMetroBranches,
  EStations,
  ETimeFrames
} from "../utils/enums";

class CompensationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      cardNumber: "",
      cardType: ""
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
            cardType: JSON.stringify(this.state.cardType)
          })
        );
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };

    saveTicketData();
    navigate("InfoTicket", {});
  }

  handleSubmit() {
    // Should send data to the web form here I guess
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
          Be om Förseningsersättning
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

        {/* Branch you were going on */}
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
              {this.state.tramBranch
                ? this.state.tramBranch
                : "Välj en spårvagnslinje"}
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
            {EMetroBranches.map(branch => {
              return (
                <TouchableOpacity
                  key={branch}
                  onPress={() => {
                    this.setState({
                      tramBranch: branch,
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
                      style={{
                        color: "#222",
                        fontSize: 16
                      }}
                    >
                      {branch}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Destination */}
        <TouchableOpacity
          onPress={() =>
            this.setState({ dropdown2: this.state.dropdown2 ? false : true })
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
              {this.state.startStation
                ? this.state.startStation
                : "Din startstation"}
            </Text>
            {this.state.dropdown2 ? <Text>-</Text> : <Text>+</Text>}
          </View>
        </TouchableOpacity>

        {this.state.dropdown2 && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 5,
              padding: 10,
              marginTop: 10
            }}
          >
            {EStations.map(station => {
              return (
                <TouchableOpacity
                  key={station}
                  onPress={() => {
                    this.setState({
                      startStation: station,
                      dropdown2: false
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
                      style={{
                        color: "#222",
                        fontSize: 16
                      }}
                    >
                      {station}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Endstation */}
        <TouchableOpacity
          onPress={() =>
            this.setState({ dropdown3: this.state.dropdown3 ? false : true })
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
              {this.state.endStation
                ? this.state.endStation
                : "Din slutstation"}
            </Text>
            {this.state.dropdown3 ? <Text>-</Text> : <Text>+</Text>}
          </View>
        </TouchableOpacity>

        {this.state.dropdown3 && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 5,
              padding: 10,
              marginTop: 10
            }}
          >
            {EStations.map(station => {
              return (
                <TouchableOpacity
                  key={station}
                  onPress={() => {
                    this.setState({
                      endStation: station,
                      dropdown3: false
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
                      style={{
                        color: "#222",
                        fontSize: 16
                      }}
                    >
                      {station}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Timepoint when it occured */}
        <TouchableOpacity
          onPress={() =>
            this.setState({ dropdown4: this.state.dropdown4 ? false : true })
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
            <Text>{this.state.time ? this.state.time : "Tidpunkt"}</Text>
            {this.state.dropdown4 ? <Text>-</Text> : <Text>+</Text>}
          </View>
        </TouchableOpacity>

        {this.state.dropdown4 && (
          <View
            style={{
              borderWidth: 1,
              borderColor: "lightgrey",
              borderRadius: 5,
              padding: 10,
              marginTop: 10
            }}
          >
            {ETimeFrames.map(time => {
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => {
                    this.setState({
                      time: time,
                      dropdown4: false
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
                      style={{
                        color: "#222",
                        fontSize: 16
                      }}
                    >
                      {time}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View
          style={{
            flex: 2,
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={() => this.handleSubmit()}>
            <View
              style={{
                padding: 15,
                width: 250,
                borderRadius: 5,
                backgroundColor: "#62D288",
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
                Begär ersättning
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CompensationScreen;
