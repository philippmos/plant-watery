export interface AuthConfig {
  domain: string;
  clientId: string;
  authorizationParams: AuthorizationParams;
  apiUri: string;
  appUri: string;
  errorPath: string;
}

export interface AuthorizationParams {
  audience?: string;
  redirect_uri: string;
}
