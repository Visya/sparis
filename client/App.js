import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from "react-native";
import axios from "axios";
import { white } from "ansi-colors";
import SlForm from './SlForm';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { firstName: "", lastName: "", password: "" };
  }

  handleSubmit() {
    const { firstName, lastName } = this.state;
    this.setState({
      submitted: true,
      message: `You submitted first-name: ${firstName} and last-name: ${lastName}`
    });

    // Example request were we would do the submit request

    // axios
    //   .get("https://jsonplaceholder.typicode.com/todos/1")
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    const { submitted, message } = this.state;

    return (
      <View style={styles.container}>
        <SlForm/>
        {/*<Text style={styles.topText}>SL-Broke App</Text>*/}
        {/*<TextInput*/}
          {/*style={styles.inputField}*/}
          {/*onChangeText={text => this.setState({ firstName: text })}*/}
          {/*value={this.state.firstName}*/}
          {/*placeholder="Firstname"*/}
        {/*/>*/}
        {/*<TextInput*/}
          {/*style={styles.inputField}*/}
          {/*onChangeText={text => this.setState({ lastName: text })}*/}
          {/*value={this.state.lastName}*/}
          {/*placeholder="Lastname"*/}
        {/*/>*/}
        {/*<TextInput*/}
          {/*style={styles.inputField}*/}
          {/*onChangeText={text => this.setState({ password: text })}*/}
          {/*value={this.state.password}*/}
          {/*placeholder="Password"*/}
          {/*secureTextEntry={true}*/}
        {/*/>*/}
        {/*<TouchableOpacity onPress={() => this.handleSubmit()}>*/}
          {/*<View style={styles.button}>*/}
            {/*<Text style={styles.buttonText}>Submit form</Text>*/}
          {/*</View>*/}
        {/*</TouchableOpacity>*/}
        {/*{submitted && <Text>{message}</Text>}*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
  },
  inputField: {
    marginTop: 10,
    padding: 18,
    color: "#222",
    width: 375,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgrey",
    fontSize: 18
  },
  button: {
    width: 375,
    marginTop: 20,
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 16
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16
  }
});
