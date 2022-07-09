import ViewShot from 'react-native-view-shot';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import localImages from '../../utils/localImages';
import TouchableImg from '../../components/touchableImg';
import response from '../../utils/response';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import routes from '../../routes/routeNames';

export default function MemeGenerator({route}) {
  const {img, caption} = route.params;
  const rand = Math.floor(Math.random() * 10);
  const viewShotRef = React.useRef(null);

  const navigation = useNavigation();

  async function onShare(app) {
    viewShotRef.current.capture().then(uri => {
      switch (app) {
        case 'whatsapp':
          Share.shareSingle({
            title: 'Share via WhatsApp',
            message: 'Hey, I just made this meme using MYOM app',
            type: 'image/jpeg',
            url: uri,
            filename: 'Awesome_Product',
            social: Share.Social.WHATSAPP,
          });
          break;
        case 'instagram':
          Share.shareSingle({
            social: Share.Social.INSTAGRAM,
            url: uri,
            type: 'image/*',
          });
          break;
        case 'others':
          Share.shareSingle({
            title: 'Share via',
            message: 'Hey, I just made this meme using MYOM app',
            url: uri,
            social: Share.Social.TELEGRAM,
          });
          break;
        default:
          break;
      }
    });
  }

  const onDownload = () => {
    viewShotRef.current.capture().then(uri => {
      CameraRoll.save(uri, {type: 'photo', album: 'Meme Generator'});
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.chat} source={localImages.chat}>
        <Text style={styles.heading}>{response[rand]}</Text>
      </ImageBackground>

      <ViewShot
        ref={viewShotRef}
        options={{format: 'jpg', quality: 1}}
        style={styles.viewShot}>
        <Text style={styles.caption}>{caption}</Text>
        <View style={styles.imgCcontainer}>
          <Image
            source={{uri: img}}
            style={styles.img}
            resizeMode={'contain'}
          />
          <Text style={styles.watermark}>{'[ Created with MYOM]'}</Text>
        </View>
      </ViewShot>
      <View style={styles.footer}>
        <View>
          <Text style={styles.share}>{'Share or save your creation'}</Text>
          <View style={styles.socialContainer}>
            <TouchableImg
              style={styles.icon}
              source={localImages.whatsapp}
              onPress={() => onShare('whatsapp')}
            />
            <TouchableImg
              style={styles.icon}
              source={localImages.instagram}
              onPress={() => onShare('instagram')}
            />
            <TouchableImg
              style={styles.shareIcon}
              source={localImages.share}
              onPress={() => onShare('others')}
            />
            <TouchableImg
              style={styles.icon}
              source={localImages.download}
              onPress={onDownload}
            />
          </View>
        </View>
        <Image source={localImages.logo} style={styles.logoStyle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.green,
    paddingVertical: 50,
  },
  logoStyle: {
    width: 150,
    height: 70,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  caption: {
    fontSize: 14,
    color: colors.black,
    fontFamily: 'sans-serif-light',
    lineHeight: 20,
    width: 280,
    marginBottom: 10,
    marginLeft: 20,
  },
  viewShot: {
    width: 300,
    height: 330,
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginTop: 20,
  },
  img: {
    width: 260,
    height: 180,
    borderRadius: 10,
  },
  watermark: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    fontSize: 8,
    color: colors.gray,
    fontFamily: 'serif',
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  shareIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    height: 30,
    marginVertical: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imgCcontainer: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  share: {
    fontSize: 14,
    marginLeft: 20,
    color: colors.red,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    marginTop: 20,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  heading: {
    fontSize: 14,
    color: colors.black,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  chat: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    paddingHorizontal: 10,
    marginBottom: 40,
    marginTop: 20,
  },
  footer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
