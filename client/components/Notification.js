import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Notification extends Component {
    
    render() { 
        const { type, text } = this.props;
        return (
            <View style={styles.notiContainer}>
                <Text style={styles.notiText}>{text}</Text>
            </View>
        )
  }
}

const styles = StyleSheet.create({
    notiContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 88, 88, 1)',
        borderRadius: 20,
        paddingVertical: 10,
        zIndex: 10,
    },
    notiText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    }
})
