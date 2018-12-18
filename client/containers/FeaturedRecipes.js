import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Query } from 'react-apollo';
import FeaturedCard from "../components/FeaturedCard";
import layout from '../constants/Layout';
import { GET_FEATURED } from '../constants/GraphAPI';


const { width, height } = layout.window;

export default class FeaturedRecipes extends Component {
  render() {
    const { limit } = this.props;
    return (
        <View>
            <Query query={GET_FEATURED} variables={{ limit }} fetchPolicy='cache-and-network'>
                {({ loading, error, data }) => {
                    if (loading) return <Text style={styles.scrollContainer}>Loading...</Text>;
                    if (error) return <Text style={styles.scrollContainer}>{`Error!: ${error}`}</Text>;

                    return (
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                            {
                                data.getRandomRecipes.map(recipe => (
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
