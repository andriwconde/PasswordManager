import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import AnotherScreen from './src/screens/AnotherScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} headerShown={false}/>
        <Stack.Screen name="AnotherScreen" component={AnotherScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;