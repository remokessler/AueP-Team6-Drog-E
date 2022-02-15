import { Component } from '@angular/core';
import { navItems } from './_nav';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../../api-authorization/authorize.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;

  public constructor(private authorizeService: AuthorizeService) {
  }

  public ngOnInit(): void {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u?.name)).pipe(tap(() => console.log(this.userName)));
  }

  public toggleMinimize(e: boolean): void {
    this.sidebarMinimized = e;
  }
}
