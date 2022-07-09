import {View, ImageBackground, StyleSheet, Text} from 'react-native';
import React from 'react';
import localImages from '../../utils/localImages';
import routes from '../../routes/routeNames';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
const navigation = useNavigation();

  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{name: routes.home}],
    });
  }, 500);
  return (
    <View style={StyleSheet.container}>
      <ImageBackground
        source={localImages.splashScreen}
        style={styles.splashImg}
        resizeMode={'cover'}></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashImg: {
    width: '100%',
    height: '100%',
  },
});
