import React from 'react';
import {View, Text, Button} from 'react-native'

const HomeScreen = ({navigation})  => {

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
