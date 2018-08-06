import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';

import { getDeck, saveDeckTitle } from '../utils/AsyncStorageHelpers';

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  async handleNewDeckSubmit(navigate) {
    const title = this.state.text;
    this.setState({ text: '' });
    if (title === '') {
      return;
    }

    await saveDeckTitle(title);
    const deck = await getDeck(title);
    // navigate('DecksTab', { screenProps: { decks } });
    navigate('DeckDetails', { deck });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View style={{ marginBottom: 24 }}>
          <TextInput
            style={styles.deckTitleInput}
            placeholder="   Title"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title="Create Deck"
            onPress={() => this.handleNewDeckSubmit(navigate)}
            style={{ margin: 24 }}
          />
        </View>
      </KeyboardAvoidingView>
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

export default AddDeck;
