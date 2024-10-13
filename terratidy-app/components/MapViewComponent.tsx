import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapViewComponent() {
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {location && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Mocked nearby waste disposal locations */}
          <Marker coordinate={{ latitude: location.latitude + 0.001, longitude: location.longitude + 0.001 }} title="Disposal 1" />
          <Marker coordinate={{ latitude: location.latitude + 0.002, longitude: location.longitude + 0.002 }} title="Disposal 2" />
        </MapView>
      )}
    </View>
  );
}
