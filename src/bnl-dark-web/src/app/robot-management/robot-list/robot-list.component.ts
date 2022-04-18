import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRobot } from '../models/robot';
import { RobotService } from '../services/robot.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: [ './robot-list.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotListComponent implements OnInit {
  public robots$ = this._robotService.get();
  
  public constructor(private readonly _robotService: RobotService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robots' } ]);
  }

  public ngOnInit(): void {
  }

}
