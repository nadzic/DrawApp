/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from 'DrawApp/src/components/login/LoginScreen';
import { DrawScreen } from 'DrawApp/src/components/draw/DrawScreen';
import { DiaryScreen } from 'DrawApp/src/components/diary/DiaryScreen';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Draw" component={DrawScreen} />
        <Stack.Screen name="Diary" component={DiaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
