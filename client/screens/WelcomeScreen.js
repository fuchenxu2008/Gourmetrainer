import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import Button from '../components/Button';
import AuthForm from '../containers/AuthForm';
import foodbg from '../assets/images/foodbg.jpg';

export default class WelcomeScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    // Set two status 'Register' and 'Login' for resuing one component
    state = {
        status: null,
    }

    _handleBack = () => {
        this.state.status
            ? this.setState({ status: null })
            : this.props.navigation.goBack();
    }

    _handleRegister = () => {
        this.setState({ status: 'Register' })
    }

    _handleLogin = () => {
        this.setState({ status: 'Login' })
    }
    
    _handleLoggedIn = () => {
        // Go back to the foremost page
        this.props.navigation.popToTop();
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

                <TouchableOpacity onPress={this._handleBack} style={styles.backBtn}>
                    <Entypo name='chevron-thin-left' size={25} color='white'/>
                </TouchableOpacity>
                
                {   // If user hasn't click 'register' or 'login'
                    !status &&
                    <View style={styles.welcomeSection}>
                        <Text style={styles.appHeading}>Gourmetrainer</Text>
                        <Button onPress={this._handleLogin} theme='hollow' icon='rocket1'>Login with Email</Button>
                        <View style={{ margin: 10 }} />
                        <Button onPress={this._handleRegister} theme='default' icon='adduser'>Create account</Button>
                    </View>
                }
                {   // If user has chosen one, show that form
                    status &&
                    <View style={styles.authContainer}>
                        <AuthForm type={status} handleBack={this._handleBack} onLoggedIn={this._handleLoggedIn} />
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
    backBtn: {
        position: 'absolute',
        top: '8%',
        left: '7.5%',
        zIndex: 10,
    },
    authContainer: {
        alignSelf: 'center',
        width: '85%',
    }
});