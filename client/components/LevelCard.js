import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Rating } from 'react-native-elements';
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
                        <Rating
                            // showRating={false}
                            type='star'
                            readonly
                            ratingCount={5}
                            startingValue={level}
                            imageSize={25}
                            style={{ paddingVertical: 10, alignSelf: 'flex-start' }}
                        />
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
        // backgroundColor: 'white',
        backgroundColor: 'transparent',
        // overflow: 'hidden',
    },
    albumImgBox: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: '65%',
        zIndex: 10,
        // overflow: 'hidden',
        shadowOffset:{  width: 2,  height: 5,  },
        shadowColor: 'rgb(200, 200, 200)',
        shadowOpacity: 0.9,
        // shadowRadius: 5
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
        // borderRadius: 10,
        shadowOffset:{  width: 2,  height: 5,  },
        shadowColor: 'rgb(200, 200, 200)',
        shadowOpacity: 0.9,
        // shadowRadius: 5
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
    },

})