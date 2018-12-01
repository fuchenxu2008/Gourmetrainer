import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Form = t.form.Form;

const UserLogin = t.struct({
    email: t.String, // a required string
    password: t.String, // an optional string
    rememberMe: t.Boolean // a boolean
});

const Gender = t.enums({
    M: 'Male',
    F: 'Female'
});

const UserRegister = t.struct({
    email: t.String, // a required string
    nickname: t.String,
    gender: Gender,
    password: t.String, // an optional string
    rememberMe: t.Boolean // a boolean
});

export default class AuthForm extends Component {
    onPress = () => {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            console.log(value); // value here is an instance of Person
        }
    }

    render() {
        return (
        <View>
            <Form
            ref="form"
            type={UserRegister}
            //   options={options}
            />
            <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});
