import React from 'react';
import {View, Text, Button} from 'react-native'

const HomeScreen = ({navigation})  => {
const hola= 'hola'
console.log(hola)
  return (
    <Button
      title="go to ComponentsScreen"
      onPress={() =>
        navigation.navigate('ComponentsScreen')
      }
    />
  );
};


export default HomeScreen;
