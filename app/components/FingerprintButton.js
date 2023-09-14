import { StyleSheet, Pressable, Text } from 'react-native'
import React,{ useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


const FingerprintButton = ({onPress}) => {
  return (
    <Pressable 
    onPress={onPress}
    style={styles.container}>
      <Icon name='fingerprint' size={50} color='white'/>
      <Text style={styles.buttonText}>Login with biometrics</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
      width:'60%',
      borderWidth:2,
      borderColor:'white',
      flexDirection:'row',
      alignItems:'center',
      marginBottom:'15%',
      paddingVertical:6,
      paddingHorizontal:10,
      borderRadius:4,
    },
    buttonText:{
      color:'white',
      marginLeft:14,
      fontSize:16,
      fontWeight:'bold'
    }
  });

export default FingerprintButton