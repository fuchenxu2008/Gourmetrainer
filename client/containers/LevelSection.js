import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Query } from 'react-apollo';
import LevelCard from '../components/LevelCard';
import { GET_RECIPES_BY_LEVEL } from '../constants/GraphAPI';
import layout from '../constants/Layout';
import Loading from '../components/Loading';
const { width } = layout.window;

export default class LevelSection extends Component {
  render() {
    const { tags, level, maxLevel, onPress } = this.props;
    return (
        <Query query={GET_RECIPES_BY_LEVEL} variables={{ tags, level }}>
            {({ data, loading, error }) => {
                if (loading) return <Loading />;
                if (error) return <Text>{`Error!: ${error}`}</Text>;

                return (
                    <View style={styles.levelSection}>
                        {   // Locked level markup
                            level > maxLevel &&
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
                                        onPress={onPress}
                                    />
                                ))
                            }
                        </ScrollView>
                    </View>
                )
            }}
        </Query>
    )
  }
}

const styles = StyleSheet.create({
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