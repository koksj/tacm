import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Product } from '../product/product';
import { DataService } from '../data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['productCode', 'productDescription', 'grade', 'variety', 'size' ,'action'];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  selection = new SelectionModel<Product>(true, []);

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uid: any;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.uid = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
    this.getProducts();
  }

  getProducts() {

    this.dataService.getProducts(this.uid).subscribe(
      products => {
        // console.log("Agents: " + JSON.stringify(agents));
        this.dataSource = new MatTableDataSource<Product>(products);
        this.dataSource.paginator = this.paginator;
      });
  }

  deleteRowData(row_obj: Product) {    
    const index = this.dataSource.data.indexOf(row_obj);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource 
    
    this.dataService.deleteProduct(row_obj.productCode).subscribe();
  }

  addNewProduct() {
    this.router.navigate(['/product']);
  }

  viewProduct(product: Product) {
    //console.log("ProductsComponent.viewProduct.productCode: " + product.productCode);
    this.router.navigate(['/product/' + product.productCode]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
