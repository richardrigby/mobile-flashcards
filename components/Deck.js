import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { purple, lightPurp } from '../utils/colors';

class Deck extends Component {
  handleAddCard = deck => {
    this.props.navigation.navigate('AddQuestion', { deck });
  };

  handleStartQuiz = deck => {
    this.props.navigation.navigate('Quiz', { deck });
  };

  render() {
    const { deck } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <Text style={styles.cardTitle}>{deck.title}</Text>
        <Text style={styles.cardNumber}>
          {deck.questions.length +
            (deck.questions.length === 1 ? ' card' : ' cards')}
        </Text>
        <Button title="Add Card" onPress={() => this.handleAddCard(deck)} />
        {!!deck.questions.length && (
          <Button
            title="Start Quiz"
            onPress={() => this.handleStartQuiz(deck)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 46,
    fontWeight: 'bold',
    marginBottom: 4,
    color: purple,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 44,
    color: lightPurp,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default Deck;
