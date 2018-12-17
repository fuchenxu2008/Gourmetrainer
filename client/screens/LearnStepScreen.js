import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import StepDetail from '../components/StepDetail';
// import Button from '../components/Button';
import Timer from '../components/Timer';
import VoiceOver from '../components/VoiceOver';
import { Entypo } from '@expo/vector-icons';

export default class LearnStepScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentStep: 1,
  }

  _handleNextStep = (currentStep) => {
    this.setState({ currentStep: currentStep + 1 })
  }

  _handlePrevStep = (currentStep) => {
    this.setState({ currentStep: currentStep - 1 })
  }
  
  render() {
    const { recipe } = this.props.navigation.state.params;
    const { steps } = recipe;
    const { currentStep } = this.state;
    const activeStep = steps[currentStep - 1];

    return (
      <View style={styles.outestContainer}>
        <View style={styles.headerSection}>
          <Text style={styles.heading}>Step {currentStep} <Text style={styles.smallerHeading}>of {steps.length}</Text></Text>
          <StepDetail
            activeStep={activeStep}
          />
        </View>
        <View style={styles.utilSection}>
          <Timer />
          <VoiceOver text={activeStep.step} />
        </View>
        <View style={styles.stepButtonGroup}>
          <View>
            { currentStep > 1 &&
              <TouchableOpacity
                onPress={() => this._handlePrevStep(currentStep)}
                style={styles.switchStepButton}
              >
                <Entypo name='chevron-with-circle-left' size={46} />
              </TouchableOpacity>
            }
          </View>
          <View>
            { currentStep < steps.length &&
              <TouchableOpacity
                onPress={() => this._handleNextStep(currentStep)}
                style={styles.switchStepButton}
              >
                <Entypo name='chevron-with-circle-right' size={46} />
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  outestContainer: {
    flex: 1,
    backgroundColor: 'rgb(251, 251, 251)',
    // backgroundColor: 'rgb(59, 57, 56)',
  },
  headerSection: {
    paddingTop: 70,
    backgroundColor: 'rgb(59, 57, 56)',
    borderBottomLeftRadius: 37,
    borderBottomRightRadius: 37,
    // flex: 1,
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
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
  },
  stepButtonGroup: {
    // flex: 1,
    position: 'absolute',
    bottom: '4%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    // width: '60%',
    paddingHorizontal: '10%',
  },
  switchStepButton: {
    // color: 'white',
    // backgroundColor: 'red'
  }
});