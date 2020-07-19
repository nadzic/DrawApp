import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from 'DrawApp/src/constants/colors';
import { getUsername, clearStorage } from 'DrawApp/src/utils/storage';
import * as RootNavigation from 'DrawApp/src/utils/navigation';
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const Menu = () => {

  const [username, setUsername] = useState('');
  const usernamePromise = getUsername();

  useEffect(() => {
    usernamePromise.then((username) => {
      setUsername(username);
    });
  });

  const logout = () => {
    clearStorage();
    RootNavigation.navigate('Login', {});
  };

    return (
      <ScrollView scrollsToTop={false} style={styles.container}>
        <View style={styles.userSection}>
          <Image style={styles.userImage} source={require('DrawApp/assets/png/userpic.png')} />
          <View>
            <Text style={styles.nameText}>{username}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.lineSeparator} />
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage}  source={require('DrawApp/assets/png/home.png')} />
            <Text
              style={styles.itemText}
              onPress={() => RootNavigation.navigate('Draw', {})}
            >
              Draw
            </Text>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage}  source={require('DrawApp/assets/png/ranking.png')} />
            <Text
              style={styles.itemText}
              onPress={() => RootNavigation.navigate('Diary', {})}
            >
              Diaries
            </Text>
          </View>
          <View style={styles.lineSeparator} />
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={require('DrawApp/assets/png/logout.png')} />
            <Text
              onPress={logout}
              style={styles.itemText}
            >
              Logout
          </Text>
          </View>
          <View style={styles.lineSeparator} />
          <View>
            <Text style={styles.headlineText}>Customer support</Text>
            <TouchableOpacity
              //onPress={() => this.onSupportClick('nik@drawout.com')}
            >
              <Text style={styles.emailText}>support@drawout.art</Text>
            </TouchableOpacity>
            <Text style={[styles.headlineText, { marginTop: 20 }]}>Tech support</Text>
            <TouchableOpacity
              //onPress={() => this.onSupportClick('nik@drawout.com')}
            >
              <Text style={styles.emailText}>tech@drawout.art</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WINDOW_WIDTH + 1,
    height: WINDOW_HEIGHT,
    backgroundColor: '#F4C51B',
    borderRightWidth: 1,
    borderRightColor: COLORS.RED,
    borderStyle: 'solid',
  },
  userSection: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%',
    height: 100,
    paddingTop: 25,
    paddingLeft: 25,
    paddingBottom: 25,
    paddingRight: (WINDOW_WIDTH * 0.33) + 25,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 25,
  },
  nameText: {
    color: COLORS.GREY2,
    fontSize: 18,
  },
  content: {
    paddingLeft: 25,
    paddingRight: (WINDOW_WIDTH * 0.33) + 25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 31.5,
  },
  itemImage: {
    height: 25,
    width: 25,
    resizeMode: "contain",
  },
  itemText: {
    fontSize: 18,
    marginLeft: 25,
  },
  itemTextSelected: {
    color: COLORS.RED,
    fontSize: 18,
    marginLeft: 25,
  },
  lineSeparator: {
    borderBottomColor: COLORS.BLACK,
    borderBottomWidth: 0.5,
    marginBottom: 31.5,
  },
  headlineText: {
    color: COLORS.GREY2,
    fontSize: 14,
  },
  emailText: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;