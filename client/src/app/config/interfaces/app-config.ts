import { AuthConfig, AuthorizationParams } from "./auth-config";

export interface AppConfig {
  isProduction: boolean;
  backendApiUrl: string;
  plantApiUrl: string;
  auth: AuthConfig;
  httpInterceptor: {
    allowedList: {
      uri: string;
      tokenOptions?: {
        authorizationParams?: AuthorizationParams;
      };
    }[];
  };
}
