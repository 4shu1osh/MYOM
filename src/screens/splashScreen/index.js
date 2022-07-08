import {View, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function SplashScreen() {
  return (
    <View style={StyleSheet.container}>
      <Image />
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
});
