import React from "react";
import { Text, StyleSheet } from "react-native";

const ComponentsScreen= ({navigation})=>{
return <Text style={styles.textStyle}>ComponentsScreen</Text>;
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:30
    }
});
export default ComponentsScreen;