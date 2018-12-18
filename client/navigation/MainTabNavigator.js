import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import RecipeDiscoverScreen from '../screens/RecipeDiscoverScreen';
import LearnScreen from '../screens/LearnScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import TagCenter from '../screens/TagCenter';
import IngredientsScreen from '../screens/IngredientsScreen';
import LearnStepScreen from '../screens/LearnStepScreen';

const DiscoverStack = createStackNavigator({
  Discover: RecipeDiscoverScreen,
  RecipeDetail: RecipeDetailScreen,
  Search: SearchScreen,
  Ingredients: IngredientsScreen,
  LearnStep: LearnStepScreen,
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
  TagCenter: TagCenter,
  RecipeDetail: RecipeDetailScreen,
  Ingredients: IngredientsScreen,
  LearnStep: LearnStepScreen,
});

LearnStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarLabel: 'Learn',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name='rocket1'
      />
    ),
    tabBarVisible,
  }
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
      borderTopColor: "transparent",
    },
    activeTintColor: colors.tintColor,
  }
});
