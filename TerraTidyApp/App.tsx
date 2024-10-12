import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Recycle, Camera, Map, User } from 'lucide-react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';


export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { photo: string };
  Map: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    {/* <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Scan Result' }} /> */}
  </Stack.Navigator>
);

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              switch (route.name) {
                case 'Home':
                  return <Recycle color={color} size={size} />;
                case 'Camera':
                  return <Camera color={color} size={size} />;
                case 'Map':
                  return <Map color={color} size={size} />;
                case 'Profile':
                  return <User color={color} size={size} />;
              }
            },
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#F0F4F8',
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name='Home' component={HomeStack} />
          <Tab.Screen name="Camera" component={CameraScreen} />
          {/* <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} /> */}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;