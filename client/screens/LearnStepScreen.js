import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ApolloConsumer, graphql } from 'react-apollo';
import { DropDownHolder } from '../util/alert';
import StepDetail from '../components/StepDetail';
import Timer from '../components/Timer';
import VoiceOver from '../components/VoiceOver';
import TimerPicker from '../components/TimerPicker';
import StepButtonGroup from '../components/StepButtonGroup';
import { ADD_COOK_HISTORY, GET_CURRENT_USER, GET_COOK_HISTORIES } from '../constants/GraphAPI';

export class LearnStepScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    currentStep: 1,
    processing: false,
    timer: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    showTimerModal: false,
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
    this.setState({ showTimerModal: true })
  }

  /**
   * Click 'close' in modal
   * */ 
  _handleCloseTimerModal = () => {
    this.setState({ showTimerModal: false })    
  }

  /**
   * Click 'start' in modal
   * */
  _handleStartTimer = () => {
    this._handleCloseTimerModal()
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

  _handleNextStep = () => {
    this.setState((prevState) => ({ currentStep: prevState.currentStep + 1 }));
  }

  _handlePrevStep = () => {
    this.setState((prevState) => ({ currentStep: prevState.currentStep - 1 }));
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
    const { currentStep, processing, timer, showTimerModal, timerRunning } = this.state;
    const activeStep = steps[currentStep - 1];

    return (
      <View style={styles.outestContainer}>
        <StepDetail currentStep={{ ...activeStep, index: currentStep }} stepLength={steps.length} />
        <View style={styles.utilSection}>
          <Timer
            onEditPress={this._handleEditTimer}
            onStopPress={this._handleStopTimer}
            value={timer}
            status={timerRunning}
            currentStep={currentStep} // To prevent re-counting down after step change
          />
          <VoiceOver text={activeStep.step} />
        </View>
        <TimerPicker
          timer={timer}
          visible={showTimerModal}
          onTimerChange={this._handleTimerChange}
          onCloseTimerModal={this._handleCloseTimerModal}
          onStartTimer={this._handleStartTimer}
        />
        <ApolloConsumer>
          {client => (
            <StepButtonGroup
              currentStep={currentStep}
              stepLength={steps.length}
              onPrevStep={this._handlePrevStep}
              onNextStep={this._handleNextStep}
              onFinishCook={() => this._handleFinishCook(client, _id)}
              buttonBusy={processing}
            />
          )}
        </ApolloConsumer>
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
  utilSection: {
    flex: 1, // important
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
  },
});