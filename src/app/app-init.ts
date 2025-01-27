import { KeycloakService } from 'keycloak-angular';
import { environment as env} from '../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: env.keycloak.url,
            realm: env.keycloak.realm,
            clientId: env.keycloak.clientId,
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
           // onLoad: 'login-required',
          },
          bearerExcludedUrls: []
        });
        resolve();
      } catch(error) {
        reject(error);
      }
    });
  };
}