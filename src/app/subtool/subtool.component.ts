import { Component, OnDestroy, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Subscription } from 'rxjs';
import { MenuItem } from '../menu-item';
import { MessageService } from '../message.service';
import { environment } from "./../../environments/environment";
@Component({
  selector: 'app-subtool',
  templateUrl: './subtool.component.html',
  styleUrls: ['./subtool.component.css']
})
export class SubtoolComponent implements OnInit, OnDestroy {

  //title = 'TACM APP';
  userDetails: KeycloakProfile = {};
  isAuthenticated: boolean = false;

  menuItems: MenuItem[] = [];

  subscription!: Subscription;  

  constructor(private keycloakService: KeycloakService,
    private messageService: MessageService) {

    // subscribe to home component messages    
    this.subscription = this.messageService.getMessage().subscribe(message => {
      //console.log("SubtoolComponent.constructor: " + JSON.stringify(message));
      if (message instanceof Array) {

        if (message) {
          this.menuItems = [];
          message.forEach((element: MenuItem) => {
            //  console.log("Adding to dst array" + element.title);
            this.menuItems.push(element);
          });
        } else {
          //console.log("Clear menu items when empty message received");        
          this.menuItems = [];
        }
      }
    });

  }

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

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
