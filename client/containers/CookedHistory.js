import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Query } from 'react-apollo';
import { GET_COOK_HISTORIES } from '../constants/GraphAPI';
import RecipeCard from '../components/RecipeCard';
// import CookHistoryCard from '../components/CookHistoryCard';

export default class CookedHistory extends Component {   
    render() {
        const { user } = this.props;

        return (
            <Query query={GET_COOK_HISTORIES} variables={{ user: user._id }} fetchPolicy='cache-and-network'>
                {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>{`Error!: ${error}`}</Text>;
                    return (
                        <View>
                            {
                                data.getCookedHistories.map(history => (
                                    <RecipeCard key={history._id} recipe={history.recipe} />
                                ))
                            }
                        </View>
                    );    
                }}
            </Query>
        )
    }
}

const styles = StyleSheet.create({

});