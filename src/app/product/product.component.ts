import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  productForm: FormGroup = new FormGroup({
    farmer_id: new FormControl('', [Validators.required]),
    productCode: new FormControl('', [Validators.required])
  });

  uid: string | undefined;
  submitted = false;
  title: string = '';

  constructor(
    private dataService: DataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private keycloakService: KeycloakService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      farmer_id: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      productCode: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      productDescription: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      cropInformation: new FormControl(),
      grade: new FormControl(),
      variety: new FormControl(),
      size: new FormControl(),
      weightPerPacking: new FormControl(),
      quantityAvailable: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      dateQtyAvailable: new FormControl({ disabled: false, value: '' }, [Validators.required]),
      addititonalComment: new FormControl()
    });


    /* Get the uuid from the keycloak server  */
    this.uid = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;

    // Get the product id from the route
    const productCode = this.route.snapshot.paramMap.get('id');
    console.log("ProductComponent.ngOnInit.productCode: " + productCode);

    if (productCode) {
      // Set the title to new produc

      this.title = "View / Edit Product";
      this.dataService.getProduct(productCode).subscribe(product => {
        this.productForm.patchValue(product);
      });
    } else {
      console.log("Form control: " + this.productForm.controls['productCode'].valid);
      // Check if we have a productCode for the new product
      if (!this.productForm.controls['productCode'].valid) {
        /**productCode for a new product   */
        this.dataService.getUUID().subscribe(uuId => {
          console.log("UUID from server: " + uuId.uuid);
          this.productForm.patchValue({
            'productCode': uuId.uuid
          });
        });
        // Set the title to new product
        this.title = "Create New Product"
      }

      // Set the famer id for later use
      this.productForm.patchValue({
        'farmer_id': this.uid
      });

    }

  }

  backToProducts() {
    this.router.navigate(['/products']);
  }

  // Called whem the form gets submited
  addProduct(): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      console.log("Invald form!: " + JSON.stringify(this.productForm.value));
      return;
    }

    console.log("Valid form: " + JSON.stringify(this.productForm.value));
    this.dataService.addProduct(this.productForm.value)
      .subscribe(product => {
        this.productForm.patchValue(product);
      });

    this.backToProducts();

  }

  // convenience getter for easy access to form fields
  public get f() {
    return this.productForm.controls;
  }

}