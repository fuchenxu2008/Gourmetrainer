import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Animated, TouchableOpacity } from 'react-native';
import UserProfile from '../components/UserProfile';
import Button from '../components/Button';
import { graphql, withApollo } from 'react-apollo';
import { DropDownHolder } from '../util/alert';
import { Feather } from '@expo/vector-icons';
import { GET_CURRENT_USER } from '../constants/GraphAPI';
import logo from '../assets/images/icon.png';
import layout from '../constants/Layout';
const { width } = layout.window;

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.load();
    this._subLoad = this.props.navigation.addListener('willFocus', this.load)
  }

  // Called everytime the page is displayed
  load = (payload) => {
    try {
      const { type } = payload.action;
      const { data } = this.props;
      if (!data.currentUser && !type.includes('BACK')) this.displayWelcomeScreen();
    } catch (err) {}
  }

  displayWelcomeScreen = () => {
    this.props.navigation.navigate('Welcome')
  }

  componentWillUnmount() {
    // Remove listener when destoyed
    this._subLoad.remove();
  }

  _handleLogout = () => {
    try {
      this.props.client.writeQuery({
        query: GET_CURRENT_USER,
        data: {
          currentUser: null
        }
      });
      DropDownHolder.alert('success', 'Success', `Sucessfully logged out!`);
      this.props.navigation.navigate('Welcome')
    } catch(err) {
      DropDownHolder.alert('error', 'Error', err.message);
    }
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.outestContainer}>
        { // if user logged in, show log out button
            data.currentUser && 
            <TouchableOpacity style={styles.logoutBtn} onPress={this._handleLogout}>
                <Feather name='log-out' size={26} color='white' />
            </TouchableOpacity>
        }
        { // if user logged in ... else ...
          data.currentUser
          ? <UserProfile user={data.currentUser} />
          : (
              <View style={styles.hintContainer}>
                <Image source={logo} style={styles.hintImage} />
                <Text style={styles.hintText}>You are not logged in yet</Text>
                <Button style={styles.hintBtn} onPress={this.displayWelcomeScreen}>
                  Join Us
                </Button>
              </View>
            )
        }
      </View>
    );
  }
}

// Fetch current user from global state
export default withApollo(graphql(GET_CURRENT_USER)(SettingsScreen));

const styles = StyleSheet.create({
  outestContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  logoutBtn: {
    position: 'absolute',
    right: '6%',
    top: 50,
    zIndex: 10,
  },
  hintContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintImage: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  hintText: {
    color: 'rgb(70, 70, 70)',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  hintBtn: {
    color: 'rgb(252, 184, 58)',
    borderColor: 'rgb(252, 184, 58)',
    borderWidth: 2,
  },
});