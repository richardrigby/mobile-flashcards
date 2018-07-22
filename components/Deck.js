import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Deck extends Component {
  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length + ' cards'}</Text>
        <Button title="Add Card" />
        <Button title="Start Quiz" />>
      </View>
    );
  }
}

export default Deck;
