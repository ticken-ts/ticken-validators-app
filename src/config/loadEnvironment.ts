import {
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL,
    VALIDATION_URL,
} from 'react-native-dotenv'
  
export const env = (() => {
if (!KEYCLOAK_CLIENT_ID) throw new Error('KEYCLOAK_CLIENT_ID not defined')
if (!KEYCLOAK_URL) throw new Error('KEYCLOAK_URL not defined')
if (!VALIDATION_URL) throw new Error('VALIDATION_URL not defined')
  
return {
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL,
    VALIDATION_URL,
}
})()

__DEV__ && console.log('env', env)
  