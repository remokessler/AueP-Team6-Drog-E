import { IRoom } from '../models/room';
import { Observable, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';


@Injectable({
  providedIn: 'root',
})
export class RoomService implements ICrudService<IRoom> {

  public constructor(private readonly _httpClient: HttpClient, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public navigate(room: IRoom) {}

  public get$(odataQueryString: string | undefined = undefined): Observable<IRoom[]> {
    return this._httpClient.get<IRoom[]>(this._baseUrl + 'odata/Rooms' + (odataQueryString ?? ''));
  }

  public create$(room: IRoom): Observable<IRoom> {
    return this._httpClient.post<IRoom>(this._baseUrl + 'odata/Rooms',
      room,
    );
  }

  public patch$(room: IRoom): Observable<IRoom> {
    return this._httpClient.put<IRoom>(this._baseUrl + 'odata/Rooms/' + room.id,
      room,
    );
  }

  public delete$(room: IRoom): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Rooms/' + room.id);
  }
}

