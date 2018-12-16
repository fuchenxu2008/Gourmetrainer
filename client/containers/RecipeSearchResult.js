import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import RecipeCard from "../components/RecipeCard";
import { SEARCH_RECIPES } from '../constants/GraphAPI';
import layout from '../constants/Layout';
const { height } = layout.window;

export default class RecipeSearchResult extends Component {
  render() {    
    const { title, tags, limit } = this.props;
    if (!title || title === '') return null;
    return (
        <ScrollView style={styles.searchContainer}>
            <Query query={SEARCH_RECIPES} variables={{ title, tags, limit }}>
                {({ loading, error, data }) => {
                    if (loading) return <Text>No results</Text>;
                    if (error) return <Text>{`Error!: ${error}`}</Text>;

                    return (
                  
                            data.getRecipes.map(recipe => (
                                <RecipeCard recipe={recipe} key={recipe._id} />
                            ))
          
                    )
                }}
            </Query>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
    searchContainer: {
        paddingHorizontal: '6%',
        paddingBottom: height * 0.1,
        // backgroundColor: 'red',
    }
})