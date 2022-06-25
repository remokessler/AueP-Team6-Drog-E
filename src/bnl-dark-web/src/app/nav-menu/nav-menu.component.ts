import { Component } from '@angular/core';
import { BreadcrumbService } from '../../lib/services/breadcrumb.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AuthService } from '../user-management/services/auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: [ './nav-menu.component.scss' ],
})
export class NavMenuComponent {

  public sidebarVisible = false;
  public home = {
    icon: 'pi pi-home',
    routerLink: '/',
  } as MenuItem;

  public sidebar = {
    icon: 'pi pi-bars',
    command: this.openSidebar.bind(this),
  } as MenuItem;

  public routes = [
    { title: 'Home', url: '/' },
    { title: 'Patients', url: '/patients' },
    { title: 'Robots', url: '/robots' },
    { title: 'Medicines', url: '/medicines' },
    { title: 'Users', url: '/users' },
    { title: 'Rooms', url: '/rooms' },
  ] as { icon: string, title: string, text: string, url: string }[];
  public userPopupVisible = false;

  public constructor(private readonly _breadcrumbService: BreadcrumbService, private readonly _authService: AuthService, private readonly _confirmationService: ConfirmationService) {
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

  public closeUserPopUp(): void {
    this.userPopupVisible = false;
  }

  public openLogoutDialog(element: HTMLElement, username: string): void {
    this._confirmationService.confirm({
      target: element ?? undefined,
      message: `Hi ${username}. Want to leave already?`,
      icon: 'pi pi-sign-out',
      accept: () => {
        this._authService.logout();
      },
      reject: () => {
        // nothing
      },
      rejectLabel: 'Stay',
      acceptLabel: 'Logout',
    });
  }
}
