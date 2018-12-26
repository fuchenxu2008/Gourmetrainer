import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Vibration, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
   const { value, status } = nextProps;
   const timerValue = getTimerValue(value);
   this.setState({ timerValue })
   
   if (status) {
      if (timerValue <= 0) {
        return this._handleStop();
      }
      this.timer = setInterval(() => {
        this.countDown()
      }, 1000);
      console.log('timer started');
    }
  }

  countDown = () => {
    this.setState((prevState) => {
      if (prevState.timerValue - 1 < 0) {
        // Vibration
        let vibration = setInterval(() => {
          Vibration.vibrate(1000)
        }, 1000);
        // Alert
        Alert.alert(
          'Timer Done',
          'Let\'s get back to cooking!',
          [
            {text: 'OK', onPress: () => clearInterval(vibration)},  // Stop vibration
          ],
          { cancelable: false }
        )
        // Stop timer
        this._handleStop()
      }
      return { timerValue: prevState.timerValue - 1 }
    });
  }

  componentWillUnmount() {
    this._handleStop();
  }

  _handleStop = () => {
    clearInterval(this.timer);
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
      // backgroundColor: 'green',
      paddingVertical: 10,
      // alignItems: 'center',
    },
    timerText: {
      fontSize: 27,
      color: 'rgb(70, 70, 70)',
      marginLeft: '5%',
    },
});