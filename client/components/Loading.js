import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loadingBg}>
            <ActivityIndicator size="large" color="rgb(70, 70, 70)" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingBg: {
        backgroundColor: 'rgba(235, 235, 235, .9)',
        borderRadius: 10,
        paddingLeft: 2.5 + 10,
        paddingTop: 2.5 + 10,
        paddingRight: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})