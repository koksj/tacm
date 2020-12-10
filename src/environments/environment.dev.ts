import { KeycloakConfig } from 'keycloak-js';

let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'tacm',
  clientId: 'tacmapp'
};

export const environment = {
  farmerApi: 'http://localhost/tacm',
  production: false,
  envName: 'dev',
  keycloak: keycloakConfig,
  home: "http://localhost:4200"
};