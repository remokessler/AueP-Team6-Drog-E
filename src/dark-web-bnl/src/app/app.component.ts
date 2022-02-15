import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizeService } from '../api-authorization/authorize.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public isAuthenticated?: Observable<boolean>;

  constructor(private authorizeService: AuthorizeService, private router: Router) {
  }

  public ngOnInit(): void {
    this.isAuthenticated = this.authorizeService.isAuthenticated();
  }
}
