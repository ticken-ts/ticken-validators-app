import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IQRPayload } from '../models/IQRPayload';
import { Text, StyleSheet, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import ScanResult from '../components/ScanResult';
import Scanner from '../components/Scanner';
import { useCameraPermissions } from '../hooks/useCameraPermissions';
import { colors } from '../colors';

export const Scan: React.FunctionComponent = () => {
  const [scanData, setScanData] = useState<IQRPayload>();
  const [success, setSuccess] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);

  const {loading: loadingPermissions, permission} = useCameraPermissions()

  const scanAgain = () => {
    setScanData(undefined);
    setSuccess(undefined);
  }

  const onScan = (ticketData: IQRPayload) => {
    setScanData(ticketData);
    const validatorURL = 'http://192.168.0.102:7000/api/v';
    console.log("Calling service")
    setLoading(true);
    axios
      .post(
        `${validatorURL}/events/${ticketData.eventID}/tickets/${ticketData.ticketID}/scan`,
        { r: ticketData.r, s: ticketData.s }
      )
      .then((res) => {
        setSuccess(true);
        console.log('RES: ', res);
      })
      .catch((ex) => {
        setSuccess(false);
        console.log('ERR: ', ex);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loadingPermissions || loading) return (
    <View style={styles.loadingContainer}> 
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
  
  if (scanData) return (
    <ScanResult success={success} scanAgain={scanAgain} />
  )

  if (permission) {
    return (
      <Scanner
        enabled={!scanData}
        onScan={onScan}
      />
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
  scanner: {
    flex: 1,
  },
  text: {
    marginTop: 15,
    backgroundColor: 'white'
  },
  textError: {
    color: 'red'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
