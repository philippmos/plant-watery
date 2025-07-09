import config from '../../auth_config.json';

interface AuthConfig {
  isProduction: boolean;
  auth: {
    domain: string;
    clientId: string;
    authorizationParams: {
      audience?: string;
    };
    apiUri: string;
    errorPath: string;
  };
  backendApiUrl: string;
}

const { isProduction, auth: { domain, clientId, authorizationParams: { audience }, apiUri, errorPath }, backendApiUrl } = config as AuthConfig;

export const environment = {
  production: isProduction,
  plantApiUrl: backendApiUrl,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== '{API_IDENTIFIER}' ? { audience } : null),
      redirect_uri: window.location.origin,
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};