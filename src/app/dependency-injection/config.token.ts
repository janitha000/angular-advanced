import { InjectionToken } from '@angular/core';

export interface AppConfig {
  enabled: boolean;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    enabled: true,
  }),
});
