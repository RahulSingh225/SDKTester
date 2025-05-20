import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const MainNavigator = () => {
    
const Stack = createNativeStackNavigator();
    

  return (
   <Stack.Navigator>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={Home} />
   </Stack.Navigator>
  )
}

export default MainNavigator