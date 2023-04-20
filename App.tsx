import { ValidatorAppTabs } from './src/navigation/tab';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthContextProvider} from './src/auth/AuthContext';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthContextProvider>
          <NavigationContainer>
            <ValidatorAppTabs />
          </NavigationContainer>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
}
