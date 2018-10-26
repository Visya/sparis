import React, { Component } from 'react';
import { WebView } from 'react-native';

import { createScript, testData } from './WebForm';


const data = {
  slCard: { tickeType: "årsbiljet, vuxen", cardNumber: "1234554321" },
  bankAccount: { type: "Bankkonto", clearingNumber: "12345", account: "12345" },
  contactInfo: {
    id: "199001203434",
    name: "Marcus",
    surname: "Mson",
    co: "Alissa A",
    address: "Kungsgatan 2",
    zip: "12345",
    city: "Nacka",
    country: "Sverige",
    email: "m@i.com",
    phone: "0791234556"
  },
  delayInfo: {
    type: "Buss",
    line: "302",
    from: "Cityterrminalen",
    to: "Broparken",
    delayTime: "20-39 minuter"
  }
};

class SlForm extends Component {
  render() {
    return (
      <WebView
        useWebKit={true}
        source={{ uri: 'https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning' }}
        style={{ marginTop: 20 }}
        injectedJavaScript={createScript(data)}
        onMessage={ (event) => console.log(event.nativeEvent.data) }
        javaScriptEnabled={true}
      />
    );
  }
}

export default SlForm;

// https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning/
