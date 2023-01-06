import {StyleSheet, Text, View, TouchableOpacity, Platform, Alert} from 'react-native';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FingerprintIcon from '../assets/images/icons/fingerprintIcon.svg'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { setLogin } from '../redux/slices/LoginSlice';

const BiometricPopUp = ({fingerprintPopUp, setFingerprintPopUp}) => {
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
    FingerprintScanner.authenticate({
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
      });
  }

  const authLegacy = () => {
    FingerprintScanner.authenticate({
      onAttempt: this.handleAuthenticationAttemptedLegacy,
    })
      .then(() => {
        this.props.handlePopupDismissedLegacy();
        Alert.alert('Fingerprint Authentication', 'Authenticated successfully');
      })
      .catch(error => {
        this.setState({
          errorMessageLegacy: error.message,
          biometricLegacy: error.biometric,
        });
        this.description.shake();
      });
  };


  return (
    <TouchableOpacity
      style={styles.fingerPrintButton}
      onPress={() => setFingerprintPopUp(true)}>
      <Text style={[styles.textColorStyle, styles.fingerPrintText]}>
        Fingerprint  Autentication
      </Text>
      <View style={styles.fingerSVG}>
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
