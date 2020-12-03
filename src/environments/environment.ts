// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KeycloakConfig } from 'keycloak-js';

let keycloakConfig: KeycloakConfig = {
  url: 'https://sec.tacm.co.za/auth',
  realm: 'tacm',
  clientId: 'tacmapp'
};

export const environment = {
  farmerApi: 'https://api.tacm.co.za/tacm',
  production: false,
  envName: 'local',
  keycloak: keycloakConfig,
  home: "http://app.tacm.co.za"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
