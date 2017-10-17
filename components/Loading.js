import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';

export default class Loading extends Component {
  static defaultProps = {
    text: "Loading..."
  }
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{this.props.text}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    bottom: 0, 
    right: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center'
  }
});