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
  home: "https://www.tacm.co.za"
};