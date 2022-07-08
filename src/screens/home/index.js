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
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {useNavigation} from '@react-navigation/native';
import routes from '../../routes/routeNames';

export default function Home() {
  const navigation = useNavigation();
  const [img, setImg] = React.useState();
  const [caption, setCaption] = React.useState('');
  let inputRef = React.useRef();

  const submitText = () => {
    inputRef.current.blur();
  };

  const makeMeme = () => {
    setCaption('');
    setImg(null);
    inputRef.current.clear();
    navigation.navigate(routes.memeGenerator, {img, caption});
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          placeholder="Write something funny..."
          placeholderTextColor={colors.red}
          style={styles.textInput}
          multiline={true}
          onChangeText={text => setCaption(text)}
        />
        {caption.trim().length > 0 && inputRef.current.isFocused() && (
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
      <TouchableOpacity activeOpacity={0.8} onPress={makeMeme}>
        <Image source={localImages.logo} style={styles.logo} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
