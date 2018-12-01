import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class RecipeCard extends Component {
  render() {
    const { albums, title } = this.props.recipe;
    
    return (
        <View elevation={13} style={styles.recipeCard}>
            <Image source={{ uri: albums[0] }} style={styles.recipeImg} />
            <Text style={styles.recipeTitle}>{title}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
    recipeCard: {
        flexDirection: 'row',
        width: '80%',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        shadowOffset:{  width: 1,  height: 2,  },
        shadowColor: 'white',
        shadowOpacity: 0.8,
    },
    recipeImg: {
        borderRadius: 10,
        width: 150,
        height: 150,
    },
    recipeTitle: {
        marginLeft: 20,
        fontSize: 20,
        fontWeight: 'bold'
    }
})