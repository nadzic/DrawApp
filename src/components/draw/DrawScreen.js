import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import { getUsername } from 'DrawApp/src/utils/storage';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';


export const FireBaseStorage = storage();

export const DrawScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const usernamePromise = getUsername();

  useEffect(() => {
    usernamePromise.then((username) => {
      setUsername(username);
    });
  });

  let feeling = 'neutral';
  if (username === 'Alex') {
    feeling = 'sad';
  } else if (username === 'Nik') {
    feeling = 'happy';
  } else if (username === 'Avery') {
    feeling = 'loved';
  }

  const ref = firestore().collection('diaries');

  const createStorageReferenceToFile = fileName => {
    return FireBaseStorage.ref(fileName);
  };

  const onSave = async (success, path) => {
    const fileName = /[^/]*$/.exec(path)[0];
    const storageRef = createStorageReferenceToFile(fileName);
    await storageRef.putFile(path);
    const url = await storageRef.getDownloadURL().catch((error) => { throw error });
    const timestamp = firestore.FieldValue.serverTimestamp();
    await ref.add({
      username,
      imageUrl: url,
      createdAt: timestamp,
      feeling,
    });
    navigation.navigate('Diary');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <RNSketchCanvas
          containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
          canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
          undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
          clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
          eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
          strokeComponent={color => (
            <View style={[{ backgroundColor: color }, styles.strokeColorButton]} />
          )}
          strokeSelectedComponent={(color, index, changed) => {
            return (
              <View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />
            )
          }}
          strokeWidthComponent={(w) => {
            return (<View style={styles.strokeWidthButton}>
              <View  style={{
                backgroundColor: 'white', marginHorizontal: 2.5,
                width: Math.sqrt(w / 3) * 10, height: Math.sqrt(w / 3) * 10, borderRadius: Math.sqrt(w / 3) * 10 / 2
              }} />
            </View>
          )}}
          saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
          savePreference={() => {
            return {
              folder: 'RNSketchCanvas',
              filename: String(Math.ceil(Math.random() * 100000000)),
              transparent: false,
              imageType: 'jpg',
            }
          }}
          onSketchSaved={onSave}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A'
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
