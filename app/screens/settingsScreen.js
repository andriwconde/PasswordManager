import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native';



const SettingsScreen = ({route,navigation})  => {


  
  return (
    <View style={style.backgroundView}>
      <Text>hola</Text>
    </View>
  );
};

const style = StyleSheet.create({
  backgroundView:{
    flex:1,
    alignItems:'center',
    backgroundColor: '#4996FA',
  }
})

export default SettingsScreen;