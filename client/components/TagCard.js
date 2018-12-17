import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import layout from '../constants/Layout';
const { width } = layout.window;

export default class TagCard extends Component {
    render() {
        const { tag, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
                <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 10,
        backgroundColor: 'rgb(230, 230, 230)',
        width: width * 0.38,
        height: width * 0.5,
        margin: '3%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    tagText: {
        position: 'absolute',
        bottom: '20%',
    }
})