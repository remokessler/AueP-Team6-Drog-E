import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../../lib/services/breadcrumb.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
})
export class HomeComponent implements OnInit {
  constructor(private readonly _breadcrumbService: BreadcrumbService) {
  }

  public ngOnInit(): void {
    this._breadcrumbService.setBreadcrumb([ { label: 'Home' } as MenuItem ]);
  }
}
