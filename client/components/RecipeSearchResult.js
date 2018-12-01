import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipeCard from "./RecipeCard";

const SEARCH_RECIPES = gql `
    query SearchRecipes($title: String, $tags: String) {
        getRecipes(title: $title, tags: $tags) {
            _id
            title
            albums
            tags
        }
    }
`;

export default class RecipeSearchResult extends Component {
  render() {    
    const { title, tags } = this.props;

    return (
        <View style={{ paddingBottom: 30 }}>
            <Query query={SEARCH_RECIPES} variables={{ title, tags }}>
                {({ loading, error, data }) => {
                    if (loading) return <Text>No results</Text>;
                    if (error) return <Text>{`Error!: ${error}`}</Text>;

                    return data.getRecipes.map(recipe => (
                        <RecipeCard recipe={recipe} key={recipe._id} />
                    ))
                }}
            </Query>
        </View>
    )
  }
}
