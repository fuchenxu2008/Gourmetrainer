import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import RecipeSearchResult from '../containers/RecipeSearchResult';
import FeaturedRecipes from '../containers/FeaturedRecipes';
import Banner from '../components/Banner.js';
import layout from '../constants/Layout';
const { height } = layout.window;

export default class RecipeDiscoverScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  // Go to search screen on tapping searchbar
  _handleBeginSearch = () => {
    this.props.navigation.navigate('Search')
  }

  render() {
    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 0.05 * height }}>
        <View style={styles.headerSection} onPress={this._handleBeginSearch}>
          <SearchBar
            placeholder='What you wanna cook?'
            onFocus={this._handleBeginSearch}
          />
        </View>
        <Text style={styles.heading}>Cook Now</Text>
        <Banner />
        <Text style={styles.heading}>Featured</Text>
        <FeaturedRecipes limit={15} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 40,
    backgroundColor: 'rgb(251, 251, 251)',
  },
  headerSection: {
    marginHorizontal: '6%',
  },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'color: rgb(70, 70, 70)',
    marginBottom: 18,
    paddingLeft: '6%',
    paddingRight: '6%',
    // fontFamily: 'Iowan Old Style'
  }
});