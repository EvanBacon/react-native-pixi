import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PixiScene from './PixiScene'

export default class App extends React.Component {
  render() {
    return (
      <PixiScene style={{flex: 1, backgroundColor: 'gray'}} />
    );
  }
}