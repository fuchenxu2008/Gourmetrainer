import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Speech } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class VoiceOver extends Component {
  _speakText = (text) => {
    Speech.speak(text, {
      language: 'zh-Hans'
    })
  }

  render() {
    const { text } = this.props;

    return (
      <TouchableOpacity style={styles.outestContainer} onPress={() => this._speakText(text)}>
        <MaterialCommunityIcons
          name='voice'
          size={33}
          color='rgb(70, 70, 70)'
        />
        <Text style={styles.voiceOverText}>VoiceOver</Text>
      </TouchableOpacity>
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
    voiceOverText: {
      fontSize: 27,
      color: 'rgb(70, 70, 70)',
      marginLeft: '5%',
    }
});