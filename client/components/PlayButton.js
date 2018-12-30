import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo';
import { AntDesign } from '@expo/vector-icons';
import layout from '../constants/Layout';
const { height, width } = layout.window;

export default class PlayButton extends Component {
  render() {
    const { onPress } = this.props;

    return (
        <LinearGradient
            colors={['#89f7fe', '#66a6ff']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4]}
            style={styles.playIconContainer}
        >
            <TouchableOpacity onPress={onPress}>
                <AntDesign
                    name='caretright'
                    size={40}
                    style={styles.playIcon}
                />
            </TouchableOpacity>
        </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
    playIconContainer: {
        position: 'absolute',
        bottom: 0.05 * width,
        right: 0.05 * width,
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderRadius: width,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowColor: '#66a6ff',
        shadowOpacity: 0.8,
        shadowRadius: 8,
    },
    playIcon: {
        color: 'white',
    }
});