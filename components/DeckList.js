import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  getDecks,
  getDeck,
  saveDeckTitle,
  addCardToDeck,
} from '../AsyncStorageHelpers';
import { lightPurp, white } from '../utils/colors';

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    // const textColor = this.props.selected ? 'red' : 'black';
    const { title, cardCount } = this.props;
    return (
      // <Text>{this.props.title}</Text>
      // <TouchableOpacity onPress={this._onPress}>
      //   <View>
      //     <Text style={styles.listItem}>{this.props.title}</Text>
      //   </View>
      // </TouchableOpacity>
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
  state = { selected: new Map(), decks: [] };

  _keyExtractor = (item, index) => item.title;
  // _keyExtractor = (item, index) => Math.random().toString();

  _onPressItem = (id, item) => {
    // console.log('id:', id);
    // updater functions are preferred for transactional updates
    this.setState(state => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });

    this.props.navigation.navigate('DeckDetails', { deck: item });
  };

  _renderItem = ({ item }) => {
    console.log('item:', item);
    return (
      <ListItem
        id={item.title}
        // id={Math.random().toString()}
        onPressItem={id => this._onPressItem(id, item)}
        // selected={!!this.state.selected.get(item.id)}
        title={item.title}
        cardCount={item.questions.length}
      />
    );
  };

  componentDidMount() {
    getDecks().then(decks => {
      if (decks) {
        this.setState({ decks: Object.values(decks) });
      }
    });
  }

  render() {
    if (this.state.decks.length === 0) {
      return (
        <View style={styles.container}>
          <Text>You don't have any decks yet!</Text>
        </View>
      );
    }

    // const jsDeck = getDeck('JavaScript');
    // console.log('jsDeck:', jsDeck);

    // saveDeckTitle('My New Deck');
    // const decks2 = getDecks();
    // console.log('Decks2:', decks2);

    // const card = {
    //   question: 'What is my question?',
    //   answer: 'This is my anwser',
    // };
    // addCardToDeck('My New Deck', card);
    // const decks3 = getDecks();
    // console.log('Decks3:', decks3);

    const { decks } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
        {/* <Button
          title="Go to Deck Details"
          onPress={() => this.props.navigation.navigate('DeckDetails')}
        /> */}
      </View>
    );
  }
}

export default DeckList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listItem: {
    flex: 1,
    backgroundColor: white,
    margin: 6,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
