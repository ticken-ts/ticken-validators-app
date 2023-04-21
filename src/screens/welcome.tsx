import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/Button';
import Logo from '../assets/logo.svg';

export default function Welcome() {

    const {login} = useAuth();

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Logo style={styles.logo} width={200} height={200} />
        <Text style={styles.H2}>Welcome!</Text>
        <Text style={styles.text}>Please sign in with your validator credentials to start using the application</Text>
      </View>
      <Button title='Sign In' onPress={login} />
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  H2: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  H3: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});
