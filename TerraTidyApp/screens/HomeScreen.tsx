import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, MapPin, Info } from 'lucide-react-native'; // If using another library, ensure it's properly installed and imported
import CameraScreen from './CameraScreen';
const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to TerraTidy!</Text>
      <Text style={styles.subtitle}>Dispose waste the smart way.</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          // onPress={() => navigation.navigate(Camera)} // Update with correct screen name
          activeOpacity={0.8}
        >
          <Camera color="#fff" size={24} />
          <Text style={styles.buttonText}>Scan Waste</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          // onPress={() => navigation.navigate('MapScreen')} // Update with correct screen name
          activeOpacity={0.8}
        >
          <MapPin color="#fff" size={24} />
          <Text style={styles.buttonText}>Find Recycling Points</Text>
        </TouchableOpacity>


        <TouchableOpacity 
          style={styles.button} 
          // onPress={() => navigation.navigate('WasteInfoScreen')} // Update with correct screen name
          activeOpacity={0.8}
        >
          <Info color="#fff" size={24} />
          <Text style={styles.buttonText}>Waste Information</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default HomeScreen;
