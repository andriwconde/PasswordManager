import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './app/screens/loginScreen';
import RegisterScreen from './app/screens/registerScreen';
import StartScreen  from './app/screens/startScreen';
import BiometricEnrollmentScreen from './app/screens/biometricEnrollmentScreen';
import { Provider } from 'react-redux';
import {store} from './app/redux/store'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Start" component={StartScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name="BiometricEnrollment" component={BiometricEnrollmentScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;