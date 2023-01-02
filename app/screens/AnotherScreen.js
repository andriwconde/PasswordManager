import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const AnotherScreen =({navigation})=>{
return (
    <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>AnotherScreen</Text>
        <Button
        title="go to home"
        onPress={()=>navigation.popToTop()}
        />
    </View>
);
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:30,
        color:'black', 
    },
    viewStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default AnotherScreen