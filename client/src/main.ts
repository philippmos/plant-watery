import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { buildAppConfig } from './app/app.config';
import { loadAppConfiguration } from './app/config/configuration';

const appConfiguration = await loadAppConfiguration();

bootstrapApplication(AppComponent, buildAppConfig(appConfiguration)).catch((err) => console.error(err));
