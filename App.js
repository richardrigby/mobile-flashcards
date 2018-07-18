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
import Deck from './components/Deck';

import { Constants } from 'expo';
import { purple, gray, red, white } from './utils/colors';

import EntryDetail from './components/EntryDetail';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

// class AddDeckScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Add Deck!</Text>
//       </View>
//     );
//   }
// }

// const MainNavigator = createStackNavigator({
//   Home: {
//     screen: AddDeck
//   },
//   EntryDetail: {
//     screen: EntryDetail,
//     navigationOptions: {
//       headerTintColor: gray,
//       headerStyle: {
//         backgroundColor: purple
//       }
//     }
//   }
// });

// const Tabs = createBottomTabNavigator(
//   {
//     DeckList: {
//       screen: DeckList,
//       navigationOptions: {
//         title: "Deck List",
//         tabBarIcon: ({ tintColor }) => (
//           <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
//         )
//       }
//     },
//     AddDeck: {
//       screen: MainNavigator,
//       navigationOptions: {
//         title: "Add Deck",
//         tabBarIcon: ({ tintColor }) => (
//           <FontAwesome name="plus-square" size={30} color={tintColor} />
//         )
//       }
//     }
//   },
//   {
//     navigationOptions: {
//       header: null
//     },
//     tabBarOptions: {
//       activeTintColor: Platform.OS === "ios" ? purple : white,
//       style: {
//         height: 56,
//         backgroundColor: Platform.OS === "ios" ? white : purple,
//         shadowColor: "rgba(100, 100, 0, 0.54)",
//         shadowOffset: {
//           width: 0,
//           height: 18
//         },
//         shadowRadius: 6,
//         shadowOpacity: 1
//       }
//     }
//   }
// );

// class DeckDetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home Details!</Text>
//       </View>
//     );
//   }
// }

class SettingsDetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings Details!</Text>
      </View>
    );
  }
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
    navigationOptions: ({ navigation }) => ({
      title: '[deckTitle]',
    }),
  },
});

const AddDeckStack = createStackNavigator({
  AddDeck: {
    screen: AddDeck,
    navigationOptions: ({ navigation }) => ({
      title: 'Create New Deck',
    }),
  },
  AddDeckDetails: {
    screen: SettingsDetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: '[deckTitle]',
    }),
  },
});

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckStack,
      navigationOptions: {
        title: 'Deck List',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list" size={30} color={tintColor} />
        ),
      },
    },
    AddDeck: {
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
  render() {
    return (
      <View style={styles.container}>
        <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        {/* <MainNavigator /> */}
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
