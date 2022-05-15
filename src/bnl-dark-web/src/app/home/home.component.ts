import { Component } from '@angular/core';
import { BreadcrumbService } from '../../lib/services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private readonly _breadcrumbService: BreadcrumbService) {
    this._breadcrumbService.setBreadcrumb([ {label: 'Home'} ]);

  }

}
