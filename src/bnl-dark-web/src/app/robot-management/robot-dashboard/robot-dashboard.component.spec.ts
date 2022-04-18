import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDashboardComponent } from './robot-dashboard.component';

describe('RobotDashboardComponent', () => {
  let component: RobotDashboardComponent;
  let fixture: ComponentFixture<RobotDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
