import React from 'react';  // React Core
import { Platform, StatusBar, StyleSheet, View, Text, AsyncStorage } from 'react-native'; // React-Native Components
import { AppLoading, Asset, Font, Icon, Updates } from 'expo'; // Additional component provided by ExpoKit
/** Apollo Client Pieces */
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
/** Global notification dropdown setup */
import DropdownAlert from 'react-native-dropdownalert';
import { DropDownHolder } from './util/alert';
import { sleep } from './util/sleep';
/** Routing navigation component */
import AppNavigator from './navigation/AppNavigator';

/** Create in-memory cache to store application state */
const cache = new InMemoryCache();
/** Persist the in-memory state to local storage (local `database`) */ 
persistCache({
  cache,
  storage: AsyncStorage,
});

/**
 * Create and Configure the Apollo client for communicating with backend Apollo server through GraphQL
 */
const client = new ApolloClient({
  uri: 'http://kyrie.top:3333/graphql',
  cache,
  clientState: {
    defaults: {
      currentUser: null,
    },
  }
});

/**
 * Application Entry Point - Root Component
 */
export default class App extends React.Component {
  /** Component state */
  state = {
    isLoadingComplete: false,
  };

  /** Check for updates to refresh immediately */
  componentDidMount() {
    Updates.addListener(async (event) => {
      if (event.type === Updates.EventType.DOWNLOAD_STARTED) {
        DropDownHolder.alert('info', 'Hey', 'New update is availble and downloading!');
      }
      if (event.type === Updates.EventType.DOWNLOAD_FINISHED) {
        DropDownHolder.alert('success', 'Success', 'Updating new version...');
        await sleep(3000);
        Updates.reload();
      }
    })
  }

  /** Using JSX (HTML-like) syntax for declarative UI */
  render() {
    // If loading in progress
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={client}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} closeInterval={3000}/>
          </View>
        </ApolloProvider>
      );
    }
  }

  /** Load important assets asynchronously in advance for better experience */
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/cookday.jpg'),
        require('./assets/images/foodbg.jpg'),
        require('./assets/images/default_male.png'),
        require('./assets/images/default_female.png'),
        require('./assets/images/icon.png'),
        /**
         * Cuisines
         */
        require('./assets/cuisines/chuancai.jpg'),
        require('./assets/cuisines/lucai.jpeg'),
        require('./assets/cuisines/yuecai.jpg'),
        require('./assets/cuisines/sucai.jpg'),
        require('./assets/cuisines/zhecai.jpg'),
        require('./assets/cuisines/mincai.jpg'),
        require('./assets/cuisines/xiangcai.jpg'),
        require('./assets/cuisines/huicai.jpg'),
        require('./assets/cuisines/dongbei.jpg'),
        require('./assets/cuisines/jing.jpg'),
        require('./assets/cuisines/xinjiang.jpg'),
        require('./assets/cuisines/qingzhen.jpg'),
        require('./assets/cuisines/huaiyang.jpg'),
        require('./assets/cuisines/hubei.jpg'),
        require('./assets/cuisines/chaozhou.jpg'),
        require('./assets/cuisines/kejia.jpg'),
        require('./assets/cuisines/west.jpg'),
        require('./assets/cuisines/hongkong.jpg'),
        require('./assets/cuisines/korea.jpg'),
        require('./assets/cuisines/japan.jpg'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  /** ES6 Arrow functions for binding `this` keyword automatically */
  _handleFinishLoading = () => {
    // So that `this` here would be referring to the component class instead of `undefined`
    this.setState({ isLoadingComplete: true });
  };
}

/**
 * StyleSheet to style the component, using CSS-in-JS
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
