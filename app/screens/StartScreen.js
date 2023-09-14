import React,{ useState, useEffect, useRef } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Pressable, FlatList, ActivityIndicator, DrawerLayoutAndroid } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../redux/slices/userSlice'
import { accountStateClear } from '../redux/slices/accountSlice'
import { useIsFocused } from '@react-navigation/native';
import { getAccounts, deleteManyAccounts } from '../redux/slices/accountSlice'
import IconButton from '../components/iconButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StartScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const accounts = useSelector(state=>state.account.accounts)
    const loading = useSelector(state=>state.account.loading)
    const [showDeleteCheckbox, setShowDeleteCheckbox] = useState(false)
    const [deleteChecknoxValues,setDeleteChecknoxValues] = useState([])
    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
          backHandler.remove();
        };
    },[isFocused]);

    useEffect(() => {
        if(accounts?.code === 403){
            Alert.alert(
                'Expired Sesion',
                'Your session is expired',
                [{ text: 'OK', onPress: () => {
            dispatch(accountStateClear());
            dispatch(userLogOut());
            navigation.navigate('Login')
                    }
                }]
            );

        }
    },[accounts])

useEffect(() => {
    dispatch(getAccounts())
},[])

const addAccount = ()=>{
    setShowDeleteCheckbox(false)
    setDeleteChecknoxValues([])
    navigation.navigate('AccountCrud')
}

const handleBackPress=()=>{
    let res = true 
    Alert.alert(
        'Log out?',
        'Are you sure to Log out?',
        [{ text: "Don't Log out", style: 'cancel', onPress: () => res = true },
        { text: 'Log out',
          style: 'destructive',
          onPress: () => {
              dispatch(userLogOut());
              navigation.navigate('Login')
              res = false
          }
        }
        ]
    );
    return res
}

const showDeleteCheckboxFn = ()=>{
    if(showDeleteCheckbox){
        setDeleteChecknoxValues([])
        setShowDeleteCheckbox(false)
    }else{
        setShowDeleteCheckbox(true)
    }
}

const setDeletCheckboxValues = (account_id)=>{
    setDeleteChecknoxValues(deleteChecknoxValues.concat([account_id]))
}

const deleteMany = ()=>{
    Alert.alert(
        'Delete selected',
        'Are you sure you want delete selected accounts?',
        [{ text: "Don't delete", style: 'cancel', onPress: () => {} },
         { text: 'Delete',
           style: 'destructive',
           onPress: () => {
            dispatch(deleteManyAccounts(deleteChecknoxValues))
            setShowDeleteCheckbox(false)
            setDeleteChecknoxValues([])
            dispatch(getAccounts())
           }
         }
        ]
    );
}

const options = ()=>{
    setShowDeleteCheckbox(false)
    setDeleteChecknoxValues([])
    navigation.openDrawer();
}


    return (
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
            {showDeleteCheckbox && <Pressable
                onPress={deleteMany} 
                style={style.deleteManyButton}>
                <Icon name={'delete'} size={40} color={'#FF6565'}/>
                <Text style={style.deleteManyText}>Delete</Text>
            </Pressable>}
        </View>
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
        height:'70%',
        marginBottom:'5%'
    },
    divider:{
        borderBottomWidth:1,
        borderBottomColor:'#BCBCBC'
    },
    itemDataView:{
        flex:1
    },
    deleteManyButton:{
        flexDirection:'row',
        backgroundColor:'white',
        width:'50%',
        alignSelf:'center',
        justifyContent:'center',
        borderRadius:4,
        paddingVertical:10,
        alignItems:'center'
    },
    deleteManyText:{
        color:'#FF6565',
        fontSize:23,
        fontWeight:'bold',
        marginLeft:15
    }
})

export default StartScreen;