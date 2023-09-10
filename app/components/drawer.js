import React,{useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';

export const CustomDrawer = () => {
  return (
    <View style={style.backgroundView}>
       <View style={style.option}>

       </View>
    </View>
  );
};

const style = StyleSheet.create({
    backgroundView:{
        flex:1,
        alignItems:'center',
    },
    option:{
        width:'100%',
        height:'5%',
        borderWidth:1,
    }
  });