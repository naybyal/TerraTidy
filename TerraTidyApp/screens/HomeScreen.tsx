import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
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
    <SafeAreaView className="flex-1 bg-black">
      <Animated.View style={animatedStyle} className="flex-1 items-center justify-center px-6">
        <Text className="text-4xl font-bold mb-2 text-green-500">TerraTidy</Text>
        <Text className="text-lg mb-12 text-white opacity-80">Dispose waste the smart way</Text>
        
        <View className="w-full space-y-4">
          <AnimatedTouchableOpacity 
            style={buttonAnimatedStyle(100)}
            className="flex-row items-center bg-green-600 p-4 rounded-lg"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Camera' as never)}
          >
            <Camera color="#fff" size={24} />
            <Text className="text-white text-lg ml-4">Scan Waste</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={buttonAnimatedStyle(200)}
            className="flex-row items-center bg-green-600 p-4 rounded-lg"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('MapScreen' as never)}
          >
            <MapPin color="#fff" size={24} />
            <Text className="text-white text-lg ml-4">Find Recycling Points</Text>
          </AnimatedTouchableOpacity>

          <AnimatedTouchableOpacity 
            style={buttonAnimatedStyle(300)}
            className="flex-row items-center bg-green-600 p-4 rounded-lg"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('WasteInfoScreen' as never)}
          >
            <Info color="#fff" size={24} />
            <Text className="text-white text-lg ml-4">Waste Information</Text>
          </AnimatedTouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}