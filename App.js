/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from 'DrawApp/src/components/login/LoginScreen';
import { DrawScreen } from 'DrawApp/src/components/draw/DrawScreen';
import { DiaryScreen } from 'DrawApp/src/components/diary/DiaryScreen';
import { navigationRef, isReadyRef } from 'DrawApp/src/utils/navigation'

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  console.disableYellowBox = true;

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
     >
      <Stack.Navigator initialRouteName="Diary" headerMode="none">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Draw" component={DrawScreen} />
        <Stack.Screen name="Diary" component={DiaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
