import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function DisposalInfo({ wasteType } : { wasteType: 'plastic' | 'organic' | 'electronic' }) {
    const disposalInstructions: { [key: string]: string } = {
        plastic: 'Recycle in the nearest recycling bin.',
        organic: 'Compost it using your home compost bin or send it to an organic waste center.',
        electronic: 'Dispose of at an e-waste disposal center.',
        paper: 'Place in the recycling bin.',
        glass: 'Drop it at a glass recycling facility.',
        metal: 'Send it to a metal recycling plant.',
        default: 'No specific disposal information available. Please check local waste disposal guidelines.',
      };

     
        return (
          <View style={styles.container}>
            <Text style={styles.wasteTypeText}>Waste Type: {wasteType}</Text>
            <Text style={styles.instructionText}>
              {disposalInstructions[wasteType.toLowerCase()] || disposalInstructions.default}
            </Text>
          </View>
        );
}      

const styles = StyleSheet.create({
    container: {
      padding: 10,
      margin: 10,
      borderColor: '#32CD32',
      borderWidth: 2,
      borderRadius: 10,
      backgroundColor: 'black',
    },
    wasteTypeText: {
      color: '#32CD32',
      fontSize: 18,
      fontWeight: 'bold',
    },
    instructionText: {
      color: 'white',
      fontSize: 16,
    },
  });