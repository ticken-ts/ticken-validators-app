import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  success?: boolean;
  scanAgain: () => void;
}

export default function ScanResult({success, scanAgain}: Props) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        {success === true && (
          <View style={styles.successContainer}>
            <MaterialCommunityIcons name="check-circle" size={100} color="green" />
            <Text>Ticket validated successfully</Text>
          </View>
        )}
        {success === false && (
          <View style={styles.successContainer}>
            <MaterialIcons name="error" size={100} color="red" />
            <Text> There was an error validating the ticket </Text>
          </View>
        )}
      </View>
      <Button title={'Scan Again'} onPress={scanAgain} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignSelf: 'stretch',
  },
  successContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
