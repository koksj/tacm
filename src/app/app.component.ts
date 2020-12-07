import { Component } from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { environment } from "./../environments/environment";
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { MenuItem } from './menu-item';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TACM APP';
  userDetails: KeycloakProfile = {};
  isAuthenticated: boolean = false;

  menuItems: MenuItem[] = [
    { path: "/agents", icon: "people", title: "Agents" },
    { path: "/products", icon: "menu_book", title: "Products" },
    { path: "/orders", icon: "food_bank", title: "Orders" },
  ];

  myAccountMenuItems: MenuItem[] = [
    { path: "/farmer", icon: "nature_people", title: "My Details" }    
  ];

  constructor(private router: Router, private keycloakService: KeycloakService, private messageService: MessageService) { 

  }

  async ngOnInit() {

    if (await this.keycloakService.isLoggedIn()) {
      this.userDetails = await this.keycloakService.loadUserProfile();
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    this.messageService.sendMessage(this.menuItems);

  }

  async doLogout() {
    //First navigate to a page that require no authentication
    this.router.navigate(['/home']);
    await this.keycloakService.logout(environment.home);
    // this.keycloakService.logout();
  }
  
  sendMessage(): void {
   
    this.myAccountMenuItems.forEach(item => {
      console.log("Sending Menu items: " + item.title);
    });
   // send message to subscribers via observable subject
    this.messageService.sendMessage(this.myAccountMenuItems);
    this.router.navigate(['/farmer']);
  }

  homeMenu(): void {
    this.messageService.sendMessage(this.menuItems);
    this.router.navigate(['/home']);
  }

  clearMessages(): void {
    // clear messages
    this.messageService.clearMessage();
  }

}
