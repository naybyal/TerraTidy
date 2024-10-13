import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types'; // Ensure this is correctly imported
import { useNavigation } from '@react-navigation/native';
import { identifyWasteFromImage } from '@/components/WasteIdentifier';
type CameraScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const navigation = useNavigation<CameraScreenNavigationProp>();
  const [predictions, setPredictions] = useState<string[]>([]);
  // If no permission object exists yet
  if (!permission) {
    return <View />;
  }

  // If permission is denied, request camera permissions
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera.</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Function to take a picture and navigate to WasteDetails
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        // Assuming you have a way to get predictions, replace `[]` with actual predictions
        navigation.navigate('WasteDetails', { photoUri: photo.uri, predictions }); // Pass photoUri and predictions to WasteDetails
      }
    }
  };

  // Toggle the camera between front and back
  const toggleCameraFacing = () => {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  };

  const handleWasteIdentification = async (uri: string) => {
    try {
        let predictions = await identifyWasteFromImage(uri);
        // console.log('Predictions:', predictions);
        // Now you can use the predictions to update UI or store data
        setPredictions(predictions);
    } catch (error) {
        console.error(error);
      }
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
