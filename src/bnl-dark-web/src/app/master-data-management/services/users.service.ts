import { IUser } from '../models/user';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';


@Injectable({
  providedIn: 'root',
})
export class UserService implements ICrudService<IUser> {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public navigate(user: IUser) {}

  public get$(odataQueryString: string | undefined = undefined): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(this._baseUrl + 'odata/Users' + (odataQueryString ?? ''));
  }

  public create$(user: IUser): Observable<IUser> {
    return this._httpClient.post<IUser>(this._baseUrl + 'odata/Users',
      user,
    );
  }

  public patch$(user: IUser): Observable<IUser> {
    return this._httpClient.put<IUser>(this._baseUrl + 'odata/Users/' + user.id,
      user,
    );
  }

  public delete$(user: IUser): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Users/' + user.id);
  }
}

