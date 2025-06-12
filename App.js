import { StatusBar } from 'expo-status-bar';
import React from 'react';
import WelcomeScreen from './src/components/WelcomeScreen';
import HomeScreen from './src/components/HomeScreen';
import ARScene from './src/components/ARScene';
import Menu from './src/components/Menu';
import Content from './src/components/Content';
import DetailsScreen from './src/components/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ARScene" component={ARScene} options={{ headerShown: false }}/>
        <Stack.Screen name="DetailScreen" component={DetailsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }}/>
        <Stack.Screen name="Content" component={Content} options={{ headerShown: false }}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}


