import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import AuthForm from '../containers/AuthForm';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    console.log('yes');
  }

  render() {
    return (
      <ScrollView style={styles.scrollerContainer}>
        <AuthForm />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollerContainer: {
    backgroundColor: 'rgb(250, 250, 250)',
    paddingTop: 60,
    paddingLeft: '6%',
    paddingRight: '6%',
  },
})