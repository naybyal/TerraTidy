import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Result: { photo: string };
  Map: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Camera" component={CameraScreen} />
        {/* <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Map" component={MapScreen} />  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;