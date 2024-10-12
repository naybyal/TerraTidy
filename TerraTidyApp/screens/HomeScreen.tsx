import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

interface User {
  username: string;
  points: number;
  badges: string[];
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async (): Promise<void> => {
    const username = await AsyncStorage.getItem('username');
    if (username) {
      try {
        const response = await fetch(`http://your-backend-url/api/user/${username}`);
        const userData: User = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    }
  };

  const addPoints = async (points: number): Promise<void> => {
    const username = await AsyncStorage.getItem('username');
    if (username) {
      try {
        const response = await fetch('http://your-backend-url/api/user/points', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, points }),
        });
        const updatedUser: User = await response.json();
        setUser(updatedUser);
      } catch (error) {
        console.error('Failed to add points:', error);
      }
    }
  };

  return (
    <View>
      <Text>Welcome to TerraTidy</Text>
      {user && <Text>Points: {user.points}</Text>}
      <Button
        title="Scan Waste"
        onPress={() => navigation.navigate('Camera')}
      />
      <Button
        title="Find Recycling Centers"
        onPress={() => navigation.navigate('Map')}
      />
      <Button
        title="Add Points (Demo)"
        onPress={() => addPoints(10)}
      />
    </View>
  );
};

export default HomeScreen;