import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ComponentsScreen = ({navigation}) => {
    return (<View style={styles.viewStyles}>
        <Text style={styles.textStyle}>ComponentsScreen</Text>
        <Button
        title="go to AnotherScreen"
        onPress={() => navigation.navigate('AnotherScreen')}
        />
    </View>);

}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:30,
        color:'black',
    },
    viewStyles:{
        flex:1 ,
        justifyContent:'center',
        alignItems:'center'
    }
});
export default ComponentsScreen;