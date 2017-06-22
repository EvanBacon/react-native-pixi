import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GLScene from './GLScene'
export default class App extends React.Component {
  render() {
    return (
      <View>
      <GLScene style={{flex: 1}} />
      </View>
    );
  }
}