import { View, Text } from 'react-native';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export const Home = () => {
  const {logout} = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Logout' onPress={logout} />
    </View>
  );
};
