import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Picker, Animated } from 'react-native';
import { ApolloConsumer, graphql } from 'react-apollo';
import StepDetail from '../components/StepDetail';
import { LinearGradient } from 'expo';
import { DropDownHolder } from '../util/alert';
import Timer from '../components/Timer';
import VoiceOver from '../components/VoiceOver';
import { Entypo, Feather } from '@expo/vector-icons';
import { ADD_COOK_HISTORY, GET_CURRENT_USER, GET_COOK_HISTORIES } from '../constants/GraphAPI';
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

export class LearnStepScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentStep: 1,
    processing: false,
    y: new Animated.Value(height * (-0.3)),
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    timerRunning: false,
  }

  /**
   * handle wheel picker change
   * */ 
  _handleTimerChange = (field, value) => {
    this.setState((prevState) => ({
      timer: {
        ...prevState.timer,
        [field]: value
      }
    }))
  }

  /**
   * Click Timer Button to invoke picker
   * */ 
  _handleEditTimer = () => {
    Animated.spring(this.state.y, {
      toValue: 0,
      bounciness: 0,
    }).start();
  }

  /**
   * Click 'close' in modal
   * */ 
  _handleCloseTimer = () => {
    Animated.spring(this.state.y, {
      toValue: height * (-0.3),
      bounciness: 0,
    }).start();
  }

  /**
   * Click 'start' in modal
   * */
  _handleStartTimer = () => {
    this._handleCloseTimer()
    this.setState({ timerRunning: true })
  }

  /**
   * Callback of clicking Timer Button to stop
   * */ 
  _handleStopTimer = () => {
    this.setState({
      timerRunning: false,
      timer: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    })
  }

  _handleNextStep = (currentStep) => {
    this.setState({ currentStep: currentStep + 1 })
  }

  _handlePrevStep = (currentStep) => {
    this.setState({ currentStep: currentStep - 1 })
  }

  _handleFinishCook = async(client, recipeId) => {
    const { currentUser } = this.props.data;
    this.setState({ processing: true })
    try {
      // Add cook history
      const { data } = await client.mutate({
        mutation: ADD_COOK_HISTORY,
        variables: { user: currentUser._id, recipe: recipeId },
        refetchQueries: [{
          query: GET_COOK_HISTORIES,
          variables: { user: currentUser._id },
        }]
      })
      // Report Success
      if (data.addCookedHistory._id) {
        DropDownHolder.alert('success', 'Success', 'Added to Cook History!')
        this.props.navigation.pop(2);
      } else throw "Network error maybe...";
    } catch (error) {
      DropDownHolder.alert('error', 'Error', error.message)
    }
  }
  
  render() {
    const { recipe } = this.props.navigation.state.params;
    const { steps, _id } = recipe;
    const { currentStep, processing, timer, y, timerRunning } = this.state;
    const activeStep = steps[currentStep - 1];

    return (
      <View style={styles.outestContainer}>
        <LinearGradient
          colors={['rgb(116, 114, 113)', 'rgb(54, 52, 51)']}
          start={[0, 0]}
          end={[1, 1]}
          location={[0.25, 0.4]}
          style={styles.headerSection}
        >
          <Text style={styles.heading}>Step {currentStep} <Text style={styles.smallerHeading}>of {steps.length}</Text></Text>
          <StepDetail
            activeStep={activeStep}
          />
        </LinearGradient>
        <View style={styles.utilSection}>
          <Timer
            onEditPress={this._handleEditTimer}
            onStopPress={this._handleStopTimer}
            value={timer}
            status={timerRunning}
          />
          <VoiceOver text={activeStep.step} />
        </View>
        {
          //  Timer modal
          <Animated.View style={{
            ...styles.timerModal,
            bottom: y,
          }}>
            <View style={styles.timerBtnGroup}>
              <TouchableOpacity onPress={this._handleCloseTimer}>
                <Text style={styles.timerBtn}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._handleStartTimer}>
                <Text style={styles.timerBtn}>Start</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pickerGroup}>
              <Picker style={styles.timerPicker} selectedValue={timer.hours} onValueChange={(val) => this._handleTimerChange('hours', val)}>
                { timerHours }
              </Picker>
              <Picker style={styles.timerPicker} selectedValue={timer.minutes} onValueChange={(val) => this._handleTimerChange('minutes', val)}>
                { timerMinutes }
              </Picker>
              <Picker style={styles.timerPicker} selectedValue={timer.seconds} onValueChange={(val) => this._handleTimerChange('seconds', val)}>
                { timerSeconds }
              </Picker>
            </View>
          </Animated.View>
        }
        <View style={styles.stepButtonGroup}>
          <View>
            { // Go previous step button
              currentStep > 1 &&
              <TouchableOpacity
                onPress={() => this._handlePrevStep(currentStep)}
              >
                <Entypo name='chevron-with-circle-left' size={46} />
              </TouchableOpacity>
            }
          </View>
          <View>
            { // Go next step button
              currentStep < steps.length &&
              <TouchableOpacity
                onPress={() => this._handleNextStep(currentStep)}
              >
                <Entypo name='chevron-with-circle-right' size={46} />
              </TouchableOpacity>
            }
            { // Finish button
              currentStep === steps.length &&
              <ApolloConsumer>
                {client => (
                  <TouchableOpacity
                    onPress={() => this._handleFinishCook(client, _id)}
                    disabled={processing}
                  >
                    <Feather name='check-circle' size={46} color='rgb(118, 209, 106)' />
                  </TouchableOpacity>
                )}
              </ApolloConsumer>
            }
          </View>
        </View>
      </View>
    )
  }
}

export default graphql(GET_CURRENT_USER)(LearnStepScreen);

const styles = StyleSheet.create({
  outestContainer: {
    flex: 1,
    backgroundColor: 'rgb(251, 251, 251)',
  },
  headerSection: {
    paddingTop: 70,
    borderRadius: 37,
    borderBottomRightRadius: 37,
    marginBottom: '10%',
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
  utilSection: {
    flex: 1, // important
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
  },
  timerModal: {
    // flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    // bottom: 0,
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
    height: 0,
  },
  timerPicker: {
    width: width * 1 / 3,
    height: '100%',
  },
  stepButtonGroup: {
    position: 'absolute',
    bottom: '4%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
  },
});