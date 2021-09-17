import React, { Component } from 'react';
import { View, Text, Stylesheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../Navigation/DrawerNavigator';
export default class Dashboard extends Component {
  render() {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
}
