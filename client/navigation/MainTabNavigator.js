import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RecipeDiscoverScreen from '../screens/RecipeDiscoverScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AuthScreen from '../screens/AuthScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

const DiscoverStack = createStackNavigator({
  Discover: RecipeDiscoverScreen,
  RecipeDetail: RecipeDetailScreen,
})

DiscoverStack.navigationOptions = {
  tabBarLabel: 'Discover',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='find'
    />
  ),
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
  Auth: AuthScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='user'
    />
  ),
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
