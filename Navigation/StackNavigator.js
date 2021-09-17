import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import TabNavigator from './TabNavigator'
import Stories from '../Screens/Stories'
const Stack = createStackNavigator()
const StackNavigator = ()=>{
  return(
    <Stack.Navigator intialRouteName="Home" screenOptions={{
      headerShown : false
    }}>
    <Stack.Screen 
    name = 'Home' component= {TabNavigator}  
    />
    <Stack.Screen
    name = 'Stories' component = {Stories}
    />
    </Stack.Navigator>
  )
}
export default StackNavigator