import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

const StartScreen = () => {
    return (
        <View style={style.backgroundView}>
            <Text style={style.titleText}>Welcome</Text>
        </View>
    );
}

export default StartScreen;

const style = StyleSheet.create({
    backgroundView:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#4996FA',
      },
      titleText:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        },
})