import React, { Component } from "react";
import { WebView } from "react-native";

import { createScript, testData } from "./create-script";

class SlForm extends Component {
  render() {
    const { data = testData } = this.props;

    return (
      <WebView
        useWebKit={true}
        source={{
          uri:
            "https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning"
        }}
        style={{ marginTop: 20 }}
        injectedJavaScript={createScript(data)}
        onMessage={event => console.log(event.nativeEvent.data)}
        javaScriptEnabled={true}
      />
    );
  }
}

export default SlForm;
