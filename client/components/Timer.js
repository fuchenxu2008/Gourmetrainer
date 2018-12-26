import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Vibration, Alert } from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import alarmSound from '../assets/audios/Radar.mp3';

const getTimerString = (duration) => {
  if (duration === 0) return 'Timer';
  const hours = parseInt(duration / 3600, 10);
  const minutes = parseInt((duration - hours * 3600) / 60, 10);
  const seconds = parseInt((duration - hours * 3600) % 60, 10);
  return [hours, minutes, seconds].map(digit => digit < 10 ? `0${digit}` : digit).join(':')
}

const getTimerValue = ({ hours, minutes, seconds }) => hours * 3600 + minutes * 60 + seconds;

export default class Timer extends Component {
  state = {
    timerValue: 0,
  }

  componentWillReceiveProps(nextProps) {
   const { value, status, currentStep } = nextProps;
   if (currentStep !== this.props.currentStep) return; //Prevent re-counting down after step change
   const timerValue = getTimerValue(value);
   this.setState({ timerValue }); // Single source of truth for timer remaining value
   if (status) { // If timer is running
      if (timerValue <= 0) {
        return this._handleStop(); // Timer done
      }
      if (!this.timer) {  // Debounce timer
        this.timer = setInterval(() => {
          this.countDown()
        }, 1000);
        console.log('timer started');
      }
    }
  }

  countDown = () => {
    this.setState((prevState) => {
      if (prevState.timerValue - 1 <= 0) {
        // Alarm
        this.runAlarm()
        let alarm = setInterval(this.runAlarm, 3000);
        // Alert
        Alert.alert(
          'Timer Done',
          'Let\'s get back to cooking!',
          [
            {text: 'OK', onPress: () => clearInterval(alarm)},  // Stop vibration
          ],
          { cancelable: false }
        )
        // Stop timer
        this._handleStop()
      }
      return { timerValue: prevState.timerValue - 1 }
    });
  }

  runAlarm = () => {
    Vibration.vibrate(3000)
    Audio.Sound.createAsync(alarmSound, { shouldPlay: true });
  }

  componentWillUnmount() {
    this._handleStop();
  }

  _handleStop = () => {
    clearInterval(this.timer);
    this.timer = undefined;
    this.props.onStopPress();
  }

  render() {
    const { onEditPress, value, status } = this.props;
    const { timerValue } = this.state;
  
    return (
      <View style={styles.outestContainer}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={status ? this._handleStop : onEditPress}>
          <Ionicons name='ios-timer' size={36} />
          <Text style={{
            ...styles.timerText,
            fontWeight: status ? 'bold' : 'normal',
          }}>
            { getTimerString(timerValue) }
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    outestContainer: {
      flex: 1,
      paddingVertical: 10,
    },
    timerText: {
      fontSize: 27,
      color: 'rgb(70, 70, 70)',
      marginLeft: '5%',
    },
});