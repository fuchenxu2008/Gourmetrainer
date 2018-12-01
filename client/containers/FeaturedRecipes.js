import React, { Component } from 'react'
import { View, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipeCard from "../components/RecipeCard";

const GET_FEATURED = gql`
    query SearchRecipes($limit: Int) {
        getRecipes(limit: $limit) {
            _id
            title
            albums
            tags
        }
    }
`;

export default class FeaturedRecipes extends Component {
  render() {
    const { limit } = this.props;
    return (
        <View style={{ paddingBottom: 30 }}>
            <Query query={GET_FEATURED} variables={{ limit }}>
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
