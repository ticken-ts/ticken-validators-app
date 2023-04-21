import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const {logout, userData} = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles.H2}>Welcome</Text>
        <Text style={styles.H3}>You are logged in as <Text style={styles.lightText}>{userData?.email}</Text> </Text>
      </View>
      <Button style={{alignSelf: 'stretch'}} title='Logout' onPress={logout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  H2: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  H3: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  lightText: {
    fontWeight: 'normal',
  },

});
