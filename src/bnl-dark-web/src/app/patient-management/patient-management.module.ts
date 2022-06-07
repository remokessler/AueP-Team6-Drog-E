import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListComponent } from './patient-list/patient-list.component';
import { InputTextModule } from 'primeng/inputtext';
import { LibModule } from '../../lib/lib.module';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientDashboardComponent,
  ],
  imports: [
    CommonModule,
    InputTextModule,
    LibModule,
    FormsModule,
    InputNumberModule,
    CalendarModule,
    CardModule,
  ],
})
export class PatientManagementModule {}
