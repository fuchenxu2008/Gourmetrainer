import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Query } from 'react-apollo';
import { GET_COOK_HISTORIES } from '../constants/GraphAPI';
import RecipeCard from '../components/RecipeCard';
import Loading from '../components/Loading';
import layout from '../constants/Layout';
const { width, height } = layout.window;

export default class CookedHistory extends Component {   
    render() {
        const { user } = this.props;

        return (
            <View style={{ minHeight: 1 / 2 * height }}>
                <Query query={GET_COOK_HISTORIES} variables={{ user: user._id }} fetchPolicy='cache-and-network'>
                    {({ loading, error, data }) => {
                        if (loading) return <Loading />;
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
            </View>
        )
    }
}

const styles = StyleSheet.create({

});