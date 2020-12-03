import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtoolComponent } from './subtool.component';

describe('SubtoolComponent', () => {
  let component: SubtoolComponent;
  let fixture: ComponentFixture<SubtoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
