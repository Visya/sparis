import React, { Component } from 'react';
import { WebView } from 'react-native';

const script = `
$('[name="data.issue.ext.compensation_type"]').val('ticket').change();
$('.refund-form [type="submit"]').click();
$('#refundFormReceipt .button-primary').click();
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
