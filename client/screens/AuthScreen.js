import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';

export default class AuthScreen extends Component {
    state = {
        email: '',
        password: ''
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    render() {
        return (
            <View>
                <Text>EMAIL</Text>
                <TextInput
                    textContentType='emailAddress'
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <Text>PASSWORD</Text>
                <TextInput
                    textContentType='password'
                    value={this.state.password}
                    onChange={this.handleEmailChange}
                />
            </View>
        )
    }
}
