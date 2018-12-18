import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo';
import layout from '../constants/Layout';
const { width } = layout.window;

const tagImgList = [
    require('../assets/cuisines/chuancai.jpg'),
    require('../assets/cuisines/lucai.jpeg'),
    require('../assets/cuisines/yuecai.jpg'),
    require('../assets/cuisines/sucai.jpg'),
    require('../assets/cuisines/zhecai.jpg'),
    require('../assets/cuisines/mincai.jpg'),
    require('../assets/cuisines/xiangcai.jpg'),
    require('../assets/cuisines/huicai.jpg'),
    require('../assets/cuisines/dongbei.jpg'),
    require('../assets/cuisines/jing.jpg'),
    require('../assets/cuisines/xinjiang.jpg'),
    require('../assets/cuisines/qingzhen.jpg'),
    require('../assets/cuisines/huaiyang.jpg'),
    require('../assets/cuisines/hubei.jpg'),
    require('../assets/cuisines/chaozhou.jpg'),
    require('../assets/cuisines/kejia.jpg'),
    require('../assets/cuisines/west.jpg'),
    require('../assets/cuisines/hongkong.jpg'),
    require('../assets/cuisines/korea.jpg'),
    require('../assets/cuisines/japan.jpg'),
]

export default class TagCard extends Component {
    render() {
        const { tag, onPress, index } = this.props;
        return (
            <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
                <View style={styles.imgContainer}>
                    <Image source={tagImgList[index]} style={styles.tagImg} />
                </View>
                <LinearGradient
                    start={[0.5, 1]} end={[0.5, 0]} colors={[ 'rgba(255,255,255,1)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0)']}
                    style={styles.textContainer}
                >
                    <Text style={styles.tagText}>{tag}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        borderRadius: 10,
        backgroundColor: 'rgb(230, 230, 230)',
        width: width * 0.38,
        height: width * 0.5,
        marginHorizontal: '3%',
        marginTop: width * 0.06,
        flexDirection: 'column',
        alignItems: 'center',
        // overflow: 'hidden',
        shadowOffset:{  width: 3,  height: 5,  },
        shadowColor: 'rgb(190, 190, 190)',
        shadowOpacity: 0.2,
        // shadowRadius: 5,
    },
    imgContainer: {
        width: '100%',
        height: '100%',
    },
    tagImg: {
        flex: 1,
        width: null,
        height: null,
        borderRadius: 10,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingBottom: 10,
        paddingTop: 30,
        borderRadius: 10,
    },
    tagText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'rgb(50, 50, 50)',
    }
})