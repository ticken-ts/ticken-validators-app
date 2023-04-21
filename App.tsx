import { ValidatorAppTabs } from './src/navigation/tab';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import store, {persistor} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthContextProvider} from './src/auth/AuthContext';
import { useAuth } from './src/hooks/useAuth';
import Welcome from './src/screens/welcome';

export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AuthContextProvider>
          <NavigationContainer>
            <MainApp/>
          </NavigationContainer>
        </AuthContextProvider>
      </PersistGate>
    </Provider>
  );
}

function MainApp() {
  const {isLoggedIn, token} = useAuth();
  
  console.log("Logged In?", isLoggedIn, token)
  
  return isLoggedIn ? (
     <ValidatorAppTabs />
  ) : (
    <Welcome />
  )

}
