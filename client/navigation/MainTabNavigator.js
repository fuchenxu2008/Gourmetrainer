import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipeDiscoverScreen from '../screens/RecipeDiscoverScreen';
import LearnScreen from '../screens/LearnScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SearchScreen from '../screens/SearchScreen';

const DiscoverStack = createStackNavigator({
  Discover: RecipeDiscoverScreen,
  RecipeDetail: RecipeDetailScreen,
  Search: SearchScreen,
})

DiscoverStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
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

const LearnStack = createStackNavigator({
  Learn: LearnScreen,
});

LearnStack.navigationOptions = {
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
  LearnStack,
  SettingsStack,
}, {
  tabBarOptions: {
    style: {
      borderTopColor: "transparent"
    }
  }
});
