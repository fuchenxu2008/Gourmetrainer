import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import Button from '../components/Button';
import AuthForm from '../containers/AuthForm';
import foodbg from '../assets/images/foodbg.jpg';

export default class WelcomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        status: null,
    }

    _handleRegister = () => {
        this.setState({ status: 'Register' })
    }

    _handleLogin = () => {
        this.setState({ status: 'Login' })
    }

    render() {
        const { status } = this.state;

        return (
            <View style={styles.outestContainer}>
                {/** Background */}
                <View style={styles.backgroundContainer}>
                    <Image source={foodbg} style={styles.backgroundImg} blurRadius={10} />
                    <View style={styles.bgMask} />
                </View>
                
                {!status &&
                    <View style={styles.welcomeSection}>
                        <Text style={styles.appHeading}>Gourmetrainer</Text>
                        <Button onPress={this._handleLogin} theme='hollow' icon='rocket1'>Login with Email</Button>
                        <View style={{ margin: 10 }} />
                        <Button onPress={this._handleRegister} theme='default' icon='adduser'>Create account</Button>
                    </View>
                }
                {
                    status &&
                    <View style={styles.authContainer}>
                        <AuthForm type={status} />
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outestContainer: {
        flex: 1,    //!!!
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    backgroundContainer: {
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
    },
    bgMask: {
        flex: 1,
        backgroundColor: 'rgba(80, 80, 80, 0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    appHeading: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    welcomeSection: {
        width: '80%',
        alignSelf: 'center',
    },
    authContainer: {
        alignSelf: 'center',
        width: '85%',
        // paddingTop: '20%',
    }
});