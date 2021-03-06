import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import RecipeCard from "../components/RecipeCard";
import { SEARCH_RECIPES } from '../constants/GraphAPI';
import layout from '../constants/Layout';
import Loading from '../components/Loading';
const { height } = layout.window;

export default class RecipeSearchResult extends Component {
  render() {    
    let { term, limit } = this.props;
    if (!term) return null;
    let title = '';
    let tags = '';
    term.startsWith('#')
        ? tags = term.trim().split('#')[1]
        : title = term;

    return (
        <ScrollView style={styles.searchContainer}>
            <View style={{ minHeight: 1 / 2 * height }}>
                <Query query={SEARCH_RECIPES} variables={{ title, tags, limit }} fetchPolicy='cache-and-network'>
                    {({ loading, error, data }) => {
                        if (loading) return <Loading />;
                        if (error) return <Text>{`Error!: ${error}`}</Text>;

                        return (
                            data.getRecipes.map(recipe => (
                                <RecipeCard recipe={recipe} key={recipe._id} />
                            ))
                        )
                    }}
                </Query>
            </View>
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