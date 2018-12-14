import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Animated } from 'react-native';
import UserProfile from '../components/UserProfile';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.load();
    this._subLoad = this.props.navigation.addListener('willFocus', this.load)
  }

  // Called everytime the page is displayed
  load = (payload) => {
    try {
      const { type } = payload.action;
      // if (!type.includes('BACK')) this.props.navigation.navigate('Welcome')
    } catch (err) {}
  }

  componentWillUnmount() {
    // Remove listener when destoyed
    this._subLoad.remove();
  }

  render() {
    return (
        <UserProfile />
    );
  }
}