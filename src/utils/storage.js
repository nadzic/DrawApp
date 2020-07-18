import AsyncStorage from '@react-native-community/async-storage';

export const storeUsername = async (value) => {
  try {
    await AsyncStorage.setItem('@username', value);
  } catch (e) {
    // saving error
  }
};

export const getUsername = async () => {
  try {
    const value = await AsyncStorage.getItem('@username');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log("error getting value from storage", e);
  }
};
