import { Component } from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  public toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }
}
