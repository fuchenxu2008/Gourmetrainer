import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import FeaturedCard from "../components/FeaturedCard";

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

const { width, height } = Dimensions.get('window');

export default class FeaturedRecipes extends Component {
  render() {
    const { limit } = this.props;
    return (
        <View>
            <Query query={GET_FEATURED} variables={{ limit }}>
                {({ loading, error, data }) => {
                    if (loading) return <Text style={styles.scrollContainer}>No results</Text>;
                    if (error) return <Text style={styles.scrollContainer}>{`Error!: ${error}`}</Text>;

                    return (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                            {
                                data.getRecipes.map(recipe => (
                                    <FeaturedCard recipe={recipe} key={recipe._id} />
                                ))
                            }
                        </ScrollView>
                    );
                }}
            </Query>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingLeft: 0.06 * width,
        paddingRight: 0.02 * width,
    }
})
