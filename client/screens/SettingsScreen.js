import React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, Animated, TouchableOpacity } from 'react-native';
import UserProfile from '../components/UserProfile';
import { graphql, withApollo } from 'react-apollo';
import { DropDownHolder } from '../util/alert';
import { Feather } from '@expo/vector-icons';
import { GET_CURRENT_USER } from '../constants/GraphAPI';

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
      if (!data.currentUser && !type.includes('BACK')) this.props.navigation.navigate('Welcome')
    } catch (err) {}
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
      <View style={{ flex: 1 }}>
        {
            data.currentUser && 
            <TouchableOpacity style={styles.logoutBtn} onPress={this._handleLogout}>
                <Feather name='log-out' size={26} color='white' />
            </TouchableOpacity>
        }
        <UserProfile user={data.currentUser} />
      </View>
    );
  }
}

export default withApollo(graphql(GET_CURRENT_USER)(SettingsScreen));

const styles = StyleSheet.create({
  logoutBtn: {
    position: 'absolute',
    right: '6%',
    top: 50,
    zIndex: 10,
  },
});