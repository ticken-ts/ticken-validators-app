import React, {createContext, useEffect, useReducer, useState} from 'react';
import {
  DiscoveryDocument, exchangeCodeAsync,
  makeRedirectUri, refreshAsync,
  revokeAsync, TokenResponse,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {useSelector} from 'react-redux';
import useAppDispatch from '../hooks/useDispatch';
import {env} from '../config/loadEnvironment';
import {selectCredentials} from '../store/selectors/openID';
import {setCredentials, wipe} from '../store/reducers/openID';
import {DateTime} from 'luxon';

WebBrowser.maybeCompleteAuthSession();

// Exposed interface for consumers
type AuthContextProps = {
  discovery: DiscoveryDocument | null;
  login: () => void;
  logout: () => void;
  ready: boolean;
  token: string | null;
  isLoggedIn: boolean;
};

// Internal State type
interface InternalState {
  token: string | null;
  refreshToken: string | null;
}

// Initial internal state
const initialState: InternalState = {
  token: null,
  refreshToken: null,
};

export const AuthContext = createContext({} as AuthContextProps);

const redirectUri = makeRedirectUri({
  path: 'redirect',
})

export const AuthContextProvider = ({children}: any) => {
  const dispatch = useAppDispatch();
  const {token, refreshToken, idToken, expiresAt} = useSelector(selectCredentials);

  const discovery = useAutoDiscovery(`${env.KEYCLOAK_URL}/realms/validators`)

  const [request, result, promptAsync] = useAuthRequest({
    clientId: env.KEYCLOAK_CLIENT_ID,
    usePKCE: false,
    redirectUri,
    scopes: ['openid', 'profile', 'email', 'offline_access'],
  }, discovery);

  const login = () => {
    if (request) {
      promptAsync().then(res => {
        WebBrowser.maybeCompleteAuthSession()
      })
    }
  };

  const logout = () => {
    if (idToken && discovery) {
      WebBrowser.openAuthSessionAsync(
        `${env.KEYCLOAK_URL}/realms/validators/protocol/openid-connect/logout` +
        `?post_logout_redirect_uri=${redirectUri}` +
        `&id_token_hint=${idToken}`,
        redirectUri
      ).then(res => {
        if (res.type === 'success') {
          dispatch(wipe())
        } else {
          console.log("Error logging out:", res);
        }
      });
    }
  };


  useEffect(() => {
    const attemptGetNewToken = async () => {
      const expireDate = DateTime.fromSeconds(expiresAt || 0);
      const needsRefresh = expireDate.diffNow().as('seconds') < 60;
      if (discovery && refreshToken && needsRefresh) {
        try {
          const res = await refreshAsync(
            {
              refreshToken,
              clientId: env.KEYCLOAK_CLIENT_ID,
              scopes: ['openid', 'profile', 'email', 'offline_access'],
            },
            discovery
          );
          if (res.accessToken && res.refreshToken && res.idToken) {
            console.log("Got new token:", res);
            dispatch(setCredentials({
              token: res.accessToken,
              refreshToken: res.refreshToken,
              idToken: res.idToken,
              expiresAt: res.issuedAt + (res.expiresIn || 300),
            }))
          }
        } catch (e) {
          console.log("Error refreshing token:", (e as Error).message)
          dispatch(wipe())
        }
      }
    }

    attemptGetNewToken();
    const interval = setInterval(attemptGetNewToken, 1000 * 30);

    return () => clearInterval(interval);

  }, [discovery, refreshToken, expiresAt]);


  useEffect(() => {
    console.log("Result:", result)
    if (!discovery) {
      console.log("Discovery not ready");
      return;
    }
    if (result?.type === 'success' && result.authentication == null) {
      exchangeCodeAsync({
        code: result.params['code'],
        redirectUri,
        clientId: env.KEYCLOAK_CLIENT_ID,
        scopes: ['openid', 'profile', 'email', 'offline_access'],
      }, discovery).then(res => {
        console.log("Exchanged code:", res)
        if (res.accessToken && res.refreshToken && res.idToken && res.issuedAt && res.expiresIn) {
          dispatch(setCredentials({
            token: res.accessToken,
            refreshToken: res.refreshToken,
            idToken: res.idToken,
            expiresAt: res.issuedAt + (res.expiresIn || 300),
          }));
        } else {
          console.log("Error exchanging code: access token or refresh token not returned");
        }
      }).catch(err => {
        console.log("Error exchanging code: ", err);
      })
    }
    if (result?.type === 'success' && result.authentication?.accessToken && result.authentication?.refreshToken && result.authentication?.idToken && result.authentication?.issuedAt && result.authentication?.expiresIn) {
      dispatch(setCredentials({
        token: result.authentication?.accessToken,
        refreshToken: result.authentication?.refreshToken,
        idToken: result.authentication?.idToken,
        expiresAt: result.authentication?.issuedAt + (result.authentication?.expiresIn || 300),
      }));
    }
  }, [result]);


  // TODO: Create functions to expose

  return (
    <AuthContext.Provider
      value={
        {
          discovery,
          login,
          logout,
          ready: !!request,
          token,
          isLoggedIn: !!token,
        }
      }>
      {children}
    </AuthContext.Provider>
  );
};
