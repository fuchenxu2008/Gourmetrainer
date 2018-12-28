import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import { Query } from 'react-apollo';
import { GET_RECIPES_BY_LEVEL } from '../constants/GraphAPI';
import LevelCard from '../components/LevelCard';
import layout from '../constants/Layout';
const { width, height } = layout.window;

const levelSet = [1, 2, 3, 4, 5];

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

        return (
            <ScrollView style={styles.outestContainer} contentContainerStyle={{ paddingBottom: 0.1 * height }}>
                <View style={styles.headerSection}>
                    <Text style={styles.titleTag}>{tag}</Text>
                    <View style={styles.hintSection}>
                        <LinearGradient
                            colors={['#89f7fe', '#66a6ff']}
                            start={[1, 0]}
                            end={[0, 1]}
                            location={[0.5, 0.4]}
                            style={styles.hint}
                        >
                            <AntDesign name='bulb1' size={24} color='yellow' style={styles.bulbIcon} />
                            <Text style={styles.smallerText}>
                                There are recipes of multiple levels to learn, finish at least one recipe in one level to unlock the more advanced.
                            </Text>
                        </LinearGradient>
                    </View>
                </View>
                {
                    levelSet.map(level => (
                        <Query key={`level-${level}`} query={GET_RECIPES_BY_LEVEL} variables={{ tags: tag, level }}>
                            {({ data, loading, error }) => {
                                if (loading) return <Text>Loading...</Text>;
                                if (error) return <Text>{`Error!: ${error}`}</Text>;

                                return (
                                    <View style={styles.levelSection}>
                                        {   // Locked level markup
                                            level > 2 &&
                                            <View style={styles.lockedLevel}>
                                                <View style={styles.doubleStripe}>
                                                    <View style={styles.lockStripe} />
                                                    <View style={styles.lockStripe} />
                                                </View>
                                                <AntDesign
                                                    name='lock1'
                                                    size={40}
                                                    color='rgba(80, 80, 80, 1)'
                                                />
                                                <View style={styles.doubleStripe}>
                                                    <View style={styles.lockStripe} />
                                                    <View style={styles.lockStripe} />
                                                </View>
                                            </View>
                                        }
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
                                    </View>
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
        marginBottom: 20,
    },
    titleTag: {
        fontWeight: 'bold',
        fontSize: 35,
        marginBottom: 15,
    },
    bulbIcon: {
        marginRight: 10,
    },
    hintSection: {
        shadowOffset:{  width: 1,  height: 5,  },
        shadowColor: 'rgb(102, 173, 255)',
        shadowOpacity: 0.7,
        shadowRadius: 7,
    },
    hint: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    smallerText: {
        flex: 1,
        fontSize: 18,
        color: 'white',
    },
    levelSection: {
        marginBottom: 15,
    },
    levelScroller: {
        flex: 1,
        paddingVertical: 10,
    },
    levelScrollerContainer: {
        paddingLeft: 0.06 * width,
    },
    lockedLevel: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'rgba(250, 250, 250, .7)',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    doubleStripe: {
        flexDirection: 'column',
    },
    lockStripe: {
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        height: 8,
        width: width * 0.32,
        borderRadius: 10,
        marginVertical: 5,
    },
});