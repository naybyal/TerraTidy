import React, { useState, useEffect } from 'react';
import { View, Image, Button, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

export default function WasteIdentifier() {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [predictions, setPredictions] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load the TensorFlow.js model
    const loadModel = async () => {
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      classifyImage(result.assets[0].uri);
    }
  };

  const classifyImage = async (uri: string) => {
    setLoading(true);
    const imgB64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer);
    const img = new window.Image();
    img.src = `data:image/jpeg;base64,${imgB64}`;
    img.onload = () => {
      const imgTensor = tf.browser.fromPixels(img);
      if (model) {
        model.classify(imgTensor).then(predictions => {
          setPredictions(predictions.map(pred => pred.className));
          setLoading(false);
        });
      }
    };

    if (model) {
      const predictions = await model.classify(img);
      setPredictions(predictions.map(pred => pred.className));
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
      <Button title="Pick an image" onPress={pickImage} color="#32CD32" />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
      {loading && <ActivityIndicator size="large" color="#32CD32" />}
      {predictions.length > 0 && (
        <View>
          <Text style={{ color: 'white' }}>Identified Waste:</Text>
          {predictions.map((prediction, index) => (
            <Text key={index} style={{ color: '#32CD32' }}>{prediction}</Text>
          ))}
        </View>
      )}
    </View>
  );
}
