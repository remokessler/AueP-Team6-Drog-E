import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineListComponent } from './medicine-list.component';

describe('MedicinListComponent', () => {
  let component: MedicineListComponent;
  let fixture: ComponentFixture<MedicineListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineListComponent ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
