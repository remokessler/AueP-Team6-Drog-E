import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { MessageService } from 'primeng/api';
import { take, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IRobot } from '../models/robot';
import { RobotService } from '../services/robot.service';
import { RobotHealthService } from '../services/robot-health.service';
import { IRobotHealthMessage } from '../models/robot-health-message';
import { TimeTableService } from '../services/time-table.service';
import { ITimeTableEntry } from '../models/time-table-entry';
import { TherapyService } from '../../patient-management/services/therapy.service';
import { ITherapy } from '../../patient-management/models/therapy';
import { ITherapyIteration } from '../models/therapy-iteration';
import { TherapyIterationService } from '../services/therapy-iteration.service';

@Component({
  selector: 'app-robot-dashboard',
  templateUrl: './robot-dashboard.component.html',
  styleUrls: [ './robot-dashboard.component.scss' ],
})
export class RobotDashboardComponent implements OnInit, OnDestroy {
  public robotId: number | undefined;
  public selectedDay = new Date();

  private _destroyed$ = new Subject();

  private _robot$ = new ReplaySubject<IRobot>(1);
  public robot$ = this._robot$.asObservable();

  private _robotHealth$ = new ReplaySubject<IRobotHealthMessage[]>(1);
  public robotHealth$ = this._robotHealth$.asObservable();

  private _timeTableEntries$ = new ReplaySubject<{ time: Date, entry: (ITimeTableEntry | undefined) & { therapy0: ITherapyIteration, therapy1: ITherapyIteration, therapy2: ITherapyIteration, therapy3: ITherapyIteration } }[]>(1);
  public timeTableEntries$ = this._timeTableEntries$.asObservable();

  private _dropDownTherapies$ = new ReplaySubject<ITherapy[]>(1);
  public dropDownTherapies$ = this._dropDownTherapies$.asObservable();

  public constructor(
    private readonly _route: ActivatedRoute,
    private readonly _timeTableService: TimeTableService,
    private readonly _therapyService: TherapyService,
    private readonly _robotService: RobotService,
    private readonly _robotHealthService: RobotHealthService,
    private readonly _breadcrumbService: BreadcrumbService,
    private readonly _messageService: MessageService,
    private readonly _therapyIterationService: TherapyIterationService) {
  }

  public ngOnInit(): void {
    this._route.params.pipe(takeUntil(this._destroyed$))
      .subscribe((params) => {
          this.robotId = params['robotId'] as number;
          this.loadRobot();
          this.loadTimeTableEntries();
          this.loadDropDownTherapies();
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

  public updateTherapyIteration(entryRow: { time: Date; entry: ITimeTableEntry | undefined }, number: number, $event: Event): void {
    const elem = $event?.srcElement as HTMLSelectElement;
    const value = elem.selectedOptions[0].getAttribute('ng-reflect-ng-value');
    if (entryRow.entry === undefined) {
      const newEntry = {
        startTime: entryRow.time,
        robotId: this.robotId,
      } as ITimeTableEntry;
      this._timeTableService.create$(newEntry).pipe(take(1)).subscribe(
        (entry) => {
          const therapyIteration = {
            therapyId: Number(value),
            timeTableEntryId: entry.id,
          } as ITherapyIteration;
          this._therapyIterationService.create$(therapyIteration).pipe(take(1)).subscribe();
        },
      );
    } else if (entryRow.entry.therapyIterations[number] === undefined) {
      const therapyIteration = {
        therapyId: Number(value),
        timeTableEntryId: entryRow.entry.id,
      } as ITherapyIteration;
      this._therapyIterationService.create$(therapyIteration).pipe(take(1)).subscribe();
    } else {
      entryRow.entry.therapyIterations[number].therapyId = Number(value);
      entryRow.entry.therapyIterations[number].timeTableEntryId = entryRow.entry.id;
      this._therapyIterationService.patch$(entryRow.entry.therapyIterations[number]).pipe(take(1)).subscribe();
    }

  }

  public ensureNotNull(row: any, index: number): number {
    if (row?.entry?.therapyIterations?.length > index) {
      return row.entry.therapyIterations[index]?.therapy.id ?? 0;
    }
    return 0;
  }

  public isFilled(entryRow: { time: Date; entry: (ITimeTableEntry & { therapy0: ITherapyIteration; therapy1: ITherapyIteration; therapy2: ITherapyIteration; therapy3: ITherapyIteration }) | (undefined & { therapy0: ITherapyIteration; therapy1: ITherapyIteration; therapy2: ITherapyIteration; therapy3: ITherapyIteration }) }, index: number): any {
    return entryRow?.entry?.therapyIterations?.length > index && entryRow?.entry?.therapyIterations[index];
  }

  public getTherapyDisplay(therapy: ITherapy | undefined): string {
    if (therapy === undefined) {
      return '';
    }
    return therapy.medicine.name + ' to ' + therapy.stay.patient.firstname + ' ' + therapy.stay.patient.name + '(' + therapy.stay.room.number + ')';
  }

  private getTimeStamps(entries: ITimeTableEntry[]): { time: Date, entry: (ITimeTableEntry | undefined) & { therapy0: ITherapyIteration, therapy1: ITherapyIteration, therapy2: ITherapyIteration, therapy3: ITherapyIteration } }[] {
    const todayWithTimeZero = new Date().setHours(0, 0, 0, 0);
    let date = new Date(todayWithTimeZero);
    const times = [] as { time: Date, entry: (ITimeTableEntry | undefined) & { therapy0: ITherapyIteration, therapy1: ITherapyIteration, therapy2: ITherapyIteration, therapy3: ITherapyIteration } }[];
    for (let i = 0; i < 144; i++) {
      const iterationDate = new Date(date.setMinutes(date.getMinutes() + 10));
      const entry = entries.find(e => e.startTime.getTime() === iterationDate.getTime());
      times.push({
        time: iterationDate,
        entry: entry as ITimeTableEntry & { therapy0: ITherapyIteration, therapy1: ITherapyIteration, therapy2: ITherapyIteration, therapy3: ITherapyIteration },
      });
    }
    return times;
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

  private loadTimeTableEntries() {
    this._timeTableService.getDetail$(Number(this.robotId), this.selectedDay).pipe(takeUntil(this._destroyed$))
      .subscribe(timeTableEntries => {
        const entries = this.getTimeStamps(timeTableEntries);
        this._timeTableEntries$.next(entries);
      });
  }

  private loadDropDownTherapies() {
    this._therapyService.getDropdownEntries$().pipe(takeUntil(this._destroyed$))
      .subscribe(therapies => {
        this._dropDownTherapies$.next(therapies);
      });
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
