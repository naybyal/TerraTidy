import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, MapPin, Info } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withDelay 
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function HomeScreen() {
  const navigation = useNavigation();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    opacity.value = withSpring(1);
    translateY.value = withSpring(0);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const buttonAnimatedStyle = (delay: number) => useAnimatedStyle(() => {
    return {
      opacity: withDelay(delay, withSpring(opacity.value)),
      transform: [{ translateY: withDelay(delay, withSpring(translateY.value)) }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>TerraTidy</Text>
        <Text style={styles.subtitle}>Dispose waste the smart way</Text>
        
        <View style={styles.buttonContainer}>
          <AnimatedTouchableOpacity 
            style={[styles.button, buttonAnimatedStyle(100)]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Camera' as never)}
          >
            <Camera color="#fff" size={24} />
            <Text style={styles.buttonText}>Scan Waste</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={[styles.button, buttonAnimatedStyle(200)]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MapScreen' as never)}
          >
            <MapPin color="#fff" size={24} />
            <Text style={styles.buttonText}>Find Recycling Points</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={[styles.button, buttonAnimatedStyle(300)]}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('WasteInfoScreen' as never)}
          >
            <Info color="#fff" size={24} />
            <Text style={styles.buttonText}>Waste Information</Text>
          </AnimatedTouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#22c55e',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 48,
    color: 'white',
    opacity: 0.8,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  },
});