import ViewShot from 'react-native-view-shot';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import localImages from '../../utils/localImages';
import Share from 'react-native-share';
import TouchableImg from '../../components/touchableImg';
import response from '../../utils/response';

// const download = require('image-downloader');

const shareToInstagramStory = async () => {
  const shareOptions = {
    social: Share.Social.INSTAGRAM_STORIES,
  };

  try {
    const ShareResponse = await Share.shareSingle(shareOptions);
    setResult(JSON.stringify(ShareResponse, null, 2));
  } catch (error) {
    console.log('Error =>', error);
    setResult('error: '.concat(getErrorString(error)));
  }
};
export default function MemeGenerator({route}) {
  const {img, caption} = route.params;

  const rand = Math.floor(Math.random() * 10);

  const viewShotRef = React.useRef(null);

  const [meme, setMeme] = React.useState(null);

  React.useEffect(() => {
    viewShotRef.current.capture().then(uri => {
      setMeme(uri);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.chat} source={localImages.chat}>
        <Text style={styles.heading}>{response[rand]}</Text>
      </ImageBackground>

      <ViewShot
        ref={viewShotRef}
        options={{format: 'jpg', quality: 0.9}}
        style={styles.viewShot}>
        <Text style={styles.caption}>{caption}</Text>
        <View style={styles.imgCcontainer}>
          <Image source={{uri: img}} style={styles.img} />
        </View>
        <Text style={styles.watermark}>{'[ Created with MYOM]'}</Text>
      </ViewShot>
      <View>
        <Text style={styles.share}>{'Share or save your creation'}</Text>
        <View style={styles.socialContainer}>
          <TouchableImg style={styles.icon} source={localImages.whatsapp} />
          <TouchableImg style={styles.icon} source={localImages.instagram} />
          <TouchableImg style={styles.icon} source={localImages.facebook} />
          <TouchableImg style={styles.icon} source={localImages.download} />
        </View>
      </View>
      <Image source={localImages.logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.green,
    paddingVertical: 50,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  caption: {
    fontSize: 14,
    color: colors.black,
    fontFamily: 'sans-serif-light',
    lineHeight: 20,
    width: 300,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  viewShot: {
    width: 300,
    height: 240,
    backgroundColor: colors.white,
    justifyContent: 'center',
    marginVertical: 20,
  },
  img: {
    width: 260,
    height: 180,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  watermark: {
    position: 'absolute',
    bottom: -26,
    right: 6,
    fontSize: 8,
    color: colors.gray,
    fontFamily: 'serif',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 30,
    marginVertical: 30,
  },
  imgCcontainer: {
    width: 300,
    height: 240,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    marginBottom: 10,
  },
});
