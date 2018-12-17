import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Animated } from 'react-native';
import UserProfile from '../components/UserProfile';
import { graphql } from 'react-apollo';
import { GET_CURRENT_USER } from '../constants/GraphAPI';

export class SettingsScreen extends React.Component {
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
      const { data } = this.props;
      if (!data.currentUser && !type.includes('BACK')) this.props.navigation.navigate('Welcome')
    } catch (err) {}
  }

  componentWillUnmount() {
    // Remove listener when destoyed
    this._subLoad.remove();
  }

  render() {
    const { data } = this.props;
    return (
        <View style={{ flex: 1 }}>
          <UserProfile user={data.currentUser} />
        </View>
    );
  }
}

export default graphql(GET_CURRENT_USER)(SettingsScreen);