import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Query } from 'react-apollo';
import { GET_RECIPES_BY_LEVEL } from '../constants/GraphAPI';
import LevelCard from '../components/LevelCard';
import layout from '../constants/Layout';
const { width, height } = layout.window;

export default class TagCenter extends Component {
    static navigationOptions = {
        header: null,
    };

    _handleEnterRecipe = (_id) => {
        this.props.navigation.navigate('RecipeDetail', { _id })
    }

    _handleEnterCooking = (_id) => {
        this.props.navigation.navigate('RecipeDetail', { _id, autoCook: true })
    }

    render() {
        const { tag } = this.props.navigation.state.params;
        const levelSet = [1, 2, 3, 4, 5];

        return (
            <ScrollView style={styles.outestContainer} contentContainerStyle={{ paddingBottom: 0.1 * height }}>
                <View style={styles.headerSection}>
                    <Text style={styles.titleTag}>{tag}</Text>
                </View>
                {
                    levelSet.map(level => (
                        <Query key={`level-${level}`} query={GET_RECIPES_BY_LEVEL} variables={{ tags: tag, level }}>
                            {({ data, loading, error }) => {
                                if (loading) return <Text>Loading...</Text>;
                                if (error) return <Text>{`Error!: ${error}`}</Text>;

                                return (
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.levelScroller}
                                        contentContainerStyle={styles.levelScrollerContainer}
                                        pagingEnabled={true}
                                    >
                                        {
                                            data.getRecipes.map((recipe, i) => (
                                                <LevelCard
                                                    key={`${level}-${i}`}
                                                    recipe={recipe}
                                                    level={level}
                                                    onPressImage={this._handleEnterRecipe}
                                                    onPressDetail={this._handleEnterCooking}
                                                />
                                            ))
                                        }
                                    </ScrollView>
                                )
                            }}
                        </Query>
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        backgroundColor: 'rgb(251, 251, 251)',
        flex: 1,
        paddingTop: 70,
    },
    headerSection: {
        paddingHorizontal: '6%',
        marginBottom: 30,
    },
    titleTag: {
        fontWeight: 'bold',
        fontSize: 35,
    },
    levelScroller: {
        flex: 1,
        marginBottom: 15,
        paddingVertical: 10,
    },
    levelScrollerContainer: {
        paddingLeft: 0.06 * width,
        // paddingRight: 0.02 * width,
    }
});