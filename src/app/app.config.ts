import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

//appConfig is just a custom configuration object you define to group your providers (like provideHttpClient, provideRouter, etc.)
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),  //tells Angular to register HttpClient as a global provider so your AuthService can use it
    provideAnimationsAsync()
  ]
};
