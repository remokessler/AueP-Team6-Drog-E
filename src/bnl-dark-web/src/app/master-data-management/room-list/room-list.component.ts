import { Component } from '@angular/core';
import { IColumnConfig } from '../../../lib/list/list.component';

import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IRoom } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: [ './room-list.component.scss' ],
})
export class RoomListComponent {
  public dialogRoom = {} as IRoom;
  public columnConfig = [

    {
      title: 'Floor',
      field: 'floor',
    },
    {
      title: 'Name',
      field: 'name',
      queryType: 'contains',
    },
    {
      title: 'Room-Number',
      field: 'number',
    },
  ] as IColumnConfig[];

  public constructor(private readonly _roomService: RoomService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'Rooms' } ]);
  }

  public get roomService() {
    return this._roomService;
  }
}
