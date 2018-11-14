import React from 'react'
import Title from '../components/Title'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import { Image, View, StyleSheet, AsyncStorage } from 'react-native'

class HomeScreen extends React.Component {
  constructor () {
    super()
    this.state = {
      data: {},
      dataLoaded: false
    }
  }

  componentDidMount () {
    this.getStorageData()
  }

  static navigationOptions = {
    header: null
  }

  async getStorageData () {
    const isEmpty = obj => {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
      }
      return true
    }

    const getData = async () => {
      let data = {}

      try {
        const ticketData = (await AsyncStorage.getItem('ticketData')) || 'none'
        const bankData = (await AsyncStorage.getItem('bankData')) || 'none'
        const contactData =
          (await AsyncStorage.getItem('contactData')) || 'none'

        data = {
          slCard: JSON.parse(ticketData),
          bankAccount: JSON.parse(bankData),
          contactInfo: JSON.parse(contactData)
        }
      } catch (error) {
        console.log(error.message)
      }

      return data
    }

    const cleanData = await getData()

    if (isEmpty(cleanData)) {
      this.setState({
        data: null,
        dataLoaded: true
      })
    } else {
      this.setState({
        data: cleanData,
        dataLoaded: true
      })
    }
  }

  validateData () {
    const { data } = this.state

    if (data === null) {
      return false
    }

    const whitelistedFields = {
      slCard: ['cardNumber', 'ticketType'],
      bankAccount: ['account', 'clearingNumber', 'type'],
      contactInfo: [
        'address',
        'city',
        'co',
        'country',
        'email',
        'firstname',
        'id',
        'phone',
        'surname',
        'zip'
      ]
    }

    const valFailed = category => {
      return whitelistedFields[category].some(
        field => data[category][field] !== ''
      )
    }

    return (
      valFailed('slCard') &&
      valFailed('bankAccount') &&
      valFailed('contactInfo')
    )
  }

  render () {
    const { navigate } = this.props.navigation
    const { dataLoaded } = this.state

    return (
      <View style={styles.ScreenWrapper}>
        <Image
          style={styles.Image}
          source={require('../assets/img/home.jpg')}
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
              navigate(this.validateData() ? 'Compensation' : 'InfoTicket', {})
            }
          >
            Nu kör vi!
          </Button>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Image: {
    width: 250,
    height: 250
  },
  ScreenWrapper: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  Paragraph: {
    textAlign: 'center',
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 20,
    opacity: 0.85
  }
})

export default HomeScreen
