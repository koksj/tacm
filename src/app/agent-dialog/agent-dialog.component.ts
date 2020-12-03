import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Agent } from '../agent/agent';

@Component({
  selector: 'app-agent-dialog',
  templateUrl: './agent-dialog.component.html',
  styleUrls: ['./agent-dialog.component.css']
})
export class AgentDialogComponent implements OnInit {

  action: string = "";
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<AgentDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Agent) {
    console.log(data);
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  ngOnInit(): void {

  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }



}
