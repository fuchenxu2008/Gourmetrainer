import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ApolloConsumer, graphql } from 'react-apollo';
import StepDetail from '../components/StepDetail';
import { LinearGradient } from 'expo';
import { DropDownHolder } from '../util/alert';
import Timer from '../components/Timer';
import VoiceOver from '../components/VoiceOver';
import { Entypo, Feather } from '@expo/vector-icons';
import { ADD_COOK_HISTORY, GET_CURRENT_USER, GET_COOK_HISTORIES } from '../constants/GraphAPI';

export class LearnStepScreen extends Component {
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

  _handleFinishCook = async(client, recipeId) => {
    const { currentUser } = this.props.data;
    try {
      const { data } = await client.mutate({
        mutation: ADD_COOK_HISTORY,
        variables: { user: currentUser._id, recipe: recipeId },
        refetchQueries: [{
          query: GET_COOK_HISTORIES,
          variables: { user: currentUser._id },
        }]
      })
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
    const { currentStep } = this.state;
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
            {
              currentStep === steps.length &&
              <ApolloConsumer>
                {client => (
                  <TouchableOpacity
                    onPress={() => this._handleFinishCook(client, _id)}
                    style={styles.switchStepButton}
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
    // backgroundColor: 'rgb(59, 57, 56)',
  },
  headerSection: {
    paddingTop: 70,
    // backgroundColor: 'rgb(59, 57, 56)',
    borderRadius: 37,
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