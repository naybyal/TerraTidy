import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'

import { RouteProp } from '@react-navigation/native';

type WasteDetailsRouteProp = RouteProp<{ params: { photoUri: string } }, 'params'>;

export default function WasteDetails({ route }: { route: WasteDetailsRouteProp }) {
  const { photoUri } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste Details</Text>
      <Image source={{ uri: photoUri }} style={styles.image} />
      {/* You can now integrate waste identification details here */}
      <Text style={styles.info}>Information on how to dispose of this waste will be shown here.</Text>
    </View>
  )
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
})
