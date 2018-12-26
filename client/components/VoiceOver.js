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
      <View style={styles.outestContainer}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => this._speakText(text)}>
          <MaterialCommunityIcons
            name='voice'
            size={33}
            color='rgb(70, 70, 70)'
          />
          <Text style={styles.voiceOverText}>Speak</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    outestContainer: {
      flex: 1,
      // backgroundColor: 'blue',
      paddingVertical: 10,
      alignItems: 'flex-end',
    },
    voiceOverText: {
      fontSize: 27,
      color: 'rgb(70, 70, 70)',
      marginLeft: '5%',
    }
});