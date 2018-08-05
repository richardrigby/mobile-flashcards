import React, { Component } from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import _ from 'lodash';
import { getDecks } from '../utils/AsyncStorageHelpers';
import { lightPurp, white, orange } from '../utils/colors';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const { title, cardCount } = this.props;
    return (
      <View style={styles.listItem}>
        <Button
          title={title + ' (' + cardCount + ' cards)'}
          onPress={this._onPress}
        />
      </View>
    );
  }
}

class DeckList extends Component {
  state = { decks: [] };

  _keyExtractor = (item, index) => item.title;

  _onPressItem = (id, item) => {
    this.props.navigation.navigate('DeckDetails', { deck: item });
  };

  _renderItem = ({ item }) => {
    return (
      <ListItem
        id={item.title}
        onPressItem={id => this._onPressItem(id, item)}
        title={item.title}
        cardCount={item.questions.length}
      />
    );
  };

  getDeckList = async () => {
    const decks = await getDecks();
    this.setState({ decks: Object.values(decks) });
  };

  componentDidMount() {
    // getDecks().then(decks => {
    //   if (decks) {
    //     this.setState({ decks: Object.values(decks) });
    //   }
    // });
    this.props.navigation.addListener('willFocus', () => this.getDeckList());
  }

  render() {
    const { decks } = this.state;

    if (decks.length === 0) {
      return (
        <View style={styles.container}>
          <Text>You don't have any decks yet!</Text>
        </View>
      );
    }

    return (
      <View style={styles.ListContainer}>
        <FlatList
          data={Object.values(decks)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default DeckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ListContainer: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    backgroundColor: white,
    borderRadius: 4,
    margin: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
