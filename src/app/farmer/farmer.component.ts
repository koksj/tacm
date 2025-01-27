import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { DataService } from '../data.service';
import { MenuItem } from '../menu-item';
import { MessageService } from '../message.service';
import { Registration } from '../registration';
import { RegistrationService } from '../registration.service';
import { Province } from './province';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent implements OnInit {

  submitted = false;
  title: string = '';
  registrationCompleted: boolean = false;
  private registration: Registration = {id: '0', registrationCompleted: false};
  uid:  any;

  provinces: Province[] = [
    { value: "province-0", viewValue: "Eastern Cape" },
    { value: "province-1", viewValue: "Free State" },
    { value: "province-2", viewValue: "Gauteng" },
    { value: "province-3", viewValue: "KwaZulu-Natal" },
    { value: "province-4", viewValue: "Limpopo" },
    { value: "province-5", viewValue: "Mpumalanga" },
    { value: "province-6", viewValue: "North West" },
    { value: "province-7", viewValue: "Northern Cape" },
    { value: "province-8", viewValue: "Western Cape" },
  ];

  menuItems: MenuItem[] = [
    { component: "SubtoolComponent", path: "/agents", icon: "people", title: "Agents" },
    { component: "SubtoolComponent", path: "/products", icon: "menu_book", title: "Products" },
    { component: "SubtoolComponent", path: "/orders", icon: "food_bank", title: "Orders" },
  ];


  farmerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  constructor(
    private messageService: MessageService,    
    private dataService: DataService,
    private keycloakService: KeycloakService,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router) {
  }

  ngOnInit() {
   
    this.farmerForm = this.formBuilder.group({
      id: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      firstName: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      lastName: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      email: new FormControl({ disabled: false, value: '' }, [Validators.required, Validators.email]),
      identityNumber: new FormControl({ disabled: false, value: '' }, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]),
      mobileNumber: new FormControl({ disabled: false, value: '' }, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      officeNumber: new FormControl({ disabled: false, value: '' }, [Validators.minLength(10), Validators.maxLength(10)]),
      alternativeContactNumber: new FormControl({ disabled: false, value: '' }, [Validators.minLength(10), Validators.maxLength(10)]),
      physicalAddress: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      alternativeEmailAddress: new FormControl({ disabled: false, value: '' }, [Validators.email]),
      businessName: new FormControl({ disabled: false, value: '' }, [Validators.minLength(1), Validators.maxLength(50)]),
      companyRegistrationNumber: new FormControl(),
      vatNumber: new FormControl(),
      primaryHeadOfficeContactNumber: new FormControl({ disabled: false, value: '' }, [Validators.minLength(10), Validators.maxLength(10)]),
      headOfficePhysicalAddress: new FormControl({ disabled: false, value: '' }, [Validators.minLength(5), Validators.maxLength(1024)]),
      nameOfBusinessRepresentative: new FormControl(),
      businessRepresentativeContactNumber: new FormControl({ disabled: false, value: '' }, [Validators.minLength(10), Validators.maxLength(10)]),
      businessRepresentativeEmailAddress: new FormControl({ disabled: false, value: '' }, [Validators.email]),
      province: new FormControl({ disabled: false, value: '' }, [Validators.required])
    });

    /* Get the uuid from the keycloak server  */
    this.uid = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
    console.log("Got uid: " + this.uid);

    // Let's see it the registration was completed
    this.registrationService.getRegistration(this.uid).subscribe(
      registration => {
        //console.log("getRegistration: " + registration.registrationCompleted);        
        this.populate(registration.registrationCompleted);
      }
    );

  }

  // Pre populate farmer form if registration not complete for convenience
  private async populate(registrationCompleted: boolean) {
    this.registrationCompleted = registrationCompleted;
    if (!registrationCompleted) {
      this.title = "Registration continued";
      let userDetails: KeycloakProfile = await this.keycloakService.loadUserProfile();
      this.farmerForm.patchValue({
        'id': this.uid,
        'firstName': userDetails.firstName,
        'lastName': userDetails.lastName,
        'email': userDetails.email
      });

    } else {
      this.title = 'My details';
      this.dataService.getFarmer(this.uid).subscribe(
        farmer => {
          this.farmerForm.patchValue(farmer);
        }
      );
    }

  }

  public onSubmit(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.farmerForm.invalid) {
      console.log("Invald form!: " + JSON.stringify(this.farmerForm.value));
      return;
    }

    if (!this.registrationCompleted) {   
      console.log("about to set id: " +  this.farmerForm.value.uid + " with registrationCompleted: " + this.registrationCompleted);
      this.registration.id = this.farmerForm.controls['id'].value;
      this.registration.registrationCompleted = true;
      this.registrationService.addRegistration(this.registration).subscribe(
        result => {
         // console.log("Registration completed");
          this.registration.registrationCompleted = true;
          this.title = 'Farmer registration completed';
        }          
      );
    }

    this.dataService.addFarmer(this.farmerForm.value)
      .subscribe(farmer => {
        this.farmerForm.patchValue(farmer);
      });

      this.messageService.sendMessage(this.menuItems);
      this.router.navigate(['/agents']);

  }

  // convenience getter for easy access to form fields
  public get f() {
    return this.farmerForm.controls;
  }

  failedValidations(): void {
    this.farmerForm.controls
  }

}