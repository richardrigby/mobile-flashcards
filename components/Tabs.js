import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import DeckList from './DeckList';
import AddDeck from './AddDeck';
import AddQuestion from './AddQuestion';
import Deck from './Deck';
import Quiz from './Quiz';

const DeckStack = createStackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck List',
    }),
  },
  DeckDetails: {
    screen: Deck,
    // navigationOptions: ({ navigation }) => ({
    //   title: navigation.state.params.deck.title,
    // }),
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: ({ navigation }) => ({
      title: 'Add Card',
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
    }),
  },
});

const AddDeckStack = createStackNavigator({
  AddDeckView: {
    screen: AddDeck,
    navigationOptions: ({ navigation }) => ({
      title: 'Create New Deck',
    }),
  },
});

const Tabs = createBottomTabNavigator(
  {
    DecksTab: {
      screen: DeckStack,
      navigationOptions: {
        title: 'Deck List',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list" size={30} color={tintColor} />
        ),
      },
    },
    AddDeckTab: {
      screen: AddDeckStack,
      navigationOptions: {
        title: 'Add Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add-circle" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    /* Other configuration remains unchanged */
  }
);

export default Tabs;
