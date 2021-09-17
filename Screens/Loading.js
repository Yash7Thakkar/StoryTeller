import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';


export default class Loading extends Component {
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Dashboard');
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  };
  componentDidMount(){
    this.checkIfLoggedIn()
  }
  render() {
    return (
      <View>
        <Text> Loading </Text>
      </View>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
