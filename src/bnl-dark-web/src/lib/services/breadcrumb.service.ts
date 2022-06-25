import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private static readonly _breadcrumbs$ = new ReplaySubject<MenuItem[]>(1);

  public get breadcrumbs$(): Observable<MenuItem[]> {
    return BreadcrumbService._breadcrumbs$;
  }

  public constructor() {}

  public setBreadcrumb(breadcrumbs: MenuItem[]) {
    BreadcrumbService._breadcrumbs$.next(breadcrumbs);
  }
}
