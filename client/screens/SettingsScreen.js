import React from 'react';
import { Text, View } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  };

  render() {
    return (
      <View>
        <Text onPress={() => this.props.navigation.navigate('Auth')}>Settings</Text>
      </View>
    );
  }
}
