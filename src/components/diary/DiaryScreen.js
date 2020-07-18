import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu';
import firestore from '@react-native-firebase/firestore';
import { COLORS } from 'DrawApp/src/constants/colors';
import Menu from 'DrawApp/src/components/common/Menu';
import * as RootNavigation from 'DrawApp/src/utils/navigation';

const BUTTON_HEIGHT = 55;
const SCREEN_WIDTH = Dimensions.get('window').width;

export const DiaryScreen = ({ navigation }) => {

  const [diaries, setDiaries] = useState([]);
  const [error, setError] = useState();
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);

  useEffect(() => {
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

  const logout = () => {
    RootNavigation.navigate('Login', {});
  };

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
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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