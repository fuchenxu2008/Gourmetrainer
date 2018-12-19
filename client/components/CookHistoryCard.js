import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';


export default class CookHistoryCard extends Component {
  render() {
    const { recipe } = this.props.history;
    const { _id, title, tags, albums } = recipe;
 
    return (
      <View>
        <Text>{title}</Text>
        <Text>{tags}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});