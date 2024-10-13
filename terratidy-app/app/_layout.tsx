import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/CameraScreen';
import WasteDetailsScreen from './screens/WasteDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { RootStackParamList } from './types'; // Import the navigation type

SplashScreen.preventAutoHideAsync();

// Pass the RootStackParamList to Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Camera">
          <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WasteDetails" component={WasteDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
