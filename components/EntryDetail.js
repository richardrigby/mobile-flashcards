import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { white } from "../utils/colors";

class EntryDetail extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>RESET</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  }
});

export default EntryDetail;
