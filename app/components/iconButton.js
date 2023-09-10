import { StyleSheet, Pressable } from 'react-native'
import React,{ useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';


const IconButton = ({onPress, icon, size, color, style}) => {
    const [pressState,setPressState] = useState(false)
  return (
    <Pressable 
    onPress={onPress}
    onPressIn={()=>setPressState(true)}
    onPressOut={()=>setPressState(false)}
    style={[{
      opacity: pressState ? 0.5 : 1,
      backgroundColor: pressState ? '#3063A6' :'#4996FA',
      borderRadius:20
      },style]}>
      <Icon name={icon} size={size} color={color}/>
    </Pressable>
  )
}

export default IconButton

