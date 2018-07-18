import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>What is the title of your new deck?</Text>
        <TextInput
          style={{
            height: 40,
            width: 200,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          placeholder="Title"
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button
          title="Submit"
          onPress={() => this.props.navigation.navigate('AddDeckDetails')}
        />
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
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default AddDeck;
