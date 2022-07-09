import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import React from 'react';
import colors from '../../utils/colors';
import localImages from '../../utils/localImages';
import imagePickerFunction from '../../components/imagePicker';
import {useNavigation} from '@react-navigation/native';
import routes from '../../routes/routeNames';
import TouchableImg from '../../components/touchableImg';

export default function Home() {
  const navigation = useNavigation();
  const [img, setImg] = React.useState();
  const [caption, setCaption] = React.useState('');
  const [visible, setVisible] = React.useState(true);
  const [showButton, setShowButton] = React.useState(false);

  let inputRef = React.useRef();

  const _onFocus = () => {
    if (caption.trim().length > 0) {
      setShowButton(true);
    }
  };

  const _onChangeText = text => {
    if (text.trim().length > 0) {
      setShowButton(true);
    } else setShowButton(false);

    setVisible(true);
    setCaption(text);
  };
  const submitText = () => {
    setVisible(false);
    inputRef.current.blur();
  };

  const makeMeme = () => {
    setVisible(true);
    navigation.navigate(routes.memeGenerator, {img, caption});
  };

  const resetMeme = () => {
    setImg(null);
    setCaption('');
    setShowButton(false);
    setVisible(true);
    inputRef.current.blur();
  };

  return (
    <View style={styles.container}>
      <TouchableImg
        source={localImages.reset}
        style={styles.reset}
        onPress={resetMeme}
      />
      <View style={styles.inputContainer}>
        {caption.length == 0 && visible && (
          <View style={styles.info}>
            <Image source={localImages.info} style={styles.infoImg} />
            <Text style={styles.infoMsg}>{'Enter a funny caption'}</Text>
          </View>
        )}
        {caption.length > 120 && visible && (
          <View style={styles.info}>
            <Image source={localImages.confused} style={styles.infoImg} />
            <Text style={styles.infoMsg}>
              {'Too much text ruins the joke.'}
            </Text>
          </View>
        )}
        {!visible && !img && (
          <View style={styles.info}>
            <Image source={localImages.info} style={styles.infoImg} />
            <Text style={styles.infoMsg}>
              {"Don't forget to add an image!"}
            </Text>
          </View>
        )}
        {caption.length > 0 && img && !visible && (
          <View style={styles.info}>
            <Image source={localImages.smiling} style={styles.infoImg} />
            <Text style={styles.infoMsg}>{'Click the MYOM Button now'}</Text>
          </View>
        )}
        <TextInput
          ref={inputRef}
          value={caption}
          placeholder="Caption goes here..."
          placeholderTextColor={colors.red}
          style={styles.textInput}
          multiline={true}
          onFocus={_onFocus}
          onBlur={() => setShowButton(false)}
          onChangeText={_onChangeText}
        />
        {showButton && (
          <Text onPress={submitText} style={styles.buttonText}>
            {'Done'}
          </Text>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cover}
        onPress={() => imagePickerFunction(setImg)}>
        {img ? (
          <Image source={{uri: img}} style={styles.img} />
        ) : (
          <View style={styles.img}>
            <Image source={localImages.addImg} style={styles.imgIcon} />
          </View>
        )}
      </TouchableOpacity>
      {caption.length > 0 && img ? (
        <TouchableOpacity activeOpacity={0.8} onPress={makeMeme}>
          <Image source={localImages.logo} style={styles.logo} />
        </TouchableOpacity>
      ) : (
        <Image source={localImages.logo} style={styles.logoInactive} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.green,
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    tintColor: colors.black,
    backgroundColor: colors.red,
    borderRadius: 10,
    marginTop: 20,
  },
  logoInactive: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
    tintColor: colors.lightGray,
    backgroundColor: colors.gray,
    borderRadius: 10,
    marginTop: 20,
  },
  textInput: {
    width: 300,
    borderColor: colors.orange,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 26,
    marginTop: 10,
    marginBottom: 10,
    color: colors.black,
    fontSize: 16,
    backgroundColor: colors.yellow,
    alignSelf: 'center',
    maxHeight: 150,
  },
  img: {
    width: 300,
    height: 200,
    borderRadius: 5,
    backgroundColor: colors.yellow,
    borderWidth: 1,
    borderColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    position: 'absolute',
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: colors.red,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 16,
    right: 12,
  },
  heading: {
    color: colors.black,
    fontSize: 16,
    marginVertical: 10,
    backgroundColor: colors.red,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  info: {
    height: 40,
    backgroundColor: colors.red,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  infoImg: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  infoMsg: {
    fontSize: 14,
    color: colors.black,
  },
  reset: {
    marginRight: 30,
    marginTop: 10,
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 50,
    marginTop: 20,
    marginLeft: 300,
  },
});
