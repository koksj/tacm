import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AgentDialogComponent } from '../agent-dialog/agent-dialog.component';
import { Agent } from '../agent/agent';


@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['first_name', 'surname', 'mobileNumber', 'email', 'businessName', 'action'];
  dataSource = new MatTableDataSource<Agent>(AGENTS);

  selection = new SelectionModel<Agent>(true, []);

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(action: string, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AgentDialogComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: Agent) {
    this.dataSource.data.push(row_obj);
    this.table.renderRows();
  }

  updateRowData(row_obj: Agent) {
    
  }

  deleteRowData(row_obj: Agent) {
    const index = this.dataSource.data.indexOf(row_obj);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource
  }

}

const AGENTS: Agent[] = [
  {
    id: "",
    firstName: "Horatio",
    lastName: "Nelson",
    identityNumber: "7808125354091",
    mobileNumber: "0789991234",
    physicalAddress: "216 14th Avenue, Fairland, Roodepoort,Gauteng, South Africa, 2195",
    email: "aget@gmail.com",
    businessName: "GoTo",
    province: "Province",
    deliveryAddress: "216 14th Avenue, Fairland, Roodepoort,Gauteng, South Africa, 2195",
    companyRegistrationNumber: "ZX23145"
  },
  {
    id: "",
    firstName: "Hector",
    lastName: "Fernandes",
    identityNumber: "7808125354091",
    mobileNumber: "0789991235",
    physicalAddress: "216 14th Avenue, Fairland, Roodepoort,Gauteng, South Africa, 2195",
    email: "aget@gmail.com",
    businessName: "SellEverything",
    province: "Province",
    deliveryAddress: "216 14th Avenue, Fairland, Roodepoort,Gauteng, South Africa, 2195",
    companyRegistrationNumber: "ZX23145"
  }
];