import {
  TEST_API_SECRET,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRET,
  KEYCLOAK_URL,
  EVENTS_URL,
  TICKETS_URL,
} from "react-native-dotenv";

export const env = (() => {
  const TEST_API_SECRET = "49C1A7E1-0C79-4A89-A3D6-1F9F9B3E0C1C";
  const KEYCLOAK_CLIENT_SECRET = "49C1A7E1-0C79-4A89-A3D6-1F9F9B3E0C1C";
  const KEYCLOAK_CLIENT_ID = "postman-attendant-app";
  const KEYCLOAK_URL = "http://localhost:8080";
  const EVENTS_URL = "http://localhost:8000";
  const TICKETS_URL = "http://localhost:9000";

  const API_SECRET = process.env.API_SECRET || TEST_API_SECRET;
  if (!API_SECRET) throw new Error("API_SECRET and TEST_API_SECRET not defined");
  if (!KEYCLOAK_CLIENT_ID) throw new Error("KEYCLOAK_CLIENT_ID not defined");
  if (!KEYCLOAK_CLIENT_SECRET) throw new Error("KEYCLOAK_CLIENT_SECRET not defined");
  if (!KEYCLOAK_URL) throw new Error("KEYCLOAK_URL not defined");
  if (!EVENTS_URL) throw new Error("EVENTS_URL not defined");
  if (!TICKETS_URL) throw new Error("TICKETS_URL not defined");

  return {
    API_SECRET,
    KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_CLIENT_ID,
    KEYCLOAK_URL,
    EVENTS_URL,
    TICKETS_URL,
  };
})();

__DEV__ && console.log("env", env);
