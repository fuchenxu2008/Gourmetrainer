import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { graphql } from 'react-apollo';
import { GET_CURRENT_USER } from '../constants/GraphAPI';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import layout from '../constants/Layout';
import LevelSection from '../containers/LevelSection';
const { height } = layout.window;

const levelArray = [1, 2, 3, 4, 5];

export class TagCenter extends Component {
    static navigationOptions = {
        header: null,
    };

    _handleEnterRecipe = (_id) => {
        this.props.navigation.navigate('RecipeDetail', { _id })
    }

    render() {
        const { tag } = this.props.navigation.state.params;
        const { currentUser } = this.props.data;
        if (!currentUser) this.props.navigation.goBack();
        const userLevelSet = currentUser.userLevel.levelSet || {};
        const maxLevel = (userLevelSet[tag] || 0) + 1;

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
                    levelArray.map(level => (
                        <LevelSection
                            key={`level-${level}`}
                            tags={tag}
                            level={level}
                            onPress={this._handleEnterRecipe}
                            maxLevel={maxLevel}
                        />
                    ))
                }
            </ScrollView>
        )
    }
}

export default graphql(GET_CURRENT_USER)(TagCenter);

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
});