import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IQRPayload } from '../types/IQRPayload';
import { Text, StyleSheet, Button, View } from 'react-native';

export const Scan: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState<IQRPayload>();
  const [permission, setPermission] = useState(true);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const { status, granted } =
        await BarCodeScanner.requestPermissionsAsync();
      console.log(`Status: ${status}, Granted: ${granted}`);

      if (status === 'granted') {
        console.log('Access granted');
        setPermission(true);
      } else {
        setPermission(false);
      }
    } catch (error) {
      console.error(error);
      setPermission(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>Requesting permission ...</Text>;

  if (scanData) {
    return (
      <View
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
      >
        <Text style={styles.text}>Name: {scanData.url}</Text>
        <Button title="Scan again" onPress={() => setScanData(undefined)} />
      </View>
    );
  }

  if (permission) {
    return (
      <BarCodeScanner
        style={[styles.container]}
        onBarCodeScanned={({ type, data }) => {
          try {
            console.log(type);
            console.log(data);
            setScanData({ url: data });
          } catch (error) {
            console.error('Unable to parse string: ', error);
          }
        }}
      >
        <Text style={styles.text}>Scan the QR code.</Text>
      </BarCodeScanner>
    );
  } else {
    return <Text style={styles.textError}>Permission rejected.</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 15,
    backgroundColor: 'white'
  },
  textError: {
    color: 'red'
  }
});
