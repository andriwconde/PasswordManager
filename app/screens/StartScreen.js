import React,{ useState, useEffect, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Pressable, FlatList, ActivityIndicator, DrawerLayoutAndroid } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import ReactNativeBiometrics from 'react-native-biometrics'
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../redux/slices/userSlice'
import { useIsFocused } from '@react-navigation/native';
import { getAccounts } from '../redux/slices/accountSlice'
import EncryptedStorage from 'react-native-encrypted-storage';
import IconButton from '../components/iconButton';
import { Drawer } from '../components/drawer';
const StartScreen = ({navigation}) => {
    const drawer = useRef(null);
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const rnBiometrics = new ReactNativeBiometrics()
    const accounts = useSelector(state=>state.account.accounts)
    const loading = useSelector(state=>state.account.loading)
    const [bioCheckBox, setBioCheckbox] = useState({ show:false, value:false })
    const [showDeleteCheckbox, setShowDeleteCheckbox] = useState(false)
    const [deleteChecknoxValues,setDeleteChecknoxValues] = useState([])
    
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert(
            'Log out?',
            'Are you sure to Log out?, you will lose biometric autentication',
            [{ text: "Don't Log out", style: 'cancel', onPress: () => {} },
             { text: 'Log out',
               style: 'destructive',
               onPress: async() => {
                await EncryptedStorage.clear();
                await rnBiometrics.deleteKeys();
                const { keysExist } = await rnBiometrics.biometricKeysExist()
                trasferKeys = await EncryptedStorage.getItem('transferKeys')
                if(keysExist === false && trasferKeys === null){
                    dispatch(userLogOut());
                    navigation.dispatch(e.data.action);
                }
               }
             }
            ]
        );
    })
    },[navigation]);


useEffect(() => {
    dispatch(getAccounts())
},[])

useEffect(() => {
    hasBioAuthSensor()
},[isFocused])

useEffect(() => {
    if(bioCheckBox.value){
        navigation.navigate('BiometricEnrollment');
    }
},[bioCheckBox.value])
    
const hasBioAuthSensor = async () => {
    try{
        const {available} = await rnBiometrics.isSensorAvailable()
        const { keysExist } = await rnBiometrics.biometricKeysExist()
        if(available && keysExist){
            setBioCheckbox({...bioCheckBox,show:false})
        }else if(available && !keysExist){
            setBioCheckbox({show:true,value:false})
        }
    }catch(error){
        console.log(error)
    }
}

const addAccount = ()=>{
    navigation.navigate('AccountCrud')
}

const showDeleteCheckboxFn = ()=>{
    setShowDeleteCheckbox(!showDeleteCheckbox)
}

const setDeletCheckboxValues = (account_id)=>{
    setDeleteChecknoxValues(deleteChecknoxValues.concat([account_id]))
}

const options = ()=>{
    drawer.current?.openDrawer()
}


    return (
/*         <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition='right'
            renderNavigationView={Drawer}
            style={style.backgroundView}> */
        <View style={style.backgroundView}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>Accounts</Text>
                <IconButton onPress={showDeleteCheckboxFn} icon='remove' size={40} color="white"/>
                <IconButton onPress={addAccount} icon='add' size={40} color="white"/>
                <IconButton onPress={options} icon='more-vert' size={40} color="white"/>
            </View>
            <View style={style.flatListContainer}>
                <FlatList
                    data={accounts}
                    onRefresh={()=>dispatch(getAccounts())}
                    refreshing={loading === 'LOADING'}
                    renderItem={({item,index}) =>
                    <Pressable onPress={()=>navigation.navigate('AccountCrud',item)} style={style.itemView}>
                        {showDeleteCheckbox && 
                                <BouncyCheckbox
                                fillColor="#FF5858"
                                unfillColor="#FFFFFF"
                                onPress={cheked=>{cheked && setDeletCheckboxValues(item._id)}}/>}
                            
                        <View style={style.itemDataView}>
                            <Text style={[style.itemTextTitle, showDeleteCheckbox ? style.shortPadding:style.longPadding]}>{item.accountTitle}</Text>
                            <Text style={[style.itemText, showDeleteCheckbox ? style.shortPadding:style.longPadding]}>{item.username}</Text>
                            {accounts.length -1 !== index && 
                                <View style={[style.dividerContainer, showDeleteCheckbox ? style.shortPadding:style.longPadding]}>
                                    <View style={style.divider}/>
                                </View>}
                        </View>
                    </Pressable>
                    }
                    keyExtractor={account => account._id}
                />
            </View>
        </View>
        /* </DrawerLayoutAndroid> */
    );
}

const style = StyleSheet.create({
    backgroundView:{
        flex:1,
        backgroundColor: '#4996FA',
      },
    titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    },
    bioAuthCheckboxText:{
        fontSize:10,
        fontWeight:'bold',
        color:'white', 
    },
    bioAuthCheckbox:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    headerContainer:{
        flexDirection:'row',
        with:'100%',
        justifyContent:'space-around',
        paddingTop:'2%',
    },
    itemView:{
        backgroundColor:'white',
        paddingHorizontal:10,
        flexDirection:'row',
        width:'100%'
    },
    itemTextTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#4996FA' 
    },
    shortPadding:{
        paddingLeft:0
    },
    longPadding:{
        paddingLeft:15
    },
    dividerContainer:{
        paddingTop:6,
    },

    itemText:{
        fontSize:15,
        fontWeight:'400',
        color:'#4996FA',
    },
    flatListContainer:{
        borderRadius:20,
        borderWidth:1,
        paddingVertical:8,
        marginTop:10,
        backgroundColor:'white',
        borderColor:'white',
        paddingHorizontal:5,
        height:'85%'
    },
    divider:{
        borderBottomWidth:1,
        borderBottomColor:'#BCBCBC'
    },
      itemDataView:{
        flex:1
      }
})

export default StartScreen;