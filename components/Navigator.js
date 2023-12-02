import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ListaScreen from '../screens/ListaEjercicios';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }} />
        <Stack.Screen
          name="Ejercicios"
          component={ListaScreen}
          options={{ title: 'Ejercicios' }} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profile' }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;