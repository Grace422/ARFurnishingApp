import { StatusBar } from 'expo-status-bar';
import React from 'react';
import WelcomeScreen from './src/components/WelcomeScreen';
import HomeScreen from './src/components/HomeScreen';
import ARScene from './src/components/ARScene';
import Content from './src/components/Content';
import DetailsScreen from './src/components/DetailsScreen';
import Tutorial from './src/components/Tutorial';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ARScene" component={ARScene} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailScreen" component={DetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Content" component={Content} options={{ headerShown: false }}/> 
        <Stack.Screen name="Tutorial" component={Tutorial} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


