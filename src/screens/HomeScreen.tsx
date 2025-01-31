import React, { useEffect, useState } from "react";
import {View,Text, StyleSheet, Alert, Image, Button} from 'react-native'
import {launchImageLibrary as _launchImageLibrary, launchCamera as _launchCamera} from 'react-native-image-picker'
import RNFS from "react-native-fs";
import { useNavigation } from "@react-navigation/native";
import messaging from '@react-native-firebase/messaging';
import notifee,{AndroidImportance,EventType} from '@notifee/react-native'
let launchImageLibrary = _launchImageLibrary;
let launchCamera = _launchCamera;

const HomeScreen = ()=>{

const navigation = useNavigation()

const getFcmToken = async()=>{
    const token = await messaging().getToken()
    console.log('token',token)
}

useEffect(()=>{
    getFcmToken()
},[])

useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
     const {title,body} = remoteMessage.notification;
     console.log('message received',title)
     displayNotification(title,body)
    });

    return unsubscribe;
  }, []);

  const displayNotification = async(title,body)=>{
    await notifee.requestPermission()
    const channelId = await notifee.createChannel({
        id:'default',
        name:'Default Channel',
        vibration:true,
        importance: AndroidImportance.HIGH,
        vibrationPattern:[300,500]
    });

    await notifee.displayNotification({
        title:title,
        body: body,
        android: {channelId,
            importance:AndroidImportance.HIGH,
            pressAction:{
                id:'default'
            }
        }

    });
  }

  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };


  const handleResponse =async (response) => {
    if (response.didCancel) {
      Alert.alert("Cancelled", "User cancelled image picker");
    } else if (response.errorMessage) {
      Alert.alert("Error", response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const sourceUri = response.assets[0].uri;

      // Define the local path where the image will be saved
      const fileName = `image_${Date.now()}.jpg`;
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      try {
        await RNFS.copyFile(sourceUri, localPath);
        Alert.alert("Success", "Image saved successfully!");
        console.log('localPath',localPath)
        setSelectedImage(`file://${localPath}`);
      } catch (error) {
        Alert.alert("Error", "Failed to save image");
        console.error(error);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ flex: 1, width:200, height:200 }}
          resizeMode="contain"
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button title="Choose from Device" onPress={openImagePicker} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button title="Open Camera" onPress={handleCameraLaunch} />
      </View>
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        <Button title="Go To Notification" onPress={()=>navigation.navigate('Notification')} />
      </View>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
  },
  header: {
      fontSize: 20,
      marginBottom: 16,
  },
  button: {
      backgroundColor: "#007AFF",
      padding: 10,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
  },
  buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
  },
  imageContainer: {
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
  },
  image: {
      width: 200,
      height: 200,
      borderRadius: 8,
  },
  errorText: {
      color: "red",
      marginTop: 16,
  },
});