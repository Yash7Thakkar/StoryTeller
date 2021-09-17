import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from 'firebase';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};
export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_Theme: true,
    };
  }
  async loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontsLoaded: true,
      previewImage: 'image_1',
      dropdownHeight: 40,
    });
  }

  componentDidMount() {
    var theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', function (data) {
        theme = data.val().current_theme;
      });
    this.setState({
      light_Theme: theme === 'light' ? true : false,
    });
    this.loadFontsAsync();
  }

  async addStory(){
    if(this.state.title&&this.state.description&&this.state.story&&this.state.moral){
      let storyData={
        preview_image:this.state.previewImage,
        title:this.state.title,
        description:this.state.description,
        moral:this.state.moral,
        story:this.state.story,
        author:firebase.auth().currentUser.displayName,
        created_on:new Date(),
        author_uid:firebase.auth().currentUser.uid,
        likes:0
      }
      await firebase.database().ref("/posts/"+(Math.random().toString(36).slice(2).set(storyData)))
      .then(function(data){})
      this.props.navigation.navigate("feed")
    }
    else{
      alert("All fields need to be filled")
    }
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      var preview_images = {
        image_1: require('../assets/story_image_1.png'),
        image_2: require('../assets/story_image_2.png'),
        image_3: require('../assets/story_image_3.png'),
        image_4: require('../assets/story_image_4.png'),
        image_5: require('../assets/story_image_5.png'),
      };
      return (
        <View
          style={
            this.state.light_Theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                style={styles.iconImage}
                source={require('../assets/logo.png')}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_Theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                {' '}
                Story Telling App{' '}
              </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                style={styles.previewImage}
                source={preview_images[this.state.previewImage]}
              />
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: 'Image 1', value: 'image_1' },
                    { label: 'Image 2', value: 'image_2' },
                    { label: 'Image 3', value: 'image_3' },
                    { label: 'Image 4', value: 'image_4' },
                    { label: 'Image 5', value: 'image_5' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                  onOpen={() => {
                    this.setState({
                      dropdownHeight: 170,
                    });
                  }}
                  onClose={() => {
                    this.setState({
                      dropdownHeight: 40,
                    });
                  }}
                  style={{ backgroundColor: 'transperant' }}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  dropDownStyle={{
                    backgroundColor: '#2f34fd',
                  }}
                  labelStyle={
                    this.state.light_Theme
                      ? styles.dropdownLabelLight
                      : styles.dropdownLabel
                  }
                  arrowStyle={
                    this.state.light_Theme
                      ? styles.dropdownLabelLight
                      : styles.dropdownLabel
                  }
                  onChangeItem={(a) => {
                    this.setState({
                      previewImage: a.value,
                    });
                  }}
                />
              </View>
              <TextInput
                style={
                  this.state.light_Theme
                    ? styles.inputFontLight
                    : styles.inputFont
                }
                onChangeText={(title) => {
                  this.setState({ title });
                }}
                placeholder={'Title'}
                placeholderTextColor="white"
              />
              <TextInput
                style={[
                  this.state.light_Theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(description) => {
                  this.setState({ description });
                }}
                placeholder={'Description'}
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={4}
              />
              <TextInput
                style={[
                  this.state.light_Theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(story) => {
                  this.setState({ story });
                }}
                placeholder={'Story'}
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={20}
              />
              <TextInput
                style={[
                  this.state.light_Theme
                    ? styles.inputFontLight
                    : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(moral) => {
                  this.setState({ moral });
                }}
                placeholder={'Moral of the story'}
                placeholderTextColor="white"
                multiline={true}
                numberOfLines={4}
              />
              <View style={styles.submitButton}>
<Button title="Submit"
color="#841584"
onPress={()=>{
  this.addStory()
}}/>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: 'black',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
  },
  dropdownLabel: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  dropdownLabelLight: {
    color: 'black',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
  submitButton: { marginTop: RFValue(20), alignItems: "center", justifyContent: "center" }

});
