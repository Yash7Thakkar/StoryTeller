import * as React from 'react';
import Loading from './Screens/Loading';
import Dashboard from './Screens/Dashboard';
import Login from './Screens/Login';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import {firebaseConfig} from "./Config"
import Profile from './Screens/Profile'

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}
else{
  firebase.app()
}

const SwitchNavigator = createSwitchNavigator({
  Loading: Loading,
  Login: Login,
  Dashboard: Dashboard,
});
const AppContainer = createAppContainer(SwitchNavigator);

export default function App() {
  return <AppContainer />;
}
