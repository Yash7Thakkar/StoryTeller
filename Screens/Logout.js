import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';


export default class LogOut extends Component {
  componentDidMount(){
    firebase.auth().signOut()
  }
  render() {
    return (
      <View>
        <Text> Log Out </Text>
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