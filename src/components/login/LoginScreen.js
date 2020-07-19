import React, { useState } from 'react';
import {
  View,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { storeUsername } from 'DrawApp/src/utils/storage';
import { COLORS } from 'DrawApp/src/constants/colors';

const BUTTON_HEIGHT = 55;
const INPUT_FIELDS_HEIGHT = 58;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');

  const signIn = () => {
    storeUsername(username);
    setUsername('');
    navigation.navigate('Draw');
  };

  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
      <View style={styles.container}>
            <View style={styles.logoWrapper}>
            <Image
              style={styles.logoText}
              source={require('DrawApp/assets/png/drawout-text.png')}
            />
          </View>
          <View style={styles.markWrapper}>
            <Image
              style={styles.mark}
              source={require('DrawApp/assets/png/drawout-logo.png')}
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 0.1 * SCREEN_HEIGHT }}>
            <View style={{ position: 'relative' }}>
              <View style={styles.usernameSection}>
                <Image
                  source={require('DrawApp/assets/png/username.png')}
                  style={styles.usernameImage}
                />
                <Text style={{ position: 'absolute', color: COLORS.WHITE, fontSize: 10, lineHeight: 10, letterSpacing: 1, left: 60, top: 0 }}>
                  USERNAME
                </Text>
                <TextInput
                  style={styles.usernameInput}
                  underlineColorAndroid="transparent"
                  placeholder="Enter username"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={username}
                  placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <View>
                <Image
                  source={require('DrawApp/assets/png/line.png')}
                  style={styles.lineImage}
                />
              </View>
              <View>
              <Image
                source={require('DrawApp/assets/png/line.png')}
                style={styles.lineImage}
              />
            </View>
            </View>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={signIn}
              disabled={!username ? true : false}
            >
              <Text style={[styles.loginText]}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.createForgetSection} />
          </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F18A7B',
    height: '100%',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  markWrapper: {
    marginTop: 0,
    zIndex: 100,
    width: 150,
    height: 150,
  },
  mark: {
    width: 150,
    height: 150,
  },
  logoWrapper: {
    marginTop: SCREEN_HEIGHT * .17,
    zIndex: 100,
    width: 250,
    height: 80,
  },
  logoText: {
    resizeMode: 'contain',
    width: 250,
    height: 80,
  },
  createForgetSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 18,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 0.84 * SCREEN_WIDTH,
    borderRadius: 50,
    height: BUTTON_HEIGHT,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  usernameSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '7.5%',
    marginRight: '7.5%',
  },
  usernameImage: {
    padding: 10,
    margin: 5,
    height: 22,
    width: 22,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    left: 0,
  },
  lineImage: {
    width: '100%',
    zIndex: 200,
    height: 1,
  },
  usernameInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 60,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: COLORS.WHITE,
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '7.5%',
    marginRight: '7.5%',
    marginTop: 20,
  },
  passwordImage: {
    margin: 5,
    height: 23,
    width: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  passwordInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 60,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  loginText: {
    color: COLORS.WHITE,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
  },
});
