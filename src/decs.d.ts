declare module 'react-native-dotenv' {
  export const KEYCLOAK_CLIENT_ID: string
  export const KEYCLOAK_URL: string
  export const KEYCLOAK_CLIENT_SECRET: string
  export const VALIDATION_URL: string
}

declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}