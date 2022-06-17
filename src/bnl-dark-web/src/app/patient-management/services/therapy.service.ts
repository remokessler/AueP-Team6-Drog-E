import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { Router } from '@angular/router';
import { ITherapy } from '../models/therapy';


@Injectable({
  providedIn: 'root',
})
export class TherapyService implements ICrudService<ITherapy> {
  private _stayId: number | undefined;

  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public get isLoaded() {
    return this._stayId !== undefined;
  }

  public init(id: number) {
    this._stayId = id;
  }

  public async navigate() {}

  public get$(odataQueryString: string | undefined = undefined): Observable<ITherapy[]> {
    return this._httpClient.get<ITherapy[]>(this._baseUrl + 'odata/Therapies' + (odataQueryString ?? ''));
  }

  public create$(therapy: ITherapy): Observable<ITherapy> {
    return this._httpClient.post<ITherapy>(this._baseUrl + 'odata/Therapies',
      { ...therapy, stayId: this._stayId },
    );
  }

  public patch$(therapy: ITherapy): Observable<ITherapy> {
    return this._httpClient.put<ITherapy>(this._baseUrl + 'odata/Therapies/' + therapy.id,
      { ...therapy, stayId: this._stayId },
    );
  }

  public delete$(therapy: ITherapy): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/Therapies/' + therapy.id);
  }
}
