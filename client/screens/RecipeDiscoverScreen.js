import React, { Component } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import SearchBar from '../components/SearchBar';
import RecipeSearchResult from '../containers/RecipeSearchResult';
import FeaturedRecipes from '../containers/FeaturedRecipes';

export default class RecipeDiscoverScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    search_title: ''
  }

  componentDidMount() {
    // this.props.navigation.navigate('Settings')
  }

  _handleInputChange = (title) => {
    this.setState({ search_title: title })
  }

  render() {
    const { search_title } = this.state;

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerSection}>
          <SearchBar
            onInputChange={this._handleInputChange}
            placeholder='What you wanna cook?'
            keywords={this.state.search_title}
          />
          <RecipeSearchResult title={search_title} limit={5} />
        </View>
        <Text style={styles.heading}>Featured</Text>
        <FeaturedRecipes limit={15} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 40,
    backgroundColor: 'rgb(250, 250, 250)',
  },
  headerSection: {
    paddingLeft: '6%',
    paddingRight: '6%',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'color: rgb(70, 70, 70)',
    marginBottom: 10,
    paddingLeft: '6%',
    paddingRight: '6%',
    // fontFamily: 'Iowan Old Style'
  }
});