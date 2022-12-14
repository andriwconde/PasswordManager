import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import React, {useEffect} from 'react';
import FingerprintIcon from '../../assets/images/icons/fingerprintIcon.svg'
import FingerprintScanner from 'react-native-fingerprint-scanner';


const BiometricPopUp = ({fingerprintPopUp, setFingerprintPopUp}) => {
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
        console.log('hola');
        this.props.onAuthenticate();
      })
      .catch(() => {
        setFingerprintPopUp(false);
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
        Fingerprint Autentication
      </Text>
      <View style={styles.fingerSVG}>
        <FingerprintIcon />
      </View>
    </TouchableOpacity>
  );
};

export default BiometricPopUp;

const styles = StyleSheet.create({
  fingerPrintButton: {
    backgroundColor: 'white',
    width: '65%',
    paddingVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 5,
    marginRight: 15,
    flexDirection: 'row',
  },
  fingerPrintText: {
    alignSelf: 'center',
    color: '#374FC6',
    fontSize: 13,
  },
  fingerprintButtonView:{
    alignItems: 'flex-end',
    marginTop: 12,
    borderWidth: 1,
  },
  fingerSVG: {
    height: '42%',
    flex: 1,
    marginLeft: 2,
  },
  textColorStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
