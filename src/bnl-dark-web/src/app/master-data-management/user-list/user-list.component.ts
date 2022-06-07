import { Component } from '@angular/core';
import { IColumnConfig } from '../../../lib/list/list.component';
import { BreadcrumbService } from '../../../lib/services/breadcrumb.service';
import { IUser, JobDescription } from '../models/user';
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
      title: 'First-Name',
      field: 'firstName',
      queryType: 'contains',
    },
    {
      title: 'Name',
      field: 'name',
      queryType: 'contains',
    },
    {
      title: 'E-Mail',
      field: 'email',
      queryType: 'contains',
    },
    {
      title: 'Password',
      field: 'password',
      queryType: 'contains',
      display: () => {
        return '******';
      },
    },
  ] as IColumnConfig[];
  public jobDescriptions = Object.entries(JobDescription).map(([ value, index ]) => ({
    value,
    index,
  })).filter(x => !Number.isInteger(x.index));
  public passwordBU = '';

  public constructor(private readonly _userService: UserService, private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ { label: 'User' } ]);
  }

  public get userService() {
    return this._userService;
  }

  public dialogElementChanged($event: IUser): void {
    this.dialogUser = $event;
    if (this.dialogUser.jobDescription === undefined || this.dialogUser.jobDescription === null) {
      this.dialogUser.jobDescription = JobDescription.Administrative;
    }
  }

  public asNumber(value: string): number {
    return Number(value);
  }
}
