import * as Keychain from 'react-native-keychain';
import config from '../config/config';

 const saveAuthUser = async () => {
  const username = 'zuck';
  const password = config.KEY_CHAIN_PASS

  // Store the credentials
  await Keychain.setGenericPassword(username, password);

  try {
    // Retrieve the credentials
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username
      );
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
  await Keychain.resetGenericPassword();
};