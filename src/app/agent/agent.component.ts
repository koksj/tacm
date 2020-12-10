import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { DataService } from '../data.service';
import { Province } from '../farmer/province';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit, OnDestroy {

  submitted = false;
  title: string = '';

  uid: any;

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

  agentForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  });

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private keycloakService: KeycloakService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.agentForm = this.formBuilder.group({
      aid: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      id: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      firstName: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      lastName: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      email: new FormControl({ disabled: false, value: '' }, [Validators.required, Validators.email]),
      identityNumber: new FormControl({ disabled: false, value: '' }, [Validators.minLength(13), Validators.maxLength(13)]),
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

    // Get the Agent id from the route
    const aid = this.route.snapshot.paramMap.get('id');

    if (aid) {
      // Set the title to new Agent
      this.title = "View / Edit Agent";
      this.dataService.getAgent(aid).subscribe(agent => {
        this.agentForm.patchValue(agent);
      });

    } else {
      // Check if we have a PK for the new agent
      if (!this.agentForm.controls['aid'].valid) {
        /**PK for a new agent  */
        this.dataService.getUUID().subscribe(uuId => {
          console.log("UUID: " + uuId.uuid);
          this.agentForm.patchValue({
            'aid': uuId.uuid
          });
        });
        // Set the title to new Agent
        this.title = "Create New Agent"
      }

    }

    // Set the famer id for later use
    this.agentForm.patchValue({
      'id': this.uid
    });

  }

  ngOnDestroy() {

  }

  backToAgents() {
    this.router.navigate(['/agents']);
  }

  // Called whem the form gets submited
  addAgent(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.agentForm.invalid) {
      console.log("Invald form!: " + JSON.stringify(this.agentForm.value));
      return;
    }

    console.log("Valid form: " + JSON.stringify(this.agentForm.value));
    this.dataService.addAgent(this.agentForm.value)
      .subscribe(agent => {
        this.agentForm.patchValue(agent);
      });

    this.backToAgents();

  }

  // convenience getter for easy access to form fields
  public get f() {
    return this.agentForm.controls;
  }


}
