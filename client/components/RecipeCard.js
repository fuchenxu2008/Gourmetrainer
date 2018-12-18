import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

class RecipeCard extends Component {
    _handleClickRecipe = (_id) => {
        this.props.navigation.navigate('RecipeDetail', { _id })
    }

    render() {
        const { _id, albums, title, tags } = this.props.recipe;
        
        return (
            <TouchableOpacity elevation={13} style={styles.recipeCard} onPress={() => this._handleClickRecipe(_id)}>
                <Image source={{ uri: albums[0] }} style={styles.recipeImg} />
                <View style={styles.recipeHeading}>
                    <Text style={styles.recipeTitle}>{title}</Text>
                    <View style={styles.recipeTagBox}>
                        <Text style={styles.recipeTagText}>{tags}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    recipeCard: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: 'white',
        shadowOffset:{  width: 0,  height: 5,  },
        shadowColor: 'rgb(100, 100, 100)',
        shadowOpacity: 0.1,
    },
    recipeImg: {
        borderRadius: 10,
        width: 70,
        height: 70,
    },
    recipeHeading: {
        flex: 1,
        marginLeft: 20,
        justifyContent: 'center',
        // flexWrap: "wrap",
    },
    recipeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'rgb(100, 100, 100)',
        marginBottom: 10,
    },
    recipeTagBox: {
        alignSelf: 'flex-start',
        borderRadius: 13,
        paddingVertical: 2,
        paddingHorizontal: 10,
        backgroundColor: 'rgb(243, 223, 69)',
    },
    recipeTagText: {
        color: 'white',
    }
})

export default withNavigation(RecipeCard);