import { IStay } from '../models/stay';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class StayService implements ICrudService<IStay> {
  private _patientId: number | undefined;
  private _onSelect: ((stay: IStay) => void) | undefined;
  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public init(id: number, select: (stay: IStay) => void) {
    this._patientId = id;
    this._onSelect = select;
  }

  public get isLoaded() {
    return this._patientId !== undefined;
  }

  public async navigate(stay: IStay) {
    if (this._onSelect) {
      this._onSelect(stay);
    }
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<IStay[]> {
    return this._httpClient.get<IStay[]>(this._baseUrl + 'odata/Stays' + (odataQueryString ?? ''));
  }

  public create$(stay: IStay): Observable<IStay> {
    return this._httpClient.post<IStay>(this._baseUrl + 'odata/Stays',
      { ...stay, patientId: this._patientId }
    );
  }

  public patch$(stay: IStay): Observable<IStay> {
    return this._httpClient.put<IStay>(this._baseUrl + 'odata/Stays/' + stay.id,
      { ...stay, patientId: this._patientId }
    );
  }

  public delete$(stay: IStay): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Stays/' + stay.id);
  }
}
