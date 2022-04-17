import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IRobot } from '../models/robot';
import { RobotService } from '../services/robot.service';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-robot-list',
  templateUrl: './robot-list.component.html',
  styleUrls: [ './robot-list.component.css' ]
})
export class RobotListComponent implements OnInit {

  public constructor(private readonly _robotService: RobotService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Robots' } ]);
  }

  public get robots$(): Observable<IRobot[]> {
    return this._robotService.get();
  }

  public ngOnInit(): void {
  }

}
