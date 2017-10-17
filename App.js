import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PixiView } from './components'

export default class App extends React.Component {
  state = {
    sceneLoaded: false
  };

  renderLoading = () => (
    <Expo.AppLoading />
  )
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PixiView onLoaded={() => this.setState({ sceneLoaded: true })} style={{ flex: 1 }} />
        {!this.state.sceneLoaded && this.renderLoading()}
      </View>
    );
  }
}