import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';
import { APP_CONFIGURATION } from './config/configuration';
import { errorInterceptor } from './interceptors/error.interceptor';

import { routes } from './app.routes';
import { AppConfig } from './config/interfaces/app-config';

export function buildAppConfig(appConfiguration: AppConfig): ApplicationConfig {
  return {
    providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideHttpClient(withInterceptors([errorInterceptor])),
      { provide: APP_CONFIGURATION, useValue: appConfiguration },
      provideAuth0({
        ...appConfiguration.auth,
        httpInterceptor: appConfiguration.httpInterceptor
      })
    ]
  };
}
