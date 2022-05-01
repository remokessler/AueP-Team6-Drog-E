import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RobotService } from '../services/robot.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IRobot } from '../models/robot';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
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
  private showDialogSubject$ = new BehaviorSubject<boolean>(false);

  public constructor(private readonly _robotService: RobotService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robots' } ]);
  }

  public get showDialog$(): Observable<boolean> {
    return this.showDialogSubject$.asObservable();
  }

  public openDialog(robot: IRobot | undefined = undefined) {
    this.dialogRobot = robot ?? {} as IRobot;
    this.showDialogSubject$.next(true);
  }

  public closeDialog() {
    this.dialogRobot = {} as IRobot;
    this.showDialogSubject$.next(false);
  }

  public createRobot(): void {
    this._robotService.post(this.dialogRobot).pipe(take(1)).subscribe(robot => {
      this.robots$ = this._robotService.get();
      this.closeDialog();
    });
  }

  public onRowSelect(robot: IRobot): void {
    console.log(robot, 'robot selected');
    // navigate
  }

  public sort($event: { field: string, order: number }): void {
    let query = new QueryBuilder()
      .orderBy($event.field)
      .toQuery();

    if ($event.order === -1) {
      query = new QueryBuilder()
        .orderBy(`${ $event.field } desc`)
        .toQuery();
    }
    this.robots$ = this._robotService.get(query);
  }
}
