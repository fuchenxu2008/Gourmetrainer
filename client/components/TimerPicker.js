import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Picker, Animated } from 'react-native';
import layout from '../constants/Layout';
const { height, width } = layout.window;

const timerHours = [...Array(12).keys()].map(hr => (
  <Picker.Item key={`hr_${hr}`} label={`${hr} h`} value={hr} />
))
const timerMinutes = [...Array(60).keys()].map(min => (
  <Picker.Item key={`min_${min}`} label={`${min} min`} value={min} />
))
const timerSeconds = [...Array(60).keys()].map(sec => (
  <Picker.Item key={`sec_${sec}`} label={`${sec} sec`} value={sec} />
))

export default class TimerPicker extends Component {
    state = {
        y: new Animated.Value(height * (-0.3)),
    }

    componentWillReceiveProps(nextProps) {
        const toBeVisible = nextProps.visible;
        const isVisible = this.props.visible;
        const { y } = this.state;
        if (toBeVisible && !isVisible) {
            Animated.spring(y, {
                toValue: 0,
                bounciness: 0,
            }).start();
        } else if (!toBeVisible && isVisible) {
            Animated.spring(y, {
                toValue: height * (-0.3),
                bounciness: 0,
            }).start();
        }
    }

    render() {
        const { y } = this.state;
        const { visible, timer, onTimerChange, onCloseTimerModal, onStartTimer } = this.props;

        return (
            <Animated.View style={{
                ...styles.timerModal,
                bottom: y,
            }}>
                <View style={styles.timerBtnGroup}>
                    <TouchableOpacity onPress={onCloseTimerModal}>
                        <Text style={styles.timerBtn}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onStartTimer}>
                        <Text style={styles.timerBtn}>Start</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.pickerGroup}>
                    <Picker style={styles.timerPicker} selectedValue={timer.hours} onValueChange={(val) => onTimerChange('hours', val)}>
                    { timerHours }
                    </Picker>
                    <Picker style={styles.timerPicker} selectedValue={timer.minutes} onValueChange={(val) => onTimerChange('minutes', val)}>
                    { timerMinutes }
                    </Picker>
                    <Picker style={styles.timerPicker} selectedValue={timer.seconds} onValueChange={(val) => onTimerChange('seconds', val)}>
                    { timerSeconds }
                    </Picker>
                </View>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    timerModal: {
        flexDirection: 'column',
        position: 'absolute',
        left: 0,
        right: 0,
        height: height * 0.3,
        zIndex: 10,
        backgroundColor: 'rgba(208, 212, 219, 1)',
    },
    timerBtnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: 10,
        backgroundColor: 'rgb(239, 241, 242)',
    },
    timerBtn: {
        color: 'rgba(21,126, 250, 1)',
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerGroup: {
        flexDirection: 'row',
        flex: 1,
    },
    timerPicker: {
        width: width * 1 / 3,
        height: '100%',
    },
});