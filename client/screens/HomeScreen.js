import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import { sayHi } from '../redux/actions/test';

export class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  componentDidUpdate() {
    this.props.sayHi()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            <Text style={styles.textStyle}>Name</Text>
            <Text style={styles.textStyle}>{this.props.name}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center'
  },
  // tabBarInfoContainer: {
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: 'black',
  //       shadowOffset: { height: -3 },
  //       shadowOpacity: 0.1,
  //       shadowRadius: 3,
  //     },
  //     android: {
  //       elevation: 20,
  //     },
  //   }),
  // },
});

const mapStateToProps = (state) => ({
  name: state.testReducer.name,
})

const mapDispatchToProps = (dispatch) => ({
  sayHi: () => dispatch(sayHi()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);