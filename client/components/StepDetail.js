import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import layout from '../constants/Layout';
const { height, width } = layout.window;

export default class StepDetail extends Component {
    render() {
        const { activeStep } = this.props;
        const { step, img } = activeStep;

        return (
            <View style={styles.outestContainer}>
                <ScrollView style={styles.stepTextBox}>
                    <Text style={styles.stepText}>{step}</Text>
                </ScrollView>
                <View style={styles.stepImgBox}>
                    <Image source={{ uri: img }} style={styles.stepImg} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        // flex: 1,
        // backgroundColor: 'blue',
        
    },
    stepTextBox: {
        height: 0.125 * height,
    },
    stepText: {
        fontSize: 18,
        color: 'white',
        lineHeight: 28,
        paddingHorizontal: '6%',
        marginBottom: 30,
    },
    stepImgBox: {
        alignSelf: 'center',
        width,
        height: width * 4 / 5,
        // borderTopLeftRadius: 27,
        // borderTopRightRadius: 27,
        borderRadius: 27,
        overflow: 'hidden',
    },
    stepImg: {
        flex: 1,
        height: null,
        width: null,
    }
});