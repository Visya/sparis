import React, { Component } from 'react';
import { WebView } from 'react-native';

const testData = {
  "data.issue.ext.compensation_type": "priceDeduction",
  "data.issue.compensation.type.priceDeduction.delay": "40-60",
  "#price_deduction_ticket_type": "",
  "data.issue.date": 0,
  "data.issue.time": "12:34",
  "data.issue.travel.type": 0,
  "data.traffic_line_range": 0,
  "data.issue.travel.line": 0,
  "#from": 0,
  "#from:nth-child(2)": 0,
  "data.issue.travel.destination": "Test",
  "data.issue.comment": "This is a test comment.",
  "data.issue.ticket.type": "Biljett på SL Access-kort",
  "travel_card.serial_number1": "12345",
  "travel_card.serial_number2": "54321",
  "delay": "60",
  "data.issue.compensation.from": "Brommaplan",
  "data.issue.compensation.to": "Färentunavägen",
};

const script = `
$('[name="data.issue.ext.compensation_type"]').val('priceDeduction').change();
$('[name="data.issue.compensation.type.priceDeduction.delay"').val('20-40').change();
//$('.refund-form [type="submit"]').click();
//$('#refundFormReceipt .button-primary').click();
`;

class SlForm extends Component {
  render() {
    return (
      <WebView
        useWebKit={true}
        source={{ uri: 'https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning' }}
        style={{ marginTop: 20 }}
        injectedJavaScript={script}
      />
    );
  }
}

export default SlForm;

// https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning/
