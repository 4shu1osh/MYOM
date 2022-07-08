import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/home';
import routes from './routeNames';
import MemeGenerator from '../screens/memeGenerator';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={routes.home} component={Home} />
        <Stack.Screen name={routes.memeGenerator} component={MemeGenerator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
