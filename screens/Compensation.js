import React from 'react'
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet
} from 'react-native'

import { ETimeFrames, ETravelTypesLabels } from '../utils/enums'
import SlForm from '../components/SlForm'
import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'

import Button from '../components/Button'
import Title from '../components/Title'
import Paragraph from '../components/Paragraph'

import BusLines from '../utils/static/transportType/bus.json'
import TramLines from '../utils/static/transportType/tram.json'
import MetroLines from '../utils/static/transportType/metro.json'
import TrainLines from '../utils/static/transportType/train.json'

import BusStations from '../utils/static/lineStops/112.json'

class CompensationScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      type: '',
      line: '',
      hasError: false
    }

    this.handleError = this.handleError.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const { navigate } = navigation
    return {
      title: '',
      headerLeft: <HeaderLeft navigate={navigate} />,
      headerRight: <HeaderRight navigate={navigate} />
    }
  }

  async handleSubmit () {
    const getTicketData = async () => {
      let ticketData = ''
      try {
        ticketData = (await AsyncStorage.getItem('ticketData')) || 'none'
      } catch (error) {
        // Error retrieving data
        console.log(error.message)
      }
      return JSON.parse(ticketData)
    }

    const getBankData = async () => {
      let bankData = ''
      try {
        bankData = (await AsyncStorage.getItem('bankData')) || 'none'
      } catch (error) {
        // Error retrieving data
        console.log(error.message)
      }
      return JSON.parse(bankData)
    }

    const getContactData = async () => {
      let contactData = ''
      try {
        contactData = (await AsyncStorage.getItem('contactData')) || 'none'
      } catch (error) {
        // Error retrieving data
        console.log(error.message)
      }
      return JSON.parse(contactData)
    }

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
    }

    this.setState({
      data: storageData,
      submitted: true,
      hasError: false
    })
  }

  handleError (message) {
    this.setState({
      hasError: true,
      error: message
    })
  }

  handleSuccess () {
    const { navigate } = this.props.navigation

    navigate('Yay', {})
  }

  render () {
    return (
      <View
        style={[
          styles.ScreenWrapper,
          { backgroundColor: this.state.hasError ? 'rgba(0,0,0,0)' : 'white' }
        ]}
      >
        {!this.state.hasError && (
          <ScrollView>
            <Image
              style={styles.Image}
              source={require('../assets/img/money.png')}
            />
            <Title>Be om Förseningsersättning</Title>
            <Paragraph>
              Fyll i informationen nedan för att be om förseningsersättning.
            </Paragraph>

            <View style={styles.ChoiceWrapper}>
              {ETravelTypesLabels.map(type => {
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => this.setState({ type: type })}
                  >
                    <View
                      style={[
                        styles.Choice,
                        {
                          borderColor:
                            this.state.type === type ? '#222222' : 'lightgrey',
                          backgroundColor:
                            this.state.type === type ? '#222222' : 'white'
                        }
                      ]}
                    >
                      <Text
                        style={{
                          color: this.state.type === type ? 'white' : '#222'
                        }}
                      >
                        {type[0]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>

            {/* line you were going on */}
            <TouchableOpacity
              onPress={() =>
                this.setState({ dropdown: !this.state.dropdown })
              }
            >
              <View style={styles.DropdownButton}>
                <Text>
                  {this.state.line
                    ? this.state.line.GroupOfLine + ' ' + this.state.line.Number
                    : `Välj en ${this.state.type}-linje`}
                </Text>
                {this.state.dropdown ? <Text>-</Text> : <Text>+</Text>}
              </View>
            </TouchableOpacity>

            {this.state.dropdown && (
              <View style={styles.DropdownList}>
                {this.state.type === 'Spårvagn' &&
                  TramLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
                            dropdown: false
                          })
                        }}
                      >
                        <View style={styles.DropdownItem}>
                          <Text style={styles.DropdownItemText}>
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}

                {this.state.type === 'Buss' &&
                  BusLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
                            dropdown: false
                          })
                        }}
                      >
                        <View style={styles.DropdownItem}>
                          <Text style={styles.DropdownItemText}>
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}

                {this.state.type === 'Järnväg' &&
                  TrainLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
                            dropdown: false
                          })
                        }}
                      >
                        <View style={styles.DropdownItem}>
                          <Text style={styles.DropdownItemText}>
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}

                {this.state.type === 'Tunnelbana' &&
                  MetroLines.data.Result.map(line => {
                    return (
                      <TouchableOpacity
                        key={line.Id}
                        onPress={() => {
                          this.setState({
                            line: line,
                            dropdown: false
                          })
                        }}
                      >
                        <View style={styles.DropdownItem}>
                          <Text style={styles.DropdownItemText}>
                            {line.Number}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
              </View>
            )}

            {/* Destination */}
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dropdown2: !this.state.dropdown2
                })
              }
            >
              <View style={styles.DropdownButton}>
                <Text>
                  {this.state.from ? this.state.from : 'Din startstation'}
                </Text>
                {this.state.dropdown2 ? <Text>-</Text> : <Text>+</Text>}
              </View>
            </TouchableOpacity>

            {this.state.dropdown2 && (
              <View style={styles.DropdownList}>
                {BusStations.data.Result.map(station => {
                  return (
                    <TouchableOpacity
                      key={station.Name + station.Number}
                      onPress={() => {
                        this.setState({
                          from: station.Name,
                          dropdown2: false
                        })
                      }}
                    >
                      <View style={styles.DropdownItem}>
                        <Text style={styles.DropdownItemText}>
                          {station.Name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}

            {/* to */}
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dropdown3: !this.state.dropdown3
                })
              }
            >
              <View style={styles.DropdownButton}>
                <Text>{this.state.to ? this.state.to : 'Din slutstation'}</Text>
                {this.state.dropdown3 ? <Text>-</Text> : <Text>+</Text>}
              </View>
            </TouchableOpacity>

            {this.state.dropdown3 && (
              <View style={styles.DropdownList}>
                {BusStations.data.Result.map(station => {
                  return (
                    <TouchableOpacity
                      key={station.Name + station.Number}
                      onPress={() => {
                        this.setState({
                          to: station.Name,
                          dropdown3: false
                        })
                      }}
                    >
                      <View style={styles.DropdownItem}>
                        <Text style={styles.DropdownItemText}>
                          {station.Name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}

            {/* Timepoint when it occured */}
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  dropdown4: !this.state.dropdown4
                })
              }
            >
              <View style={styles.DropdownButton}>
                <Text>{this.state.time ? this.state.time : 'Tidpunkt'}</Text>
                {this.state.dropdown4 ? <Text>-</Text> : <Text>+</Text>}
              </View>
            </TouchableOpacity>

            {this.state.dropdown4 && (
              <View style={styles.DropdownList}>
                {ETimeFrames.map(time => {
                  return (
                    <TouchableOpacity
                      key={time}
                      onPress={() => {
                        this.setState({
                          time: time,
                          dropdown4: false
                        })
                      }}
                    >
                      <View style={styles.DropdownItem}>
                        <Text style={styles.DropdownItemText}>{time}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            )}

            <View
              style={{
                flex: 2,
                alignItems: 'center'
              }}
            >
              <Button
                submit
                disabled={this.state.submitted}
                onClick={() => this.handleSubmit()}
              >
                {this.state.submitted ? 'Laddar...' : 'Begär ersättning'}
              </Button>
            </View>
          </ScrollView>
        )}
        {this.state.submitted && (
          <View
            style={
              !this.state.hasError ? { display: 'none', flex: 1 } : { flex: 1 }
            }
          >
            <Text style={styles.ErrorText}>
              Var vänlig och fyll i formuläret korrekt: {this.state.error}
            </Text>
            <SlForm
              data={this.state.data}
              handleSuccess={this.handleSuccess}
              handleError={this.handleError}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flex: 1,
    flexDirection: 'column',
    padding: 20
  },
  Image: {
    width: 195,
    height: 195,
    alignSelf: 'center',
    marginBottom: 32
  },
  ChoiceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  Choice: {
    padding: 25,
    paddingLeft: 30,
    borderRadius: 5,
    paddingRight: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  DropdownButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  DropdownList: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
  },
  DropdownItem: {
    padding: 10,
    backgroundColor: '#f3f3f3',
    marginBottom: 10,
    borderRadius: 3
  },
  DropdownItemText: {
    color: '#222',
    fontSize: 16
  },

  ErrorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#912b4a'
  }
})

export default CompensationScreen
