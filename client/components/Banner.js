import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import bannerImg from '../assets/images/cookday.jpg';
import layout from '../constants/Layout';
const { height, width } = layout.window;

export default class Banner extends Component {
  render() {
    return (
      <View style={styles.bannerContainer}>
        <Image source={bannerImg} style={styles.bannerImg} />
        <View>
            <Text style={styles.titleText}>Learn Cooking from Zero to Master</Text>
            <Text style={styles.smallText}>Game Your Cooking Journey</Text>        
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    bannerContainer: {
        marginHorizontal: '6%',
        marginBottom: 28,
    },
    bannerImg: {
        borderRadius: 10,
        width: '100%',
        height: 0.65 * width,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 20,
        color: 'rgb(100, 100, 100)',
        marginBottom: 5,
    },
    smallText: {
        fontSize: 16,
        color: 'rgb(150, 150, 150)',
    }
})