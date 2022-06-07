import { Component } from '@angular/core';
import { IColumnConfig } from '../../../lib/list/list.component';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IPatient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: [ './patient-list.component.scss' ]
})
export class PatientListComponent {
  public dialogPatient = {} as IPatient;
  public columnConfig = [
    {
      title: 'First-Name',
      field: 'firstname',
      queryType: 'contains',
    },
    {
      title: 'Name',
      field: 'name',
      queryType: 'contains',
    },
    {
      title: 'Date of birth',
      field: 'birthday',
      display: (field: any) => new Date(field).toLocaleDateString('de-CH')
    },
    {
      title: 'SSN',
      field: 'socialSecurityNumber',
      queryType: 'contains'
    }
  ] as IColumnConfig[];
  public now = new Date();

  public constructor(private readonly _patientService: PatientService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Patient' } ]);
  }

  public get patientService() {
    return this._patientService;
  }
}
