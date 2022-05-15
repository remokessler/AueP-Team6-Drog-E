import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static _tokenSubject$ = new ReplaySubject<string>(1);

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string, private readonly _jwtHelper: JwtHelperService) {
  }

  public get userLoggedIn(): Observable<boolean> {
    return AuthService._tokenSubject$.pipe(map(token => !this._jwtHelper.isTokenExpired(token?.toString())));
  }

  public get userEmail(): Observable<string> {
    return AuthService._tokenSubject$.pipe(map(token => this._jwtHelper.decodeToken(token?.toString())['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']));
  }

  public login(credentials: any) {
    return this._httpClient.post<AuthResponse>(`${ this._baseUrl }api/auth/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
      .pipe(tap(authResponse => {
          const token = authResponse.token;
          localStorage.setItem("jwt", token);
          AuthService._tokenSubject$.next(token);
        }, () => {
          this.logout();
        })
      );
  }

  public logout = () => {
    localStorage.removeItem("jwt");
    AuthService._tokenSubject$.next('');
    location.reload();
  };
}
