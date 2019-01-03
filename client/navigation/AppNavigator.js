import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  /** Manage the main tabbar of the app */
  Main: MainTabNavigator,
});