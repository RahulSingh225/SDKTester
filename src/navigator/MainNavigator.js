import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import ScanIn from '../screens/ScanIn';
import ScanOut from '../screens/ScanOut';
import RegisterCustomer from '../screens/RegisterCustomer';
const MainNavigator = () => {
    
const Stack = createNativeStackNavigator();
    

  return (
   <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome} />
    
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="scanIn" component={ScanIn} />
    <Stack.Screen name="validateRetailerCoupon" component={ScanOut} />
    <Stack.Screen name="registerCustomer" component={RegisterCustomer} />
   </Stack.Navigator>
  )
}

export default MainNavigator