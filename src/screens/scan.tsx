import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IQRPayload } from '../models/IQRPayload';
import { Text, StyleSheet, Button, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export const Scan: React.FunctionComponent = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [scanData, setScanData] = useState<IQRPayload>();
  const [permission, setPermission] = useState(true);
  const [success, setSuccess] = useState<boolean>();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const scanAgain = () => {
    setScanData(undefined);
    setSuccess(undefined);
  }

  const scanTicket = (ticketData: IQRPayload) => {
    const validatorURL = 'http://192.168.0.102:7000/api/v';
    console.log("Calling service")
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
      });
  };

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
  
  if (scanData) return (
    <View style={styles.container}>
      {success === true && <Text>Ticket validated successfully</Text>}
      {success === false && <Text>There was an error validating the ticket</Text>}
      <View style={{paddingTop: 20}} ></View>
      <Button title={'Tap to Scan Again'} onPress={scanAgain} />
    </View>
  )

  if (permission) {
    return (
      <BarCodeScanner
        style={[styles.container]}
        onBarCodeScanned={({ type, data }) => {
          if (scanData) return;
          setScanData(JSON.parse(data));
          try {
            const jsonTicketData: IQRPayload = JSON.parse(data);
            scanTicket(jsonTicketData);
          } catch (error) {
            console.error('Unable to parse string: ', error);
          }
        }}
      >
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
