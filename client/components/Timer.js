import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Timer extends Component {
  render() {
    return (
      <View style={styles.outestContainer}>
        <Ionicons name='ios-timer' size={36} />
        <Text style={styles.timerText}>Timer</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    outestContainer: {
        // flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'blue',
        borderRadius: 16,
        paddingVertical: 10,
    },
    timerText: {
      fontSize: 27,
      color: 'rgb(70, 70, 70)',
      marginLeft: '5%',
    }
});