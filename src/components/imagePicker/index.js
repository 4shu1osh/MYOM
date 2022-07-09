import ImagePicker from 'react-native-image-crop-picker'

export default function imagePickerFunction(callbackFn) {
  return (
    ImagePicker.openPicker({
        height: 200,
        width: 300,
        cropping: true,
        freeStyleCropEnabled: true,
        mediaType: 'photo',
      })  .then(image => {
        callbackFn(image.path);
      })
      .catch(err => {
        console.log('ImageErr', err);
      })
  )
}