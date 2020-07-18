import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export const DiaryScreen = ({ navigation }) => {

  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    firestore().collection('diaries').get()
      .then(response => {
        const fetchedDiaries = [];
        response.docs.forEach(document => {
          const fetchedDiary = {
            id: document.id,
            ...document.data()
          };
          fetchedDiaries.push(fetchedDiary);
        });
        setDiaries(fetchedDiaries);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require('DrawApp/assets/png/bg.png')}
      >
      <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={{ color: 'white', marginTop: 70, fontSize: 50, textAlign: 'center' }}>Diaries</Text>
      {error && <Text>Oops there is an error</Text>}
      {diaries && diaries.map(diary => (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'white' }}>{diary.username}</Text>
          <Image
          style={styles.logo}
          source={{
            uri: diary.imageUrl
          }}
        />
        </View>

      ))}
      </ScrollView>
      </ImageBackground>
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  logo: {
    width: 300,
    height: 300,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
});