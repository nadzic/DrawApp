import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';
import * as tf from '@tensorflow/tfjs';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from 'DrawApp/src/constants/colors';
import Menu from 'DrawApp/src/components/common/Menu';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as RootNavigation from 'DrawApp/src/utils/navigation';

global.fetch = require('node-fetch');

const BUTTON_HEIGHT = 55;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const DiaryScreen = ({ navigation }) => {

  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);

  const setTfReady = async () => {
    try {
      await tf.ready();
      setIsTfReady(true);
    } catch (error) {
        throw error;
    }
  };

  const setTfModelReady = async () => {
    try {
      console.log("loading model.. before");
      await mobilenet.load();
      console.log("loading model.. after");
      setIsModelReady(true);
    } catch (error) {
        throw error;
    }
  };

  useEffect(() => {
    /* tensor flow stuff */
    setTfReady();
    setTfModelReady();

    /* end of tensor flow */
    firestore().collection('diaries').orderBy('createdAt', 'desc').get()
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

  console.log("isTfReady: ", isTfReady)

  const menu = <Menu />;

  return (
    <SideMenu
      menu={menu}
      isOpen={isOpenSideMenu}
      onChange={isOpenSideMenu => setIsOpenSideMenu(isOpenSideMenu)}
    >
      <ImageBackground
        style={styles.backgroundImage}
        source={require('DrawApp/assets/png/bg.png')}
      >
      <TouchableOpacity
        onPress={() => setIsOpenSideMenu(!isOpenSideMenu)}
        style={styles.menuButton}
      >
        <Image
          source={require('DrawApp/assets/png/menu.png')}
          style={styles.menu}
        />
      </TouchableOpacity>
        <ScrollView style={{width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
          <Text style={{ color: 'white', marginTop: 70, fontSize: 50, textAlign: 'center' }}>Diaries</Text>
          <Text>TFJS ready? {isTfReady ? <Text>Yes</Text> : ''}</Text>
          <Text>
          Model ready?{' '}
          {isModelReady ? <Text>Yes</Text> : <Text>Loading Model...</Text>}
        </Text>
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
      </SideMenu>
  );
};


const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  logo: {
    width: 300,
    height: 500,
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoutButton: {
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
  logoutText: {
    color: COLORS.WHITE,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
  },
  menuButton: {
    position: 'absolute',
    top: 8,
    left: 15,
    padding: 10,
    zIndex: 1000,
  },
  menu: {
    width: 30,
    height: 30,
  },
});