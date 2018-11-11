import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const HeaderLeft = props => (
  <TouchableOpacity onPress={() => props.navigate('Home', {})}>
    <View
      style={{
        paddingLeft: 16,
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: '600'
        }}
      >
        Spåris
      </Text>
    </View>
  </TouchableOpacity>
)

export default HeaderLeft
