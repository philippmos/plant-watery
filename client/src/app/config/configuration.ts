import { InjectionToken } from '@angular/core';
import { AppConfig } from './interfaces/app-config';
import { AuthConfig } from './interfaces/auth-config';


export const APP_CONFIGURATION = new InjectionToken<AppConfig>('APP_CONFIGURATION');

function trimTrailingSlash(url?: string): string {
  if (!url) return '';
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export async function loadAppConfiguration(): Promise<AppConfig> {
  const hourlyStamp = Math.floor(Date.now() / (60 * 60 * 1000));
  const configUrl = `/configuration.json?v=${hourlyStamp}`;
  const response = await fetch(configUrl, { cache: 'no-cache' });
  if (!response.ok) {
    throw new Error(`Failed to load configuration (${response.status})`);
  }

  const json = await response.json();

  const backendApiUrl = trimTrailingSlash(json.backendApiUrl);
  const plantApiUrl = trimTrailingSlash(json.plantApiUrl ?? backendApiUrl);

  const auth: AuthConfig = {
    domain: json.auth?.domain,
    clientId: json.auth?.clientId,
    apiUri: trimTrailingSlash(json.auth?.apiUri),
    appUri: trimTrailingSlash(json.auth?.appUri),
    errorPath: json.auth?.errorPath,
    authorizationParams: {
      ...json.auth?.authorizationParams
    }
  };

  const audience = auth.authorizationParams?.audience;
  const redirect_uri = auth.authorizationParams?.redirect_uri;
  const allowedList = backendApiUrl
    ? [
        {
          uri: `${backendApiUrl}/*`,
          tokenOptions: audience ? { authorizationParams: { audience, redirect_uri } } : undefined
        }
      ]
    : [];

  return {
    isProduction: Boolean(json.isProduction),
    backendApiUrl,
    plantApiUrl,
    auth,
    httpInterceptor: {
      allowedList
    }
  };
}
