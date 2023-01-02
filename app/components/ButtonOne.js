import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'

const ButtonOne = () => {
  return (
    <TouchableOpacity style={styles.touchableStyle}>
        <View style={styles.viewStyles}>
            <Text style={styles.textStyle}>ButtonOne</Text>
        </View>
    </TouchableOpacity>
  )
}

export default ButtonOne

const styles = StyleSheet.create({
    textStyle:{

    },
    viewStyles:{
    },
    touchableStyle:{
        alignItems:'center',
    }
})
