import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '../components/Button';

export default class AuthForm extends Component {
  state = {
    email: '',
    nickname: '',
    password: '',
    repassword: '',
    gender: null,
  }

  _handleInputChange = (text, field) => {
    this.setState({ [field]: text })
  }

  _handleFormSubmit = () => {
    console.log(this.state);
  }

  render() {
    const { type } = this.props;
    const { email, nickname, password, repassword, gender } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <View>
        <Text style={styles.heading}>User {type}</Text>
        <TextInput 
          style={styles.textbox}
          keyboardAppearance='dark'
          keyboardType='email-address'
          autoFocus={true}
          autoCorrect={false}
          returnKeyType='next'
          placeholder='Email' 
          placeholderTextColor='rgba(200,200,200,0.5)'
          onChangeText={(text) => this._handleInputChange(text, 'email')}
          value={email}
        />
        {
          type === 'Register' &&
          <View style={{ width: '100%' }}>
            <TextInput
              style={styles.textbox}
              keyboardAppearance = 'dark'
              autoCorrect={false}
              returnKeyType='next'
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
        }
        <TextInput
          style={styles.textbox}
          keyboardAppearance = 'dark'
          placeholder='Password'
          secureTextEntry={true}
          autoCorrect={false}
          placeholderTextColor='rgba(200,200,200,0.5)'
          onChangeText={(text) => this._handleInputChange(text, 'password')}
          value={password}
        />
        {
          type === 'Register' &&
          <TextInput
            style={styles.textbox}
            keyboardAppearance='dark'
            placeholder='Confirm Password'
            secureTextEntry={true}
            autoCorrect={false}
            placeholderTextColor='rgba(200,200,200,0.5)'
            onChangeText={(text) => this._handleInputChange(text, 'repassword')}
            value={repassword}
          />
        }
        <Button theme='hollow' onPress={this._handleFormSubmit}>{type}</Button>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'flex-start',
        // marginTop: 20,
        width: '100%',
    },
    heading: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 30,
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