import { Component } from '@angular/core';
import { AuthService } from './user-management/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'app';

  public constructor(private readonly _authService: AuthService) {
    this._authService.tryLoginWithPastJwt();
  }
}
