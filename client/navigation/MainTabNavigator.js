import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import colors from '../constants/Colors';
/** Importing all screen components */
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

/** Create stack of available screens in the first tab, so user can navigate back and forth among these screens */
const DiscoverStack = createStackNavigator({
  Discover: RecipeDiscoverScreen,
  RecipeDetail: RecipeDetailScreen,
  Welcome: WelcomeScreen,
  Search: SearchScreen,
  Ingredients: IngredientsScreen,
  LearnStep: LearnStepScreen,
})

/** Configure the stack, like icon */
DiscoverStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  // Hide the tabbar when not on the top level screens
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
  Welcome: WelcomeScreen,
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
  RecipeDetail: RecipeDetailScreen,
  Ingredients: IngredientsScreen,
  LearnStep: LearnStepScreen,
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

/** Export the created tabbar using stacks defined and set styles */
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
