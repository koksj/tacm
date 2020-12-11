import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private router: Router, private keycloakService: KeycloakService, private registrationService: RegistrationService) {

  }

  ngOnInit() {

    this.keycloakService.isLoggedIn().then(
      (value: boolean) => { this.isAuthenticated = value }
    );

    /* Get the uuid from the keycloak server  */
    const uid: any = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;

    if (uid) {

      if (uid)
        this.registrationService.getRegistration(uid).subscribe(
          registration => {
            this.navigate(registration.registrationCompleted)
          }
        );
    }
  }

  /**See if registration is completed */
  private async navigate(registrationCompleted: boolean) {
    if (await this.keycloakService.isLoggedIn() && registrationCompleted) {
      console.log("## registrationCompleted: " + registrationCompleted);
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/farmer']);
    }

  }

  register(): void {
    
    window.location.href = this.keycloakService.getKeycloakInstance().createRegisterUrl();
  }
}
