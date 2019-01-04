import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo';
import layout from '../constants/Layout';
const { height, width } = layout.window;

export default class StepDetail extends Component {
    render() {
        const { currentStep, stepLength } = this.props;
        const { step, img, index } = currentStep;

        return (
            <LinearGradient
                colors={['rgb(116, 114, 113)', 'rgb(54, 52, 51)']}
                start={[0, 0]}
                end={[1, 1]}
                location={[0.25, 0.4]}
                style={styles.headerSection}
            >
                <View>
                    <Text style={styles.heading}>
                        Step {index} <Text style={styles.smallerHeading}>of {stepLength}</Text>
                    </Text>
                    <ScrollView style={styles.stepTextBox}>
                        <Text style={styles.stepText}>{step}</Text>
                    </ScrollView>
                    <View style={styles.stepImgBox}>
                        <Image source={{ uri: img }} style={styles.stepImg} />
                    </View>
                </View>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    headerSection: {
        paddingTop: 70,
        borderRadius: 37,
        borderBottomRightRadius: 37,
        marginBottom: '7%',
    },
    heading: {
        fontSize: 40,
        paddingHorizontal: '6%',
        marginBottom: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    smallerHeading: {
        fontSize: 30,
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
        borderRadius: 27,
        overflow: 'hidden',
    },
    stepImg: {
        flex: 1,
        height: null,
        width: null,
    }
});