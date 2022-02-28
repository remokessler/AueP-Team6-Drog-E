import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotsOverviewComponent } from './robots-overview.component';

describe('RobotsOverviewComponent', () => {
  let component: RobotsOverviewComponent;
  let fixture: ComponentFixture<RobotsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
