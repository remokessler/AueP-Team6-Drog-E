import { Component, OnDestroy, OnInit } from '@angular/core';
import { IStay } from '../../patient-management/models/stay';
import { IColumnConfig } from '../../../lib/list/list.component';
import { ReplaySubject, Subject } from 'rxjs';
import { IPatient } from '../../patient-management/models/patient';
import { IAmnesisRecord } from '../../patient-management/models/amnesis-record';
import { ActivatedRoute } from '@angular/router';
import { StayService } from '../../patient-management/services/stay.service';
import { PatientService } from '../../patient-management/services/patient.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { MessageService } from 'primeng/api';
import { take, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IRobot } from '../models/robot';
import { RobotService } from '../services/robot.service';
import { RobotHealthService } from '../services/robot-health.service';
import { IRobotHealthMessage } from '../models/robot-health-message';

@Component({
  selector: 'app-robot-dashboard',
  templateUrl: './robot-dashboard.component.html',
  styleUrls: [ './robot-dashboard.component.scss' ],
})
export class RobotDashboardComponent implements OnInit, OnDestroy {
  public robotId: number | undefined;

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
      display: (field: any) => new Date(field).toLocaleDateString('de-CH'),
    },
    {
      title: 'Leave',
      field: 'leave',
      display: (field: any) => new Date(field).toLocaleDateString('de-CH'),
    },
  ] as IColumnConfig[];

  private _destroyed$ = new Subject();

  private _robot$ = new ReplaySubject<IRobot>(1);
  public robot$ = this._robot$.asObservable();

  private _robotHealth$ = new ReplaySubject<IRobotHealthMessage[]>(1);
  public robotHealth$ = this._robotHealth$.asObservable();

  public constructor(private readonly _route: ActivatedRoute, private readonly _robotService: RobotService, private readonly _robotHealthService: RobotHealthService, private readonly _breadcrumbService: BreadcrumbService, private readonly _messageService: MessageService) {
  }

  public ngOnInit(): void {
    this._route.params.pipe(takeUntil(this._destroyed$))
      .subscribe((params) => {
          this.robotId = params['robotId'] as number;
          this.loadRobot();
        },
      );
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public saveRobot(robot: IRobot): void {
    this._robotService.patch$(robot).pipe(take(1)).subscribe(
      () => this.loadRobot(),
      (error: HttpErrorResponse) => this._messageService.add({
        severity: 'error',
        summary: `Error while updating Patient`,
        detail: error.message,
        sticky: true,
      }),
    );
  }

  private loadRobot() {
    this._robotService.getDetail$(Number(this.robotId)).pipe(takeUntil(this._destroyed$))
      .subscribe(robot => {
          this._robot$.next(robot);
          this.setBreadcrumb(robot);
        },
        (error: HttpErrorResponse) => this._messageService.add({
          severity: 'error',
          summary: `Error while loading Patient`,
          detail: error.message,
          sticky: true,
        }));
  }

  private loadHealth() {
    this._robotHealthService.get$().pipe(takeUntil(this._destroyed$))
      .subscribe(robotHealthMessages => {
        this._robotHealth$.next(robotHealthMessages);
      });
  }

  private setBreadcrumb(robot: IRobot) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robot', routerLink: '/robots' }, { label: robot.name } ]);
  }
}
