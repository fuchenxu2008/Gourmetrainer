import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { withNavigation } from 'react-navigation';

const { height, width } = Dimensions.get('window');

export class FeaturedCard extends Component {
  _handleClickRecipe = (_id) => {
    this.props.navigation.navigate('RecipeDetail', { _id })
  }

  render() {
    const { _id, albums, title } = this.props.recipe;

    return (
      <TouchableOpacity elevation={13} style={styles.featureCard} onPress={() => this._handleClickRecipe(_id)}>
        <Image source={{ uri: albums[0] }} style={styles.recipeImg} />
        <Text style={styles.recipeTitle}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

export default withNavigation(FeaturedCard);

const styles = StyleSheet.create({
  featureCard: {
    marginRight: 18,
  },
  recipeImg: {
    borderRadius: 10,
    width: 13 / 25 * width,
    height: 9 / 25 * width,
    marginBottom: 18,
  },
  recipeTitle: {
    // marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgb(70, 70, 70)'
  }
});