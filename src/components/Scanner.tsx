import { BarCodeScanner } from 'expo-barcode-scanner';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IQRPayload } from '../models/IQRPayload';
import { colors } from '../colors';

type Props = {
  enabled: boolean;
  onScan: (ticketData: IQRPayload) => void;
}

export default function Scanner({enabled, onScan}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          style={[styles.scanner]}
          onBarCodeScanned={({ type, data }) => {
            if (!enabled) return;
            try {
              const jsonTicketData: IQRPayload = JSON.parse(data);
              onScan(jsonTicketData);
            } catch (error) {
              console.error('Unable to parse string: ', error);
            }
          }}>
        </BarCodeScanner>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  scannerContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: colors.primary,
    borderWidth: 4,
  },
  scanner: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: 'black',
  },
});
