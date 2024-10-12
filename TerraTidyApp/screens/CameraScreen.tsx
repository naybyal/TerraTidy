import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { CameraCapturedPicture } from 'expo-camera'; 

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

type Props = {
  navigation: CameraScreenNavigationProp;
};

const CameraScreen: React.FC<Props> = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [type, setType] = useState<CameraType>('back');
  const [cameraReady, setCameraReady] = useState(false); 
  const cameraRef = useRef<CameraView | null>(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (cameraRef.current && cameraReady) { 
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true, 
          exif: true, 
          skipProcessing: false,
        });

        if (photo)
          handlePictureSaved(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const handlePictureSaved = (photo: CameraCapturedPicture) => {
    navigation.navigate('Result', { photo: photo.uri });
  };
  
  const flipCamera = () => {
    setType(type ==='back' ? 'front' : 'back');
  };

  const onCameraReady = () => {
    setCameraReady(true);
  };

  if (!permission) {
    return <View style={styles.centered}><Text>Loading permissions...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={type}
        ref={cameraRef}
        onCameraReady={onCameraReady} 
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={flipCamera}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScreen;
