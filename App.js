import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  Platform,
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import AddQuestion from './components/AddQuestion';
import Deck from './components/Deck';
import Quiz from './components/Quiz';

import { Constants } from 'expo';
import { purple, gray, red, white } from './utils/colors';
import { resetStorage } from './utils/AsyncStorageHelpers';
import {
  clearLocalNotification,
  setLocalNotification,
} from './utils/notifications';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

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

export default class App extends React.Component {
  // async componentWillMount() {
  //   await resetStorage();
  // }

  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <Tabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center"
  },
});
