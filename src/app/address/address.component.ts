import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  street: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {street: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {street: 2, name: 'Helium', weight: 4.0026, symbol: 'He'} 
];

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  
  displayedColumns: string[] = ['Street', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
