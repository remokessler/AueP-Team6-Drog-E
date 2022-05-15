import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: [ './user-popup.component.scss' ]
})
export class UserPopupComponent {
  @Input()
  public showDialog = false;

  @Output()
  public onDialogClosed = new EventEmitter();

  constructor(private readonly _authService: AuthService) {
  }

  public get userName(): Observable<string> {
    return this._authService.userEmail;
  }

  public closeDialog() {
    this.onDialogClosed.emit();
  }

  public logout() {
    this._authService.logout()
    this.closeDialog();
  }
}
