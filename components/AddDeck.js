import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  handleNewDeckSubmit(navigate) {
    if (this.state.text === '') {
      return;
    }
    navigate('AddDeckDetails', { title: this.state.text });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <View style={{ marginBottom: 24 }}>
          <TextInput
            style={styles.deckTitleInput}
            placeholder="   Title"
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
          <Button
            title="Submit"
            onPress={() => this.handleNewDeckSubmit(navigate)}
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

export default AddDeck;
