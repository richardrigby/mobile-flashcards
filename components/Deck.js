import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Deck extends Component {
  render() {
    // const { title } = this.props;
    // console.log('title:', title);
    console.log('props:', this.props);

    return (
      <View>
        <Text>Deck</Text>
      </View>
    );
  }
}

export default Deck;
