import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import DropdownAlert from 'react-native-dropdownalert';
import { DropDownHolder } from './util/alert';
import typeDefs from './clientState/typeDef';
import { defaults, resolvers } from './clientState/resolvers';
import AppNavigator from './navigation/AppNavigator';

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
});

const client = new ApolloClient({
  uri: 'http://10.8.204.12:3333/graphql',
  // uri: 'http://kyrie.top:3333/graphql',
  cache,
  clientState: {
    defaults,
    resolvers,
    // typeDefs,
  }
});

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
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

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/cookday.jpg'),
        require('./assets/images/foodbg.jpg'),
        require('./assets/images/default_male.png'),
        require('./assets/images/default_female.png'),
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
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
