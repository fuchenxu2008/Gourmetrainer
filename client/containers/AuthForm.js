import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { ApolloConsumer } from 'react-apollo';
import { DropDownHolder } from '../util/alert';
import Button from '../components/Button';
import { GET_CURRENT_USER, CREATE_USER, LOGIN_USER } from '../constants/GraphAPI';

export default class AuthForm extends Component {
  state = {
    email: '',
    nickname: '',
    password: '',
    repassword: '',
    gender: null,
    step: 1,
  }

  _handleNextStep = () => {
    const { email, password, repassword } = this.state;
    if (!email || !password || !repassword) {
      return DropDownHolder.alert('error', 'Error', 'Incomplete info!');
    } else if (password !== repassword) {
      return DropDownHolder.alert('error', 'Error', 'Passwords does not match!')
    }
    this.setState({ step: 2 })
  }

  _handlePreviousStep = () => {
    this.setState({ step: 1 })
  }
  _handleInputChange = (text, field) => {
    if (field === 'email') text = text.toLowerCase();
    this.setState({ [field]: text });
  }

  _handleFormSubmit = async (client) => {
    const { type, onLoggedIn } = this.props;
    const { email, nickname, password, gender } = this.state;
    if (type === 'Register') {
      /**
       *  if submit register form
       */
      if (!gender || !email || !nickname || !password) {
        return DropDownHolder.alert('error', 'Error', 'Incomplete info!');
      }
      // Request remote to register
      try {
        const { data } = await client.mutate({ mutation: CREATE_USER, variables: { params: { nickname, email, password, gender } } })
        // Save current user to local cache
        client.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            currentUser: data.createUser
          }
        });
      } catch (error) {
        return DropDownHolder.alert('error', 'Error', error.message);
      }      
    } else if (type === 'Login') {
      /**
       *  if submit login form
       */
      if (!email || !password) {
        return DropDownHolder.alert('error', 'Error', 'Incomplete credentials');
      }
      // Request remote to login
      try {
        const { data } = await client.query({ query: LOGIN_USER, variables: { email, password }, fetchPolicy: 'network-only' })
        // Save current user to local cache
        client.writeQuery({
          query: GET_CURRENT_USER,
          data: {
            currentUser: data.loginUser
          }
        });
      } catch (error) {
        return DropDownHolder.alert('error', 'Error', error.message);
      }
    }
    DropDownHolder.alert('success', 'Success', `Sucessfully ${type}ed!`);
    onLoggedIn();
  }

  render() {
    const { type } = this.props;
    const { email, nickname, password, repassword, gender, step, noti } = this.state;

    const emailForm = (
      <TextInput 
        style={styles.textbox}
        keyboardAppearance='dark'
        keyboardType='email-address'
        autoFocus={true}
        autoCorrect={false}
        returnKeyType='next'
        onSubmitEditing={() => { this.passwordInput.focus(); }}
        placeholder='Email' 
        placeholderTextColor='rgba(200,200,200,0.5)'
        onChangeText={(text) => this._handleInputChange(text, 'email')}
        value={email}
      />
    );

    const passwordForm = (
      <TextInput
        style={styles.textbox}
        keyboardAppearance = 'dark'
        placeholder='Password'
        ref={(input) => { this.passwordInput = input; }}
        onSubmitEditing={() => { if (type === 'Register') this.confirmPaswordInput.focus() }}
        secureTextEntry={true}
        autoCorrect={false}
        placeholderTextColor='rgba(200,200,200,0.5)'
        onChangeText={(text) => this._handleInputChange(text, 'password')}
        value={password}
      />
    );
    const rePasswordForm = (
      <TextInput
        style={styles.textbox}
        keyboardAppearance='dark'
        placeholder='Confirm Password'
        ref={(input) => { this.confirmPaswordInput = input; }}
        secureTextEntry={true}
        autoCorrect={false}
        placeholderTextColor='rgba(200,200,200,0.5)'
        onChangeText={(text) => this._handleInputChange(text, 'repassword')}
        value={repassword}
      />
    );

    const supplementForm = (
        <View style={{ width: '100%' }}>
          <TextInput
            style={styles.textbox}
            keyboardAppearance = 'dark'
            autoCorrect={false}
            returnKeyType='next'
            onSubmitEditing={() => {
              this.genderInput.togglePicker();
            }}
            autoFocus={true}
            placeholder='Nickname'
            placeholderTextColor='rgba(200,200,200,0.5)'
            onChangeText={(text) => this._handleInputChange(text, 'nickname')}
            value={nickname}
          />
          <RNPickerSelect
              items={[
                { label: 'Female', value: 'Female' },
                { label: 'Male', value: 'Male' },
              ]}
              placeholder = {{
                label: 'Select a gender...',
                value: null,
                color: '#9EA0A4',
              }}
              onValueChange={(text) => this._handleInputChange(text, 'gender')}
              ref={(input) => { this.genderInput = input; }}
          >
            <View style={styles.selectorContainer}>
              {
                gender
                ? <Text style={styles.selectorText}>{gender}</Text>
                : <Text style={styles.selectorPlaceholder}>Gender</Text>
              }
            </View>
          </RNPickerSelect>
      </View>
    )

    return (
      <ApolloConsumer>
        {client => (
          <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
            <View>
              {
                step !== 2
                ? <Text style={styles.heading}>User {type}</Text>
                : <Text style={styles.heading}>About You</Text> 
              }
              { step !== 2 && emailForm }
              { step === 2 && supplementForm }
              { step !== 2 && passwordForm }
              { type === 'Register' && step !== 2 && rePasswordForm }
              {
                type === 'Register' && step !== 2 
                ? <Button theme='hollow' onPress={this._handleNextStep}>Next Step</Button>
                : <Button theme='hollow' onPress={() => this._handleFormSubmit(client)}>{type}</Button>
              }
            </View>
          </KeyboardAvoidingView>
        )}
      </ApolloConsumer>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    heading: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
        alignSelf: 'center',
    },
    textbox: {
        width: '100%',
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 13,
        paddingBottom: 13,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    errorStyle: {
      borderColor: 'red',
    },
    selectorContainer: {
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 13,
      paddingBottom: 13,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'white',
      marginBottom: 20,
    },
    selectorPlaceholder: {
      fontSize: 19,
      fontWeight: 'bold',
      color: 'rgba(200,200,200,0.5)',
    },
    selectorText: {
      fontSize: 19,
      fontWeight: 'bold',
      color: 'white',
    }
})