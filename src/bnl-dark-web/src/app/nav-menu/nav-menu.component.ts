import { Component } from '@angular/core';
import { BreadcrumbService } from '../../lib/services/breadcrumb.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../user-management/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: [ './nav-menu.component.scss' ]
})
export class NavMenuComponent {

  public sidebarVisible = false;
  public home = {
    icon: 'pi pi-home',
    routerLink: '/'
  } as MenuItem;

  public sidebar = {
    icon: 'pi pi-bars',
    command: this.openSidebar.bind(this)
  } as MenuItem;

  public routes = [
    { icon: 'pi pi-home', title: 'Home', text: 'Home Sweet Home', url: '/' },
    { icon: 'pi pi-robot', title: 'Robots', text: 'Manage all your Robots here', url: '/robots' }
  ] as { icon: string, title: string, text: string, url: string }[];
  public userPopupVisible = false;

  public constructor(private readonly _breadcrumbService: BreadcrumbService, private readonly _authService: AuthService) {
  }

  public get isAuthenticated(): Observable<boolean> {
    return this._authService.userLoggedIn;
  }

  public get userName(): Observable<string> {
    return this._authService.userEmail;
  }

  public get breadcrumbs$() {
    return this._breadcrumbService.breadcrumbs$;
  }

  public openSidebar() {
    this.sidebarVisible = true;
  }

  public collapseSidebar() {
    this.sidebarVisible = false;
  }

  public showUserPopUp(): void {
    this.userPopupVisible = true;
  }

  public closeUserPopUp(): void {
    this.userPopupVisible = false;
  }
}
