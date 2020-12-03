import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDialogComponent } from './agent-dialog.component';

describe('AgentDialogComponent', () => {
  let component: AgentDialogComponent;
  let fixture: ComponentFixture<AgentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
