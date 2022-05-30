import { Component, OnInit } from '@angular/core';
import { IColumnConfig } from '../../../lib/list/list.component';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IUser } from '../models/user';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: [ './user-list.component.scss' ],
})
export class UserListComponent {
  public dialogUser = {} as IUser;
  public columnConfig = [
    {
      title: 'ID',
      field: 'id',
    },
    {
      title: 'Firstname',
      field: 'firstname',
      queryType: 'contains',
    },
    {
      title: 'Lastname',
      field: 'name',
      queryType: 'contains',
    },
    {
      title: 'E-Mail',
      field: 'email',
      queryType: 'contains',
    },
    {
      title: 'password',
      field: 'password',
      queryType: 'contains',
    },
  ] as IColumnConfig[];

  public constructor(private readonly _userService: UserService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'User' } ]);
  }

  public get userService() {
    return this._userService;
  }
}
