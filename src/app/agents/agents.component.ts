import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AgentDialogComponent } from '../agent-dialog/agent-dialog.component';
import { Agent } from '../agent/agent';
import { DataService } from '../data.service';


@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['first_name', 'surname', 'mobileNumber', 'email', 'businessName', 'action'];
 
  dataSource: MatTableDataSource<Agent> = new MatTableDataSource<Agent>();

  selection = new SelectionModel<Agent>(true, []);

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  uid: any;

  constructor(private dialog: MatDialog,
    private router: Router,
    private keycloakService: KeycloakService,
    private dataService: DataService) {

  }

  ngAfterViewInit() {
    
  }

  ngOnInit(): void {
    this.uid = this.keycloakService.getKeycloakInstance().tokenParsed?.sub;
    this.getAgents();
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
        this.updateRowData();
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: Agent) {
    this.dataSource.data.push(row_obj);
    this.table.renderRows();
  }

  updateRowData() {

  }

  deleteRowData(row_obj: Agent) {    
    const index = this.dataSource.data.indexOf(row_obj);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription(); // <-- Refresh the datasource 
    
    this.dataService.deleteAgent(row_obj.aid).subscribe();
  }

  addNewAgent() {
    this.router.navigate(['/agent']);
  }

  viewAgent(agent: Agent) {
    this.router.navigate(['/agent/' + agent.aid]);
  }

  /** Gets all the agents registered by the farmer */
  getAgents() {    
    this.dataService.getAgents(this.uid).subscribe( 
      agents => {
       // console.log("Agents: " + JSON.stringify(agents));
        this.dataSource = new MatTableDataSource<Agent>(agents);
        this.dataSource.paginator = this.paginator
      }
    );    
  }
}