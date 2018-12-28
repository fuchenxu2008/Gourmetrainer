import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import layout from '../constants/Layout';
const { width } = layout.window;

export default class LevelCard extends Component {
  render() {
        const { recipe, level, onPressImage, onPressDetail } = this.props;
        const { _id, title, albums } = recipe;
        return (
            <View style={styles.outestContainer}>
                <TouchableOpacity style={styles.albumImgBox} onPress={() => onPressImage(_id)}>
                    <Image source={{ uri: albums[0] }} style={styles.albumImg}/>
                </TouchableOpacity>
                <View style={styles.rightSection}>
                    <TouchableOpacity style={styles.detailSection} onPress={() => onPressDetail(_id)}>
                        <Text style={styles.recipeTitle}>{title}</Text>
                        <Text style={styles.smallerText}>Difficulty</Text>
                        <Text style={styles.difficulty}>{new Array(level || 1).fill('🍖').join('')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        width: 0.88 * width,
        height: 10 / 25 * width,
        marginRight: 0.12 * width,
        backgroundColor: 'transparent',
    },
    albumImgBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: '65%',
        zIndex: 10,
        shadowOffset:{  width: 3,  height: 2,  },
        shadowColor: 'rgb(220, 220, 220)',
        shadowOpacity: 0.7,
        shadowRadius: 7,
    },
    albumImg: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 10,
    },
    rightSection: {
        flex: 1,
        justifyContent: 'flex-end',
        shadowOffset:{  width: 1,  height: 2,  },
        shadowColor: 'rgb(220, 220, 220)',
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    detailSection: {
        borderRadius: 10,
        backgroundColor: 'white',
        paddingLeft: '40%',
        height: '75%',
        justifyContent: 'center',
    },
    recipeTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'rgb(70, 70, 70)',
        marginBottom: 8,
    },
    smallerText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(180,180,180)',
        marginBottom: 4,
    },
    difficulty: {
        fontSize: 20,
    }
})