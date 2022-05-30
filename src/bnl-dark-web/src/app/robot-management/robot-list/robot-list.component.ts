import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RobotService } from '../services/robot.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IRobot } from '../models/robot';
import { take } from 'rxjs/operators';
import { IColumnConfig } from '../../../lib/list/list.component';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: [ './robot-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RobotListComponent {
  public dialogRobot = {} as IRobot;
  public columnConfig = [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Name',
      field: 'name',
      queryType: 'contains',
    },
  ] as IColumnConfig[];

  public constructor(private readonly _robotService: RobotService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robots' } ]);
  }
  public get robotService() {
    return this._robotService;
  }
}
