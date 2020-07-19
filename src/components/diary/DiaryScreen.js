import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';
import * as tf from '@tensorflow/tfjs';
import firestore from '@react-native-firebase/firestore';
//import { fetch } from '@tensorflow/tfjs-react-native'
//import { fetch } from '@tensorflow/tfjs-react-native'
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as RNFS from 'react-native-fs';
import * as jpeg from 'jpeg-js';
import { COLORS } from 'DrawApp/src/constants/colors';
import Menu from 'DrawApp/src/components/common/Menu';
import tesla from './tesla.jpg';

global.fetch = require('node-fetch');

const BUTTON_HEIGHT = 55;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const DiaryScreen = ({ navigation }) => {

  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const [isTfReady, setIsTfReady] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [model, setModel] = useState(null);


  const imageToTensor = (rawImageData) => {
    console.log("rawImageData: ", rawImageData);
    const TO_UINT8ARRAY = true
    const { width, height, data } = jpeg.decode(rawImageData, TO_UINT8ARRAY)
    // Drop the alpha channel info for mobilenet
    const buffer = new Uint8Array(width * height * 3)
    let offset = 0 // offset into original data
    for (let i = 0; i < buffer.length; i += 3) {
      buffer[i] = data[offset]
      buffer[i + 1] = data[offset + 1]
      buffer[i + 2] = data[offset + 2]

      offset += 4
    }

    return tf.tensor3d(buffer, [height, width, 3])
  }

  const classifyImage = async () => {
    try {
      const imageAssetPath = Image.resolveAssetSource(tesla);
      console.log("imageAssetPath: ", imageAssetPath);
      //const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
      console.log("we aee here");
      //console.log("response: ", response);
      //const imageTensor = imageToTensor(response.url);
      //const predictions = model.classify(imageTensor);
      //console.log(predictions);

      RNFS.readFile("https://firebasestorage.googleapis.com/v0/b/drawme-6c849.appspot.com/o/46680336.jpg?alt=media&token=57ffdd6d-6a2b-48ab-9586-56d1ff4b9896", "base64").then(data => {
        // binary data
        console.log("getr data in base64")
        console.log(data);
        /*const imageTensor = imageToTensor(data);
        const predictions = model.classify(imageTensor);*/
        //this.setState({ predictions })
        //console.log(predictions);
      });

    } catch (error) {
      console.log(error)
    }
  };

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
      const model = await mobilenet.load();
      setModel(model);
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

  const menu = <Menu />;

  /*if (isModelReady && isTfReady) {
    classifyImage()
  }*/

  return (
    <SideMenu
      menu={menu}
      isOpen={isOpenSideMenu}
      onChange={isOpenSideMenu => setIsOpenSideMenu(isOpenSideMenu)}
    >
      <View style={styles.container}>
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
      </View>
      </SideMenu>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#71D6C0',
  },
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