import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const DrawScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {}}
      >
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
};
