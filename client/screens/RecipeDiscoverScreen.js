import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import RecipeSearchResult from '../components/RecipeSearchResult';

export default class RecipeDiscoverScreen extends Component {
  static navigationOptions = {
    title: 'Discover',
  };

  state = {
    search_title: '锅包肉'
  }

  _handleInputChange = (title) => {
    this.setState({ search_title: title })
  }

  render() {
    const { search_title } = this.state;

    return (
      <ScrollView>
        <TextInput
          onChangeText={this._handleInputChange}
          value={search_title}
          style={styles.searchInput}
        />
        <RecipeSearchResult title={search_title} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  searchInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    borderRadius: 10
  }
});