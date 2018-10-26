import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  ECards,
  ECardsLabels,
  ETramBranches,
  EMetroBranches,
  EStations,
  ETimeFrames,
  ETravelMethodsLabels
} from "../utils/enums";

import BusLines from "../utils/static/transportType/bus.json";
import TramLines from "../utils/static/transportType/tram.json";
import MetroLines from "../utils/static/transportType/metro.json";
import TrainLines from "../utils/static/transportType/train.json";

class CompensationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      method: ""
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

  handleSubmit() {
    // Should send data to the web form here I guess
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          }}
        >
          {ETravelMethodsLabels.map(method => {
            return (
              <TouchableOpacity
                key={method}
                onPress={() => this.setState({ method: method })}
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
                      this.state.method === method ? "#D26283" : "lightgrey",
                    backgroundColor:
                      this.state.method === method ? "#D26283" : "white"
                  }}
                >
                  <Text
                    style={{
                      color: this.state.method === method ? "white" : "#222"
                    }}
                  >
                    {method[0]}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

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
              {/* Välj en{" "}
              {this.state.branch ? this.state.branch.Number : this.state.method}
              -linje */}

              {this.state.branch
                ? this.state.branch.GroupOfLine + " " + this.state.branch.Number
                : `Välj en ${this.state.method}-linje`}
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
            {this.state.method === "Spårvagn" &&
              TramLines.data.Result.map(branch => {
                return (
                  <TouchableOpacity
                    key={branch.Id}
                    onPress={() => {
                      this.setState({
                        branch: branch,
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
                        {branch.Number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

            {this.state.method === "Buss" &&
              BusLines.data.Result.map(branch => {
                return (
                  <TouchableOpacity
                    key={branch.Id}
                    onPress={() => {
                      this.setState({
                        branch: branch,
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
                        {branch.Number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

            {this.state.method === "Järnväg" &&
              TrainLines.data.Result.map(branch => {
                return (
                  <TouchableOpacity
                    key={branch.Id}
                    onPress={() => {
                      this.setState({
                        branch: branch,
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
                        {branch.Number}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

            {this.state.method === "Tunnelbana" &&
              MetroLines.data.Result.map(branch => {
                return (
                  <TouchableOpacity
                    key={branch.Id}
                    onPress={() => {
                      this.setState({
                        branch: branch,
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
                        {branch.Number}
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
      </ScrollView>
    );
  }
}

export default CompensationScreen;
