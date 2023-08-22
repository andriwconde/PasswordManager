import {StyleSheet, Text, View, TouchableOpacity, Platform, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const BiometricPopUp = ({fingerprintPopUp, setFingerprintPopUp, navigation}) => {
  const login = useSelector(state => state.login)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (requiresLegacyAuthentication()) {
      authLegacy();
    } else if (fingerprintPopUp) {
      authCurrent();
    }
    return () => {
      FingerprintScanner.release();
    };
  }, [fingerprintPopUp]);

  const requiresLegacyAuthentication = () => {
    return Platform.Version < 23;
  };

  const authCurrent = async () => {
    biometricType === 'Biometrics' ? FingerprintScanner.authenticate({
      title: 'Log in with Biometrics',
      cancelButton: 'atras',
    })
      .then(() => {
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        navigation.navigate('Start')
        setFingerprintPopUp(false)
      })
      .catch((err) => {
        setFingerprintPopUp(false)       
      })
      :

    (biometricType === 'Face ID' || biometricType === 'Touch ID') && FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        console.log('autenticado')
        AlertIOS.alert('Authenticated successfully');
      })
      .catch((error) => {
        AlertIOS.alert(error.message);
    });

  }

  const authLegacy = () => {
    biometricType === 'Biometrics' ? FingerprintScanner.authenticate({
      title: 'Log in with Biometrics',
      cancelButton: 'atras',
    })
      .then(() => {
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
        console.log('holaas')
        setFingerprintPopUp(false)
      })
      .catch((err) => {
        setFingerprintPopUp(false)       
      })
      :

    (biometricType === 'Face ID' || biometricType === 'Touch ID') && FingerprintScanner
      .authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        console.log('autenticado')
        Alert.alert('Authenticated successfully');
      })
      .catch((error) => {
        Alert.alert(error.message);   
    });
  };


  return (
    <TouchableOpacity
      style={styles.fingerPrintButton}
      onPress={() => setFingerprintPopUp(true)}>
      <Text style={[styles.textColorStyle, styles.fingerPrintText]}>
        Fingerprint  Autentication
      </Text>
      <View>
        <Icon name='fingerprint' size={40} color="black" />
      </View>
    </TouchableOpacity>
  );
};

export default BiometricPopUp;

const styles = StyleSheet.create({
  fingerPrintButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent:'space-evenly',
    alignItems:'center',
    marginBottom:50
  },
  fingerPrintText: {
    alignSelf: 'center',
    color: '#374FC6',
    fontSize: 18,
  },
  fingerprintButtonView:{
    alignItems: 'flex-end',
    marginTop: 12,
    borderWidth: 1,
  },
  textColorStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
