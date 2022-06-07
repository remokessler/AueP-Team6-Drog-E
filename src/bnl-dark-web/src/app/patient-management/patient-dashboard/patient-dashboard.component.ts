import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PatientService } from '../services/patient.service';
import { IPatient } from '../models/patient';
import { IAmnesisRecord } from '../models/amnesis-record';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { StayService } from '../services/stay.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { IStay } from '../models/stay';
import { IColumnConfig } from '../../../lib/list/list.component';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: [ './patient-dashboard.component.scss' ],
})
export class PatientDashboardComponent implements OnInit, OnDestroy {
  public patientId: number | undefined;
  public dialogStay: IStay = {} as IStay;
  public now = new Date();
  public columnConfig = [ {
      title: 'Room number',
      field: 'roomId',
      queryType: 'equal',
    },
    {
      title: 'Reason',
      field: 'reason',
      queryType: 'contains',
    },
    {
      title: 'Enter',
      field: 'enter',
      display: (field: any) => new Date(field).toLocaleDateString('de-CH')
    },
    {
      title: 'Leave',
      field: 'leave',
      display: (field: any) => new Date(field).toLocaleDateString('de-CH')
    }
    ] as IColumnConfig[];

  private _destroyed$ = new Subject();

  private _patient$ = new ReplaySubject<IPatient>(1);
  public patient$ = this._patient$.asObservable();

  public constructor(private readonly _route: ActivatedRoute, private readonly _stayService: StayService, private readonly _patientService: PatientService, private readonly _breadcrumbService: BreadcrumbService, private readonly _messageService: MessageService) {
  }

  public get stayService(): StayService {
    return this._stayService;
  }

  public get stayServiceLoaded(): boolean {
    return this._stayService.isLoaded;
  }

  public ngOnInit(): void {
    this._route.params.pipe(takeUntil(this._destroyed$))
      .subscribe((params) => {
          this.patientId = params['patientId'] as number;
          this._stayService.init(this.patientId);
          this.loadPatient();
        },
      );
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public savePatient(patient: IPatient): void {
    this._patientService.patch$(patient).pipe(take(1)).subscribe(
      () => this.loadPatient(),
      (error: HttpErrorResponse) => this._messageService.add({
        severity: 'error',
        summary: `Error while updating Patient`,
        detail: error.message,
        sticky: true,
      }),
    );
  }

  private loadPatient() {
    this._patientService.getDetail$(Number(this.patientId)).pipe(takeUntil(this._destroyed$))
      .subscribe(patient => {
          this._patient$.next(patient);
          this.setBreadcrumb(patient);
        },
        (error: HttpErrorResponse) => this._messageService.add({
          severity: 'error',
          summary: `Error while loading Patient`,
          detail: error.message,
          sticky: true,
        }));
  }

  private setBreadcrumb(patient: IPatient) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Patient', routerLink: '/patients' }, { label: patient.name } ]);
  }
}
