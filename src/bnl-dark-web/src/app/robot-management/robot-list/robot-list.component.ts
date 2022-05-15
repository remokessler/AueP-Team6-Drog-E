import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { RobotService } from '../services/robot.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IRobot } from '../models/robot';
import { debounceTime, distinctUntilChanged, take, tap, timeout } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { QueryBuilder } from 'odata-query-builder';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: [ './robot-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotListComponent {
  public robots$ = this._robotService.get();
  public dialogRobot = {} as IRobot;
  public sortField = '';
  public sortOrder = 0;
  public filter = '';
  public filterModelChanged = new Subject<string>();
  private _filterModelChangedSubscription: Subscription;
  private _showDialogSubject$ = new BehaviorSubject<boolean>(false);

  @ViewChild('searchField')
  public searchField: ElementRef | undefined;

  public constructor(private readonly _robotService: RobotService, private readonly _breadcrumbService: BreadcrumbService, private readonly _cdr: ChangeDetectorRef) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robots' } ]);
    this._filterModelChangedSubscription = this.filterModelChanged.pipe(
      tap((text) => {
        this.filter = text;
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(() => {
      this.loadRobots();
      setTimeout(() => this.searchField?.nativeElement.focus(), 100);
    });
  }

  public get showDialog$(): Observable<boolean> {
    return this._showDialogSubject$.asObservable();
  }

  private get _oDataQuery(): string {
    let query = new QueryBuilder();
    if (this.sortField) {
      query = query.orderBy(`${ this.sortField } ${ this.sortOrder === -1 ? 'desc' : '' }`);
    }
    if (this.filter) {
      query = query.filter((builder) => builder.filterPhrase(`contains(name, '${ this.filter }')`));
    }
    return query.toQuery();
  }

  public openDialog(robot: IRobot | undefined = undefined) {
    this.dialogRobot = robot ?? {} as IRobot;
    this._showDialogSubject$.next(true);
  }

  public closeDialog() {
    this.dialogRobot = {} as IRobot;
    this._showDialogSubject$.next(false);
  }

  public createRobot(): void {
    this._robotService.post(this.dialogRobot).pipe(take(1)).subscribe(robot => {
      this.loadRobots();
      this.closeDialog();
    });
  }

  public onRowSelect(robot: IRobot): void {
    // navigate
  }

  public sort($event: { field: string, order: number }): void {
    if (this.sortField === $event.field && this.sortOrder === $event.order) {
      return;
    }
    this.sortField = $event.field;
    this.sortOrder = $event.order;
    this.loadRobots();
  }

  private loadRobots(): void {
    this.robots$ = this._robotService.get(this._oDataQuery);
    this.robots$.pipe(take(1)).subscribe(() =>{
      this._cdr.detectChanges();
    });
  }
}
