import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { addCardToDeck, getDeck } from '../utils/AsyncStorageHelpers';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      anwser: '',
      deck: props.navigation.state.params.deck,
      deckTitle: props.navigation.state.params.deck.title,
    };
  }

  async handleNewCardSubmit(navigate) {
    if (this.state.question === '' || this.state.anwser === '') {
      return;
    }

    const question = this.state.question;
    const answer = this.state.anwser;
    const deckTitle = this.state.deckTitle;

    const card = {
      question,
      answer,
    };

    await addCardToDeck(deckTitle, card);
    const deck = await getDeck(deckTitle);
    navigate('DeckDetails', { deck });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { deckTitle } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deckTitle}</Text>
        <View style={{ marginBottom: 24 }}>
          <TextInput
            style={styles.deckTitleInput}
            placeholder="   Question"
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
          <TextInput
            style={styles.deckTitleInput}
            placeholder="   Anwser"
            onChangeText={anwser => this.setState({ anwser })}
            value={this.state.anwser}
          />
          <Button
            title="Submit"
            onPress={() => this.handleNewCardSubmit(navigate)}
            style={{ margin: 24 }}
          />
        </View>
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
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  deckTitleInput: {
    height: 40,
    width: 260,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
  },
});

export default AddQuestion;
