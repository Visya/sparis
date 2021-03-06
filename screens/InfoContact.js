import React from 'react'
import {
  View,
  ScrollView,
  TextInput,
  AsyncStorage,
  Image,
  StyleSheet
} from 'react-native'
import KeyboardAvoid from '../components/KeyboardAvoid'
import Button from '../components/Button'
import Title from '../components/Title'

class InfoContactScreen extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {
    this.getStorageData()
  }

  static navigationOptions = {
    title: 'Spåris',
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#D26283'
    }
  }

  navigateAndSave () {
    const { navigate } = this.props.navigation

    const saveContactData = async cardNumber => {
      try {
        await AsyncStorage.setItem(
          'contactData',
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
        )
      } catch (error) {
        // Error retrieving data
        console.log(error.message)
      }
    }

    saveContactData()
    navigate('Compensation', {})
  }

  async getStorageData () {
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

    const contactData = await getContactData()
    const {
      address,
      city,
      co,
      country,
      email,
      id,
      phone,
      surname,
      firstname,
      zip
    } = contactData

    this.setState({
      adress: address || '',
      city: city || '',
      co: co || '',
      country: country || '',
      email: email || '',
      id: id || '',
      phone: phone || '',
      firstname: firstname || '',
      surname: surname || '',
      zip: zip || ''
    })
  }

  render () {
    return (
      <KeyboardAvoid style={styles.ScreenWrapper}>
        <ScrollView>
          <Image
            style={styles.Image}
            source={require('../assets/img/contactinfo.png')}
          />
          <Title>Dina kontaktuppgifter</Title>

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Förnamn'
            onChangeText={text => this.setState({ firstname: text })}
            value={this.state.firstname}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Efternamn'
            onChangeText={text => this.setState({ surname: text })}
            value={this.state.surname}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Personnummer'
            onChangeText={text => this.setState({ id: text })}
            value={this.state.id}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Telefonnummer'
            onChangeText={text => this.setState({ phone: text })}
            value={this.state.phone}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='C/O'
            onChangeText={text => this.setState({ co: text })}
            value={this.state.co}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Gatuadress'
            onChangeText={text => this.setState({ adress: text })}
            value={this.state.adress}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Postnummer'
            onChangeText={text => this.setState({ zip: text })}
            value={this.state.zip}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Ort'
            onChangeText={text => this.setState({ city: text })}
            value={this.state.city}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='Land'
            onChangeText={text => this.setState({ country: text })}
            value={this.state.country}
          />

          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            style={styles.InputField}
            placeholder='E-postadress'
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />

          <View
            style={{
              flex: 2,
              alignItems: 'center'
            }}
          >
            <Button onClick={() => this.navigateAndSave()}>Gå vidare</Button>
          </View>
        </ScrollView>
      </KeyboardAvoid>
    )
  }
}

const styles = StyleSheet.create({
  ScreenWrapper: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: 'white'
  },
  Image: {
    width: 195,
    height: 195,
    alignSelf: 'center',
    marginBottom: 32
  },
  InputField: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export default InfoContactScreen
