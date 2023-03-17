import { ValidatorAppTabs } from './src/navigation/tab';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <ValidatorAppTabs />
    </NavigationContainer>
  );
}
