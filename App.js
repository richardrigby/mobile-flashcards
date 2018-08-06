import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { Constants } from 'expo';
import Tabs from './components/Tabs';
import { purple } from './utils/colors';
import { setLocalNotification } from './utils/notifications';
import { resetStorage } from './utils/AsyncStorageHelpers';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  async componentWillMount() {
    await resetStorage();
  }

  componentDidMount() {
    setLocalNotification();
  }

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
  },
});
