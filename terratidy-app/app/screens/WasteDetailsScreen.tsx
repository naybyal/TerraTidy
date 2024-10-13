import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Import the navigation type

type WasteDetailsRouteProp = RouteProp<RootStackParamList, 'WasteDetails'>;

export default function WasteDetails({ route }: { route: WasteDetailsRouteProp }) {
  const { photoUri, predictions } = route.params; // Get predictions and photoUri
//   console.log(predictions);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Details</Text>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <Text style={styles.info}>Identified Waste:</Text>
      {predictions && predictions.map((prediction, index) => (
        <Text key={index} style={styles.prediction}>{prediction}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
  },
  prediction: {
    fontSize: 16,
    color: '#32CD32',
  },
});
