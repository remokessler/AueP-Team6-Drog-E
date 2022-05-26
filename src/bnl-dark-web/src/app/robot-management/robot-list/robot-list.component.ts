import { ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { RobotService } from '../services/robot.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IRobot } from '../models/robot';
import { take } from 'rxjs/operators';
import { IColumnConfig } from '../../../lib/list/list.component';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: [ './robot-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotListComponent {
  public robots$ = this._robotService.get().pipe(take(1));
  public dialogRobot = {} as IRobot;
  public columnConfig = [
    {
      title: 'ID',
      field: 'id'
    },
    {
      title: 'Name',
      field: 'name',
      queryType: 'contains'
    }
  ] as IColumnConfig[];

  private _oDataQuery= '';

  public constructor(private readonly _robotService: RobotService, private readonly _breadcrumbService: BreadcrumbService, private readonly _cdr: ChangeDetectorRef) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robots' } ]);
  }

  public loadRobots(oDataQuery: string): void {
    this._oDataQuery = oDataQuery;
    this.robots$ = this._robotService.get(oDataQuery).pipe(take(1));
    this.robots$.pipe(take(1)).subscribe(() => {
      this._cdr.detectChanges();
    });
  }

  public createRobot() {
    this._robotService.post(this.dialogRobot).pipe(take(1)).subscribe(() => {
      this.loadRobots(this._oDataQuery);
    });
  }
}
