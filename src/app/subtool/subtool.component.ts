import { Component, OnInit } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { environment } from "./../../environments/environment";

@Component({
  selector: 'app-subtool',
  templateUrl: './subtool.component.html',
  styleUrls: ['./subtool.component.css']
})
export class SubtoolComponent implements OnInit {

  title = 'TACM APP';
  userDetails: KeycloakProfile = {};
  isAuthenticated: boolean = false;

  constructor(private keycloakService: KeycloakService) { }

  async ngOnInit() {

    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

  }

  async doLogout() {
    await this.keycloakService.logout(environment.home);
  }


}
