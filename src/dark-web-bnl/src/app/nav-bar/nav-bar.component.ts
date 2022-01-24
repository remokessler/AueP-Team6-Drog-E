import { Component } from '@angular/core';
import { navItems } from './_nav';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  public toggleMinimize(e: boolean) {
    this.sidebarMinimized = e;
  }
}
