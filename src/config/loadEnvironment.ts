import {
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL,
    VALIDATION_URL,
    KEYCLOAK_CLIENT_SECRET,
} from 'react-native-dotenv'
  
export const env = (() => {
if (!KEYCLOAK_CLIENT_ID) throw new Error('KEYCLOAK_CLIENT_ID not defined')
if (!KEYCLOAK_URL) throw new Error('KEYCLOAK_URL not defined')
if (!VALIDATION_URL) throw new Error('VALIDATION_URL not defined')
if (!KEYCLOAK_CLIENT_SECRET) throw new Error('KEYCLOAK_CLIENT_SECRET not defined')
return {
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL,
    VALIDATION_URL,
    KEYCLOAK_CLIENT_SECRET,
}
})()

__DEV__ && console.log('env', env)
  