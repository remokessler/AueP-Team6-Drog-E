import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICrudService } from '../../../lib/models/crud-service';
import { Router } from '@angular/router';
import { ITherapyIteration } from '../models/therapy-iteration';


@Injectable({
  providedIn: 'root',
})
export class TherapyIterationService implements ICrudService<ITherapyIteration> {

  public constructor(private readonly _httpClient: HttpClient, private readonly _router: Router, @Inject('BASE_URL') private readonly _baseUrl: string) {
  }

  public async navigate() {
  }

  public get$(odataQueryString: string | undefined = undefined): Observable<ITherapyIteration[]> {
    return this._httpClient.get<ITherapyIteration[]>(this._baseUrl + 'odata/TherapyIteration' + (odataQueryString ?? ''));
  }

  public getDetail$(id: number, day: Date): Observable<ITherapyIteration[]> {
    return this._httpClient.get<ITherapyIteration[]>(`${ this._baseUrl }odata/TherapyIteration/expanded/${ id }?day=${ day.toUTCString() }`);
  }

  public create$(TherapyIteration: ITherapyIteration): Observable<ITherapyIteration> {
    return this._httpClient.post<ITherapyIteration>(this._baseUrl + 'odata/TherapyIteration',
      TherapyIteration,
    );
  }

  public patch$(TherapyIteration: ITherapyIteration): Observable<ITherapyIteration> {
    return this._httpClient.put<ITherapyIteration>(this._baseUrl + 'odata/TherapyIteration/' + TherapyIteration.id,
      TherapyIteration,
    );
  }

  public delete$(TherapyIteration: ITherapyIteration): Observable<void> {
    return this._httpClient.delete<void>(this._baseUrl + 'odata/TherapyIteration/' + TherapyIteration.id);
  }
}
