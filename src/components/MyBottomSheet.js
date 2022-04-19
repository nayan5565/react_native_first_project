
import React, { useState } from 'react';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper';
import imagePath from '../constants/imagePath';

const MyBottomSheet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState("")
  const list = [
    {
      title: 'Take Photo',
      containerStyle: { margin: 16, backgroundColor: 'green', borderRadius: 12 },
      titleStyle: { color: 'white' },
      onPress: () => takePhoto(),
    },
    {
      title: 'Choose from gallery',
      containerStyle: { margin: 16, backgroundColor: 'teal', borderRadius: 12 },
      titleStyle: { color: 'white' },
      onPress: () => choosePhoto()
    },
    {
      title: 'Cancel',
      containerStyle: { margin: 16, backgroundColor: 'red', borderRadius: 12 },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  const takePhoto = () => {
    setIsVisible(!isVisible)
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      compressImageQuality: 0.7,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path)
    }).catch(error => {
      console.log('err==>', error);
    });
  }
  const choosePhoto = () => {
    setIsVisible(!isVisible)
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.7,
      freeStyleCropEnabled: true,
      cropperCircleOverlay: true,
      multiple: false,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path)
    }).catch(error => {
      console.log('choose err==>', error);
    });
  }

  return (
    <SafeAreaProvider>
      <View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title="Open Bottom Sheet"
            onPress={() => setIsVisible(true)}
            buttonStyle={styles.button}
          />
          <Avatar.Image size={90} source={image === '' ? imagePath.bike : { uri: image }} />
        </View>
        <BottomSheet onBackdropPress={() => setIsVisible(false)} backdropStyle={{ height: 0, backgroundColor: 'teal' }} modalProps={{}} isVisible={isVisible}>
          {list.map((l, i) => (
            <ListItem style={{ backgroundColor: 'white', borderTopLeftRadius: i === 0 ? 32 : 0, borderTopRightRadius: i === 0 ? 32 : 0 }}
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content style={{ justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 32 }}>

                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}

        </BottomSheet>
      </View>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    paddingHorizontal: 16,
  },
});

export default MyBottomSheet;