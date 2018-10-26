import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image
} from "react-native";

import { ETimeFrames, ETravelTypesLabels, ImageStyle } from "../utils/enums";
import SlForm from "../SlForm";
import HeaderLeft from "../components/HeaderLeft";
import HeaderRight from "../components/HeaderRight";

import BusLines from "../utils/static/transportType/bus.json";
import TramLines from "../utils/static/transportType/tram.json";
import MetroLines from "../utils/static/transportType/metro.json";
import TrainLines from "../utils/static/transportType/train.json";

import BusStations from "../utils/static/lineStops/112.json";

class CompensationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      type: "",
      line: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: "",
      headerLeft: <HeaderLeft navigate={navigate} />,
      headerRight: <HeaderRight navigate={navigate} />
    };
  };

  async handleSubmit() {
    const { navigate } = this.props.navigation;

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
      contactInfo: await getContactData(),
      delayInfo: {
        type: this.state.type,
        line: this.state.line,
        from: this.state.from,
        to: this.state.to,
        time: this.state.time
      }
    };

    this.setState({
      data: storageData,
      submitted: true
    });

    navigate("Yay", {});
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          padding: 20,
          backgroundColor: !this.state.submitted ? "white" : "rgba(0,0,0, 0)"
        }}
      >
        {!this.state.submitted ? (
          <ScrollView>
            <Image
              style={ImageStyle}
              source={require("../assets/img/money.png")}
            />
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
              Fyll i informationen nedan för att be om förseningsersättning.
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20
              }}
            >
              {ETravelTypesLabels.map(type => {
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => this.setState({ type: type })}
                  >
                    <View
                      style={{
                        padding: 25,
                        paddingLeft: 30,
                        borderRadius: 5,
                        paddingRight: 30,
                        borderWidth: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor:
                          this.state.type === type ? "#D26283" : "lightgrey",
                        backgroundColor:
                          this.state.type === type ? "#D26283" : "white"
                      }}
                    >
                      <Text
                        style={{
                          color: this.state.type === type ? "white" : "#222"
                        }}
                      >
                        {type[0]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* line you were going on */}
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
                  {/* Välj en{" "}
              {this.state.line ? this.state.line.Number : this.state.type}
              -linje */}

                  {this.state.line
                    ? this.state.line.GroupOfLine + " " + this.state.line.Number
                    : `Välj en ${this.state.type}-linje`}
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
                {this.state.type === "Spårvagn" &&
                  TramLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
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
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                {this.state.type === "Buss" &&
                  BusLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
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
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                {this.state.type === "Järnväg" &&
                  TrainLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
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
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                {this.state.type === "Tunnelbana" &&
                  MetroLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
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
                            {line.Number}
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
                this.setState({
                  dropdown2: this.state.dropdown2 ? false : true
                })
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
                  {this.state.from ? this.state.from : "Din startstation"}
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
                {BusStations.data.Result.map(station => {
                  return (
                    <TouchableOpacity
                      key={station.Name + station.Number}
                      onPress={() => {
                        this.setState({
                          from: station.Name,
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
                          {station.Name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* to */}
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dropdown3: this.state.dropdown3 ? false : true
                })
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
                <Text>{this.state.to ? this.state.to : "Din slutstation"}</Text>
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
                {BusStations.data.Result.map(station => {
                  return (
                    <TouchableOpacity
                      key={station.Name + station.Number}
                      onPress={() => {
                        this.setState({
                          to: station.Name,
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
                          {station.Name}
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
                this.setState({
                  dropdown4: this.state.dropdown4 ? false : true
                })
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
          </ScrollView>
        ) : (
          <SlForm data={this.state.data} />
        )}
      </View>
    );
  }
}

export default CompensationScreen;
