import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements AfterViewInit{
  public invalidLogin: boolean = false;
  public credentials: LoginModel = { username: '', password: '' };

  public constructor(private readonly _router: Router, private readonly _authService: AuthService, private readonly _cdr: ChangeDetectorRef) {
  }

  public login(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this._authService.login(this.credentials).pipe(take(1)).subscribe(() => {
        this.invalidLogin = false;
        this._router.navigate([ '/' ]);
      },
      () => {
        this.invalidLogin = true;
      });
  }

  public ngAfterViewInit(): void {
    // support autofill
    setTimeout(() => this._cdr.detectChanges(), 50);
  }

  public resetPassword(): void {
    this._authService.passwordReset().pipe(take(1)).subscribe();
  }
}
