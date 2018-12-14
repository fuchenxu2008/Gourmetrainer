import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipeDiscoverScreen from '../screens/RecipeDiscoverScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const DiscoverStack = createStackNavigator({
  Discover: RecipeDiscoverScreen,
  RecipeDetail: RecipeDetailScreen,
})

DiscoverStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  // if (navigation.state.index > 0) {
  //   tabBarVisible = false;
  // }
  return ({
    tabBarLabel: 'Discover',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='find'
      />
    ),
    tabBarVisible,
  });
}

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Learn',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='rocket1'
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Auth: AuthScreen,
  Welcome: WelcomeScreen,
});

SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return ({
    tabBarLabel: 'Me',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='user'
      />
    ),
    tabBarVisible,
  });
};

export default createBottomTabNavigator({
  DiscoverStack,
  LinksStack,
  SettingsStack,
}, {
  tabBarOptions: {
    style: {
      borderTopColor: "transparent"
    }
  }
});
