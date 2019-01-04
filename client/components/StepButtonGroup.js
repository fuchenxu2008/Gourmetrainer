import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';

export default class StepButtonGroup extends Component {
    render() {
        const { currentStep, stepLength, onPrevStep, onNextStep, onFinishCook, buttonBusy } = this.props;
        return (
            <View style={styles.stepButtonGroup}>
                <View>
                    { // Go previous step button
                        currentStep > 1 &&
                        <TouchableOpacity onPress={onPrevStep}>
                            <Entypo name='chevron-with-circle-left' size={46} />
                        </TouchableOpacity>
                    }
                </View>
                <View>
                    { // Go next step button
                        currentStep < stepLength &&
                        <TouchableOpacity onPress={onNextStep}>
                            <Entypo name='chevron-with-circle-right' size={46} />
                        </TouchableOpacity>
                    }
                    { // Finish button
                        currentStep === stepLength &&
                        <TouchableOpacity onPress={onFinishCook} disabled={buttonBusy}>
                            <Feather name='check-circle' size={46} color='rgb(118, 209, 106)' />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stepButtonGroup: {
        // position: 'absolute',
        bottom: '5%',
        // left: 0,
        // right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '10%',
    },
})